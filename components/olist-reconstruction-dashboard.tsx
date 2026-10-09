'use client';

import { useMemo, useState } from 'react';
import {
  categoryItemValues,
  customerStateBreakdown,
  monthTrend,
  periodTotals,
  type OlistPeriod,
} from '@/lib/olist-reconstruction-data';

const MIN_RATED_DELIVERIES = 100;
type TrendMetric = 'orders' | 'late' | 'itemValue';
type StateMetric = 'late' | 'orders';
const fmtInt = new Intl.NumberFormat('en-GB');
const fmtDec = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 });
const fmtAmount = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });
const fmtMonth = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const fmtShortMonth = new Intl.DateTimeFormat('en-GB', { month: 'short', year: '2-digit', timeZone: 'UTC' });
const stateNames: Record<string, string> = {
  SP: 'São Paulo', RJ: 'Rio de Janeiro', MG: 'Minas Gerais', RS: 'Rio Grande do Sul',
  PR: 'Paraná', SC: 'Santa Catarina', BA: 'Bahia', DF: 'Distrito Federal',
  ES: 'Espírito Santo', GO: 'Goiás',
};

function percent(n: number, d: number) {
  return d ? (100 * n / d) : null;
}
function readableCategory(name: string) {
  return name.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function readableAmount(n: number) {
  const amount = n >= 1_000_000 ? `${fmtDec.format(n / 1_000_000)}m` :
    n >= 1_000 ? `${fmtDec.format(n / 1_000)}k` : fmtAmount.format(n);
  return `R$${amount}`;
}
function readableRate(rate: number | null) {
  return rate === null ? 'n/a' : `${fmtDec.format(rate)}%`;
}
function monthDate(month: string) {
  const [year, monthNumber] = month.split('-').map(Number);
  return new Date(Date.UTC(year, monthNumber - 1));
}

export function OlistReconstructionDashboard() {
  const [period, setPeriod] = useState<OlistPeriod>('all');
  const [trendMetric, setTrendMetric] = useState<TrendMetric>('orders');
  const [stateMetric, setStateMetric] = useState<StateMetric>('late');
  const totals = periodTotals[period];

  const selectedMonths = useMemo(
    () => monthTrend.filter(([month]) => period === 'all' || month.startsWith(period)),
    [period],
  );

  const trend = useMemo(() => selectedMonths.map(([month,orders,late,eligible,itemValue]) => {
    const value = trendMetric === 'orders' ? orders :
      trendMetric === 'itemValue' ? itemValue :
        eligible >= MIN_RATED_DELIVERIES ? percent(late,eligible) : null;
    return { month, value, orders, late, eligible };
  }), [selectedMonths, trendMetric]);

  const maxTrend = Math.max(1, ...trend.map((item) => item.value ?? 0));
  const categoryIndex = period === 'all' ? 1 : period === '2017' ? 2 : 3;
  const categories = categoryItemValues
    .filter(([label]) => label !== 'Other categories')
    .map(([label,...values]) => ({
      label: readableCategory(label), value: values[categoryIndex - 1],
    }))
    .sort((a,b) => b.value - a.value);
  const categoryMax = Math.max(...categories.map((item) => item.value));
  const otherCategory = categoryItemValues.find(([label]) => label === 'Other categories');
  const otherCategoryValue = otherCategory ? Number(otherCategory[categoryIndex]) : 0;

  const stateIndex = period === 'all' ? 1 : period === '2017' ? 4 : 7;
  const states = customerStateBreakdown
    .filter(([label]) => label !== 'Other states')
    .map((row) => {
      const orders = Number(row[stateIndex]);
      const late = Number(row[stateIndex + 1]);
      const eligible = Number(row[stateIndex + 2]);
      const rate = percent(late,eligible);
      return { label: row[0], name: stateNames[row[0]] ?? row[0], orders, late, eligible, rate,
        value: stateMetric === 'orders' ? orders : (rate ?? 0) };
    })
    .sort((a,b) => b.value - a.value);
  const stateMax = Math.max(1,...states.map((r) => r.value));
  const score = totals[4] ? totals[5] / totals[4] : 0;
  const lateRate = percent(totals[2],totals[3]);
  const meanPricedOrder = totals[6] ? totals[7] / totals[6] : 0;
  const busiestMonth = [...selectedMonths].sort((a, b) => b[1] - a[1])[0];
  const busiestRate = busiestMonth ? percent(busiestMonth[2], busiestMonth[3]) : null;
  const highestRateMonth = selectedMonths
    .filter((row) => row[3] >= 500)
    .map(([month, , late, eligible]) => ({ month, rate: 100 * late / eligible }))
    .sort((a, b) => b.rate - a.rate)[0];
  const rateMultiple = highestRateMonth && lateRate !== null && lateRate > 0
    ? (highestRateMonth.rate / lateRate).toFixed(1) : 'n/a';
  const statesByRate = states
    .filter((state) => state.rate !== null)
    .sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
  const highestRateState = statesByRate[0];
  const lowestRateState = statesByRate[statesByRate.length - 1];

  return (
    <div className="olist-dash">
      <div className="olist-dash__toolbar">
        <div>
          <span className="olist-dash__eyebrow">Explore the data</span>
          <strong>Period</strong>
        </div>
        <div className="olist-dash__period" role="group" aria-label="Select purchase year">
          {(['all','2017','2018'] as const).map((value) => (
            <button key={value} type="button" aria-pressed={period === value}
              onClick={() => setPeriod(value)}>{value === 'all' ? 'All data' : value}</button>
          ))}
        </div>
      </div>

      <section className="olist-dash__findings" aria-labelledby="olist-findings-title">
        <h2 id="olist-findings-title">What the data shows</h2>
        <ul aria-live="polite">
          <li>{busiestMonth ? <>{fmtMonth.format(monthDate(busiestMonth[0]))} was busiest with <strong>{fmtInt.format(busiestMonth[1])} orders</strong>; <strong>{readableRate(busiestRate)}</strong> of eligible deliveries arrived after estimate, versus <strong>{readableRate(lateRate)}</strong> overall.</> : 'Busiest month: n/a.'}</li>
          <li>{highestRateMonth ? <>Among months with at least {fmtInt.format(500)} eligible deliveries, {fmtMonth.format(monthDate(highestRateMonth.month))} had the highest after estimate rate at <strong>{readableRate(highestRateMonth.rate)}</strong>, <strong>{rateMultiple} times</strong> the overall rate.</> : 'Highest monthly after estimate rate: n/a.'}</li>
          <li>{highestRateState && lowestRateState ? <>Among the {states.length === 10 ? 'ten' : fmtInt.format(states.length)} shown states, {highestRateState.name} had the highest after estimate rate at <strong>{readableRate(highestRateState.rate)}</strong>, versus {lowestRateState.name} at <strong>{readableRate(lowestRateState.rate)}</strong>, the lowest.</> : 'State after estimate comparison: n/a.'}</li>
        </ul>
        <p className="olist-dash__footnote">Descriptive patterns only; they show where to look, not why it happened.</p>
      </section>

      <div className="olist-dash__kpis">
        <div><span>Distinct orders</span><strong>{fmtInt.format(totals[0])}</strong><small>One count per order ID</small></div>
        <div><span>Delivered orders</span><strong>{fmtInt.format(totals[1])}</strong><small>Status = delivered</small></div>
        <div><span>Delivered after estimate</span><strong>{readableRate(lateRate)}</strong><small>{fmtInt.format(totals[2])} / {fmtInt.format(totals[3])} eligible</small></div>
        <div><span>Listed item value</span><strong>{readableAmount(totals[7])}</strong><small>Sum of item prices, not profit</small></div>
        <div><span>Average item priced order</span><strong>R${fmtAmount.format(meanPricedOrder)}</strong><small>Excludes orders without items</small></div>
        <div><span>Mean review score</span><strong>{score.toFixed(2)} / 5</strong><small>{fmtInt.format(totals[4])} reviewed orders</small></div>
      </div>

      <div className="olist-dash__grid">
        <section className="olist-dash__panel olist-dash__panel--wide" aria-labelledby="olist-month-title">
          <div className="olist-dash__paneltop">
            <div>
              <span className="olist-dash__eyebrow">01 · Purchase month</span>
              <h2 id="olist-month-title">How did the pattern change over time?</h2>
            </div>
            <label>Measure
              <select value={trendMetric} onChange={(e) => setTrendMetric(e.target.value as TrendMetric)}>
                <option value="orders">Distinct orders</option>
                <option value="late">Delivery after estimate (%)</option>
                <option value="itemValue">Listed item value</option>
              </select>
            </label>
          </div>
          <div className="olist-dash__trend" role="group"
            aria-label={`Monthly ${trendMetric === 'orders' ? 'distinct orders' : trendMetric === 'late' ? 'delivery after estimate rates' : 'listed item value'} comparison for ${period === 'all' ? 'all available periods' : period}. Each bar has an accessible label with exact figures.`}>
            {trend.map(({month,value,orders,late,eligible}) => {
              const label = value === null ? 'n/a' :
                trendMetric === 'late' ? `${fmtDec.format(value)}%` :
                trendMetric === 'itemValue' ? readableAmount(value) : fmtInt.format(value);
              const aboveOverall = trendMetric === 'late' && value !== null && lateRate !== null && value > lateRate;
              const barLabel = `${fmtMonth.format(monthDate(month))}: ${value === null ? 'too few deliveries to rate' : label}; ${fmtInt.format(orders)} orders; ${fmtInt.format(late)} delivered after estimate out of ${fmtInt.format(eligible)} eligible deliveries${aboveOverall ? '; above the overall rate' : ''}`;
              return (
                <div className="olist-dash__trenditem" key={month}
                  role="img" aria-label={barLabel} title={barLabel}>
                  <span className="olist-dash__trendvalue" aria-hidden="true">{label}</span>
                  <span className="olist-dash__trendtrack" aria-hidden="true">
                    <span className={aboveOverall ? 'olist-dash__trendabove' : undefined} style={{height:`${value === null ? 0 : 100 * value / maxTrend}%`}} />
                  </span>
                  <span className="olist-dash__trendlabel" aria-hidden="true">{fmtShortMonth.format(monthDate(month))}</span>
                </div>
              );
            })}
          </div>
          {trendMetric === 'late' && <p className="olist-dash__legend"><span aria-hidden="true" />Striped bars show months above the period’s overall after estimate rate ({readableRate(lateRate)}).</p>}
          <p className="olist-dash__footnote">A month is assigned by purchase date. The data begin and end with sparsely populated months; do not treat those edges as full trading periods. Delivery comparisons use only delivered orders with both delivery and estimated dates, and monthly rates are not shown for months with fewer than {MIN_RATED_DELIVERIES} eligible deliveries.</p>
        </section>

        <section className="olist-dash__panel" aria-labelledby="olist-category-title">
          <span className="olist-dash__eyebrow">02 · Product category</span>
          <h2 id="olist-category-title">Which categories carry item value?</h2>
          <p>Sum of listed item prices by the translated product category. Multi item orders contribute to each applicable category.</p>
          <div className="olist-dash__bars">
            {categories.map(({label,value}) => (
              <div className="olist-dash__bar" key={label}>
                <div><span>{label}</span><strong>{readableAmount(value)}</strong></div>
                <span className="olist-dash__bartrack"><span style={{width:`${100*value/categoryMax}%`}} /></span>
              </div>
            ))}
          </div>
          <p className="olist-dash__footnote">Other categories combined: {readableAmount(otherCategoryValue)}. The eight individually displayed categories were selected by total item value across the workbook, not selected again to flatter a year.</p>
        </section>

        <section className="olist-dash__panel" aria-labelledby="olist-state-title">
          <div className="olist-dash__paneltop">
            <div>
              <span className="olist-dash__eyebrow">03 · Customer state</span>
              <h2 id="olist-state-title">Where are orders and delayed deliveries concentrated?</h2>
            </div>
            <label>Measure
              <select value={stateMetric} onChange={(e) => setStateMetric(e.target.value as StateMetric)}>
                <option value="late">After estimate rate</option>
                <option value="orders">Order count</option>
              </select>
            </label>
          </div>
          <div className="olist-dash__bars">
            {states.map((s) => (
              <div className="olist-dash__bar" key={s.label} title={`${s.name} (${s.label}): ${fmtInt.format(s.orders)} orders, ${fmtInt.format(s.late)} delivered after estimate out of ${fmtInt.format(s.eligible)} eligible`}>
                <div><span>{s.name} ({s.label}) <small>· {fmtInt.format(s.orders)} orders</small></span>
                  <strong>{stateMetric === 'orders' ? fmtInt.format(s.orders) : readableRate(s.rate)}</strong></div>
                <span className="olist-dash__bartrack"><span style={{width:`${100*s.value/stateMax}%`}} /></span>
              </div>
            ))}
          </div>
          <p className="olist-dash__footnote">Top ten Brazilian states by order volume in the entire dataset. Grouping uses customer state, not seller state. Differences are descriptive and are not evidence of root causes or operational intervention.</p>
        </section>
      </div>
      <div className="olist-dash__method">
        <span>Provenance / limitations</span>
        <p><strong>How this was built.</strong> Calculated independently in Python from the team’s <em>Olist Dataset Clean v3.xlsx</em> workbook: eight worksheets containing 98,582 unique order records and 110,929 order item rows. It complements the original MSc Power BI report rather than reproducing its pages.</p>
        <p>Values in Brazilian reais (R$). Item value is the sum of listed item prices, not payment, realised revenue or margin. A late order means delivered strictly after its estimated date; cancelled or undelivered orders do not enter the rate. Scores are averaged over available order reviews; no causal effects or achieved business savings are claimed. Only aggregate counts and values are published; no raw customer, order, address or seller records.</p>
        <p><strong>Data quality decisions:</strong> 1,389 orders have no item rows and are excluded from the mean item priced order. The 50,000 row geolocation sheet has 1,919 unique postal prefixes and is deliberately excluded from joins to prevent multiplying orders. The missing payments worksheet means the page does not claim actual sales or profitability.</p>
      </div>
    </div>
  );
}
