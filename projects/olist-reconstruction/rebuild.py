"""Reconstruct the aggregate-only Olist dashboard from the recovered MSc workbook.

This is a reconstruction, NOT the original Power BI PBIX. The source workbook
and all order, customer and seller identifiers remain private. Uses Python's
streaming OOXML reader without third-party dependencies.
"""
import argparse
import collections
import tempfile
import datetime as dt
import json
import re
import zipfile
from xml.etree import ElementTree as ET
from pathlib import Path

BOOK=None
OUT=None
NS='{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
BASE=dt.datetime(1899,12,30)

def date(v):
    if not v:return None
    try:return BASE+dt.timedelta(days=float(v))
    except (ValueError,TypeError,OverflowError):
        try:return dt.datetime.fromisoformat(v)
        except ValueError:return None

def rows(z,idx):
    with z.open(f'xl/worksheets/sheet{idx}.xml') as stream:
        headers=None
        for _,row in ET.iterparse(stream,events=('end',)):
            if row.tag!=NS+'row':continue
            cells={}
            for cell in row:
                if cell.tag!=NS+'c':continue
                label=re.match('[A-Z]+',cell.get('r',''))
                if not label:continue
                col=0
                for ch in label.group():col=col*26+ord(ch)-64
                v=cell.find(NS+'v')
                if cell.get('t')=='inlineStr':
                    inline=cell.find(NS+'is')
                    val=''.join(inline.itertext()) if inline is not None else ''
                elif cell.get('t')=='s':
                    raise ValueError('Shared-string encoding is not supported by this recovered-workbook reader')
                else:val=v.text if v is not None else ''
                cells[col-1]=val or ''
            if headers is None:
                headers=[cells.get(i,'') for i in range(max(cells)+1)]
                print('SHEET',idx,'HEADERS',','.join(headers),flush=True)
            else:yield {header:cells.get(i,'') for i,header in enumerate(headers)}
            row.clear()

def f(v):
    try:return float(v)
    except (ValueError,TypeError):return 0.0

def bucket():
    return {'orders':0,'delivered':0,'late':0,'deliveryEligible':0,
            'reviewed':0,'reviewSum':0.,'pricedOrders':0,'itemValue':0.,
            'freightValue':0.,'itemCount':0,'leadDaysSum':0.,
            'leadDaysCount':0,'statuses':collections.Counter()}

def main():
    qc={}
    with zipfile.ZipFile(BOOK) as z:
        cust={}
        state_counts=collections.Counter()
        for r in rows(z,1):
            id=r['customer_id']
            cust[id]=r['customer_state']
            state_counts[r['customer_state']]+=1
        qc['customers']={'rows':sum(state_counts.values()),'uniqueKeys':len(cust)}
        print('CUSTOMERS',qc['customers'],flush=True)

        orders={}
        status_counts=collections.Counter()
        date_missing=collections.Counter()
        invalid_date=0
        for r in rows(z,2):
            id=r['order_id']
            purchase=date(r['order_purchase_timestamp'])
            delivered=date(r['order_delivered_customer_date'])
            estimated=date(r['order_estimated_delivery_date'])
            status=r['order_status']
            month=purchase.strftime('%Y-%m') if purchase else None
            if not month:date_missing['purchase']+=1
            if not delivered:date_missing['delivered']+=1
            if not estimated:date_missing['estimated']+=1
            if delivered and purchase and delivered<purchase:invalid_date+=1
            orders[id]={'customer':r['customer_id'],'status':status,
                        'purchase':purchase,'delivered':delivered,
                        'estimated':estimated,'month':month,'itemValue':0.,
                        'freightValue':0.,'itemCount':0}
            status_counts[status]+=1
        qc['orders']={'rows':sum(status_counts.values()),'uniqueKeys':len(orders),
                      'statuses':dict(status_counts),'missingDates':dict(date_missing),
                      'deliveredBeforePurchase':invalid_date,
                      'unmatchedCustomers':sum(o['customer'] not in cust for o in orders.values())}
        print('ORDERS',qc['orders'],flush=True)

        review_sum=collections.defaultdict(float)
        review_count=collections.Counter()
        score_dist=collections.Counter()
        reviews=0
        review_missing=0
        for r in rows(z,4):
            reviews+=1
            id=r['order_id']
            sc=f(r['review_score'])
            score_dist[int(sc)]+=1
            if id not in orders:
                review_missing+=1
                continue
            review_sum[id]+=sc
            review_count[id]+=1
        qc['reviews']={'rows':reviews,'uniqueOrders':len(review_count),
                       'unmatchedOrders':review_missing,'scoreCounts':dict(score_dist),
                       'multipleReviewsOrders':sum(c>1 for c in review_count.values())}
        print('REVIEWS',qc['reviews'],flush=True)

        translations={}
        num_trans=0
        for r in rows(z,7):
            translations[r['product_category_name']]=r['product_category_name_english']
            num_trans+=1
        qc['categoryTranslation']={'rows':num_trans,'unique':len(translations)}

        products={}
        missing_product_cat=0
        prod_count=0
        for r in rows(z,5):
            prod_count+=1
            name=r['product_category_name']
            if not name:missing_product_cat+=1
            products[r['product_id']]=translations.get(
                name,name.replace('_',' ').title() if name else 'Uncategorised')
        qc['products']={'rows':prod_count,'uniqueKeys':len(products),
                        'missingCategory':missing_product_cat}

        seller_state={}
        sellers=0
        for r in rows(z,6):
            seller_state[r['seller_id']]=r['seller_state']
            sellers+=1
        qc['sellers']={'rows':sellers,'uniqueKeys':len(seller_state)}

        def dimension_bucket():
            return {'itemValue':0.,'freightValue':0.,'itemCount':0,
                    'distinctOrders':set()}
        month_state_cat=collections.defaultdict(dimension_bucket)
        month_state_seller=collections.defaultdict(dimension_bucket)
        missing_keys=collections.Counter()
        items=0
        outliers=collections.Counter()
        for r in rows(z,3):
            items+=1
            id=r['order_id']
            price=f(r['price'])
            freight=f(r['freight_value'])
            if price<0 or freight<0:outliers['negativeLineValue']+=1
            if id not in orders:
                missing_keys['orders']+=1
                continue
            o=orders[id]
            o['itemValue']+=price
            o['freightValue']+=freight
            o['itemCount']+=1
            if r['product_id'] not in products:missing_keys['products']+=1
            if r['seller_id'] not in seller_state:missing_keys['sellers']+=1
            month=o['month']
            state=cust.get(o['customer'],'Unknown') or 'Unknown'
            if not month:continue
            category=products.get(r['product_id'],'Unknown') or 'Unknown'
            seller=seller_state.get(r['seller_id'],'Unknown') or 'Unknown'
            c=month_state_cat[month,state,category]
            c['itemValue']+=price
            c['freightValue']+=freight
            c['itemCount']+=1
            c['distinctOrders'].add(id)
            s=month_state_seller[month,state,seller]
            s['itemValue']+=price
            s['itemCount']+=1
            s['distinctOrders'].add(id)
        qc['orderItems']={'rows':items,'lineItemsMatched':items-missing_keys['orders'],
                          'unmatched':dict(missing_keys),'negativeAmounts':dict(outliers),
                          'ordersWithoutItems':sum(o['itemCount']==0 for o in orders.values())}
        print('ITEMS',qc['orderItems'],flush=True)

        georows=0
        geozips=set()
        for r in rows(z,8):
            georows+=1
            geozips.add(r['geolocation_zip_code_prefix'])
        qc['geolocation']={'rows':georows,'uniqueZipPrefixes':len(geozips),
                           'isLookupWithRepeatedZips':len(geozips)<georows}
        print('GEO',qc['geolocation'],flush=True)

        month_state=collections.defaultdict(bucket)
        no_date=0
        states=collections.Counter()
        mismatched=0
        for id,o in orders.items():
            month=o['month']
            state=cust.get(o['customer'],'Unknown') or 'Unknown'
            if not month:
                no_date+=1
                continue
            s=month_state[month,state]
            s['orders']+=1
            s['statuses'][o['status']]+=1
            states[state]+=1
            if o['status']=='delivered':s['delivered']+=1
            if o['itemCount']:
                s['pricedOrders']+=1
                s['itemValue']+=o['itemValue']
                s['freightValue']+=o['freightValue']
                s['itemCount']+=o['itemCount']
            if o['status']=='delivered' and o['delivered'] and o['estimated']:
                s['deliveryEligible']+=1
                s['late']+=int(o['delivered']>o['estimated'])
            if o['status']=='delivered' and o['delivered'] and o['purchase'] and o['delivered']>=o['purchase']:
                s['leadDaysSum']+=(o['delivered']-o['purchase']).total_seconds()/86400
                s['leadDaysCount']+=1
            if id in review_count:
                s['reviewed']+=1
                s['reviewSum']+=review_sum[id]/review_count[id]
            if o['itemCount'] and abs(o['itemValue'])<.00000001:mismatched+=1
        qc['analysis']={'ordersWithoutPurchaseDate':no_date,'states':dict(states),
                        'ordersWithItemsZeroValue':mismatched,
                        'valueMeaning':'item list price sums, not payments/profit/revenue',
                        'lateDefinition':'delivered order with nonmissing customer delivery date strictly after estimated date',
                        'dateDefinition':'order_purchase_timestamp month, Excel serial dates converted from 1899-12-30'}

        def round_buckets():
            result=[]
            for (m,state),d in sorted(month_state.items()):
                rec={'month':m,'state':state}
                rec.update({k:round(v,2) if isinstance(v,float) else v
                            for k,v in d.items() if k!='statuses'})
                rec['statuses']=dict(d['statuses'])
                result.append(rec)
            return result
        def flat(agg):
            return [dict(month=m,state=state,dimension=dimension,
                         itemValue=round(d['itemValue'],2),itemCount=d['itemCount'],
                         distinctOrders=len(d['distinctOrders']))
                    for (m,state,dimension),d in sorted(agg.items())]
        public={
            'about':{'title':'Olist dataset reconstruction',
                     'source':'Olist Dataset Clean v3.xlsx recovered MSc project workbook',
                     'notOriginalDashboard':True,'eightSheets':True,
                     'sourceRows':{k:v.get('rows') for k,v in qc.items()
                                   if isinstance(v,dict) and 'rows' in v},
                     'metricDefinitions':{
                         'orders':'distinct order_id, counted once even when several order items or reviews',
                         'itemValue':'sum of order_item price, not realised revenue or margin',
                         'lateRate':'late delivered orders divided by delivered orders with both relevant dates',
                         'reviewScore':'mean of per-order mean scores, excluding orders without a review; duplicate reviews averaged per order'},
                     'privacy':'aggregated output only; no row identifiers, customer addresses, survey data or raw workbook'},
            'quality':qc,
            'monthlyByCustomerState':round_buckets(),
            'categoryByCustomerState':flat(month_state_cat),
            'sellerByCustomerState':flat(month_state_seller)}
        OUT.write_text(json.dumps(public,separators=(',',':')),encoding='utf-8')
        months=sorted({a['month'] for a in public['monthlyByCustomerState']})
        tot=collections.Counter()
        for x in public['monthlyByCustomerState']:
            for k in ('orders','delivered','late','deliveryEligible','reviewed','reviewSum',
                      'pricedOrders','itemValue','freightValue','itemCount'):
                tot[k]+=x[k]
        print('MONTHS',len(months),months[0],months[-1],
              'GROUPS',len(public['monthlyByCustomerState']),
              'CATEGORIES',len(public['categoryByCustomerState']),
              'SELLER STATES',len(public['sellerByCustomerState']),flush=True)
        print('TOTALS',dict(tot),'REVIEW',tot['reviewSum']/tot['reviewed'],
              'LATE',tot['late']/tot['deliveryEligible'],
              'ITEMAVG',tot['itemValue']/tot['pricedOrders'],flush=True)

KEYS=('orders','delivered','late','deliveryEligible','reviewed','reviewSum',
      'pricedOrders','itemValue','freightValue','itemCount')

def build_typescript(aggregate):
    """Derive exactly the aggregate tuples consumed by the live Next.js component."""
    totals=collections.defaultdict(collections.Counter)
    months=collections.defaultdict(collections.Counter)
    states=collections.defaultdict(collections.Counter)
    categories=collections.defaultdict(collections.Counter)
    for row in aggregate['monthlyByCustomerState']:
        year=row['month'][:4]
        for key in KEYS:
            value=row[key]
            totals['all'][key]+=value
            totals[year][key]+=value
            months[row['month']][key]+=value
            states[(row['state'],'all')][key]+=value
            states[(row['state'],year)][key]+=value
    for row in aggregate['categoryByCustomerState']:
        for year in ('all',row['month'][:4]):
            categories[(year,row['dimension'])]['itemValue']+=row['itemValue']

    all_totals=totals['all']
    assert all_totals['orders']==98582,'Not the verified recovered workbook: order count changed'
    assert all_totals['itemCount']==110929,'Item count changed'
    assert all_totals['late']<=all_totals['deliveryEligible']<=all_totals['delivered']<=all_totals['orders']
    assert all_totals['pricedOrders']<=all_totals['orders']
    assert sum(x['orders'] for x in months.values())==all_totals['orders']
    assert sum(x['late'] for x in months.values())==all_totals['late']
    assert sum(x['deliveryEligible'] for x in months.values())==all_totals['deliveryEligible']
    assert abs(sum(x['itemValue'] for (year,_),x in categories.items()
                   if year=='all')-all_totals['itemValue'])<.02
    assert sum(x['orders'] for (state,year),x in states.items()
               if year=='all')==all_totals['orders']

    def money(value):return round(value+0.00000001,2)
    def tuple_period(year):
        x=totals[year]
        return [int(x[k]) if k not in ('reviewSum','itemValue','freightValue')
                else money(x[k]) for k in KEYS]
    period={key:tuple_period(key) for key in ('all','2017','2018')}
    month_rows=[[month,int(x['orders']),int(x['late']),
                 int(x['deliveryEligible']),money(x['itemValue'])]
                for month,x in sorted(months.items())]
    category_top=[name for (year,name),_ in
                  sorted(categories.items(),
                         key=lambda pair:(-pair[1]['itemValue'],pair[0][1]))
                  if year=='all'][:8]
    category_rows=[[name]+[money(categories[(y,name)]['itemValue'])
                           for y in ('all','2017','2018')]
                   for name in category_top]
    category_rows.append(['Other categories']+
        [money(totals[y]['itemValue']-
               sum(categories[(y,name)]['itemValue'] for name in category_top))
         for y in ('all','2017','2018')])
    state_top=[state for (state,year),_ in
               sorted(states.items(),
                      key=lambda pair:(-pair[1]['orders'],pair[0][0]))
               if year=='all'][:10]
    state_rows=[]
    for state in state_top+['Other states']:
        values=[]
        for year in ('all','2017','2018'):
            x=(states[(state,year)] if state!='Other states' else
               totals[year]-sum((states[(k,year)] for k in state_top),
                                collections.Counter()))
            values.extend(int(x[k]) for k in ('orders','late','deliveryEligible'))
        state_rows.append([state]+values)
    assert sum(row[1] for row in state_rows)==all_totals['orders']
    assert sum(row[2] for row in state_rows)==all_totals['late']
    assert sum(row[3] for row in state_rows)==all_totals['deliveryEligible']
    assert abs(sum(row[1] for row in category_rows)-all_totals['itemValue'])<.02

    as_js=lambda x:json.dumps(x,ensure_ascii=False,separators=(',',':'))
    period_lines=',\n'.join(f'  {as_js(year)}: {as_js(period[year])}'
                            for year in ('all','2017','2018'))
    def js_rows(rows):return ',\n'.join('  '+as_js(row) for row in rows)
    return ("/**\n * GENERATED by projects/olist-reconstruction/rebuild.py from the recovered\n"
      " * Olist Dataset Clean v3.xlsx. Do not hand-edit these verified aggregates.\n"
      " * The source workbook is private, and this is NOT the original MMU PBIX.\n"
      " * Item value is listed item price, not payments, profit or realised revenue.\n"
      " */\n"
      "export type OlistPeriod = 'all' | '2017' | '2018';\n\n"
      "// [orders, delivered, late, eligible, reviewed, scoreSum, pricedOrders, itemValue, freight, items]\n"
      "export const periodTotals: Record<OlistPeriod, [number,number,number,number,number,number,number,number,number,number]> = {\n"
      +period_lines+"\n};\n\n"
      +"// [purchaseMonth, orders, late, eligible, listedItemValue]\n"
      +"export const monthTrend: Array<[string,number,number,number,number]> = [\n"
      +js_rows(month_rows)+"\n];\n\n"
      +"// [translatedCategory, all, 2017, 2018] by listed item price\n"
      +"export const categoryItemValues: Array<[string,number,number,number]> = [\n"
      +js_rows(category_rows)+"\n];\n\n"
      +"// [customerState, allOrders, allLate, allEligible, 2017Orders, 2017Late, 2017Eligible, 2018Orders, 2018Late, 2018Eligible]\n"
      +"export const customerStateBreakdown: Array<[string,number,number,number,number,number,number,number,number,number,number]> = [\n"
      +js_rows(state_rows)+"\n];\n")

def cli():
    parser=argparse.ArgumentParser(
        description='Regenerate and check aggregate-only Olist dashboard data from the private recovered workbook.')
    parser.add_argument('workbook',type=Path,
                        help='Path to Olist Dataset Clean v3.xlsx (never commit this workbook)')
    parser.add_argument('--output',type=Path,
                        default=Path(__file__).resolve().parents[2]/'lib/olist-reconstruction-data.ts')
    parser.add_argument('--check',action='store_true',
                        help='Fail when the existing TypeScript file differs; do not overwrite')
    args=parser.parse_args()
    if not args.workbook.is_file():
        parser.error('Workbook not found: '+str(args.workbook))
    global BOOK,OUT
    BOOK=args.workbook
    with tempfile.TemporaryDirectory(prefix='olist-rebuild-') as temporary:
        OUT=Path(temporary)/'intermediate.json'
        main()
        aggregate=json.loads(OUT.read_text(encoding='utf-8'))
        generated=build_typescript(aggregate)
    if args.check:
        assert args.output.is_file(),'Expected output file is missing'
        assert args.output.read_text(encoding='utf-8')==generated,(
            'Dashboard file differs from workbook. Regenerate and review.')
        print('PASS: dashboard data matches workbook; source stays private.')
    else:
        args.output.parent.mkdir(parents=True,exist_ok=True)
        args.output.write_text(generated,encoding='utf-8')
        print('GENERATED',args.output,'bytes',len(generated.encode('utf-8')))

if __name__=='__main__':cli()
