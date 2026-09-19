# Olist reconstructed dashboard — methodology and evidence

This interactive site is **not** an export or screenshot of Daniel Christopher's original MSc group-project Power BI report. The original PBIX has not been recovered. These figures were recomputed in September 2026 from the supplied **Olist Dataset Clean v3.xlsx** and are published only as aggregate data.

## Workbook audit

| Recovered worksheet | Data rows |
| --- | ---: |
| Customers | 99,441 |
| Orders | 98,582 |
| Order Items | 110,929 |
| Order Reviews | 97,334 |
| Products | 32,341 |
| Sellers | 3,095 |
| Category Translation | 73 |
| Geolocation | 50,000 |

**Eight worksheets were recovered**, rather than the nine related tables described in the original assessed BI case. The ninth table is not independently established; a payments or calendar table must not be assumed. The actual recovered workbook has **98,582 distinct order IDs** and 110,929 order-item rows. Its geolocation sheet has 50,000 rows but just 1,919 distinct postal prefixes; it must not be joined directly at ZIP prefix without prior deduplication/aggregation.

## Grain and calculations

- **Orders:** Count each distinct `Orders.order_id` once. Join `Customers` on `customer_id` for state; 0 unmatched customer keys.
- **Delivered:** `order_status = delivered`.
- **Late delivery:** For delivered orders with both `order_delivered_customer_date` and `order_estimated_delivery_date`, actual delivery strictly later than estimated. Numerator 7,824, denominator 96,386 for the complete workbook; ≈8.12%. The remaining delivered orders without both dates are excluded from this denominator. A late delivery is a descriptive flag, not proof of fault or customer harm.
- **Item value:** Sum `Order Items.price` once per line item after matching `order_id`; the 110,929 matched rows total 13,401,483.41 in dataset units. **Not** payments, realised revenue, margin or profit. Shipping (`freight_value`) is separate.
- **Average priced order:** Sum listed item prices / 97,193 orders with at least one item. There are 1,389 order records without an item row.
- **Reviews:** Available review scores counted once per order (the recovered 97,334 review rows have 97,334 distinct order IDs), with mean score 399,760 / 97,334 ≈ 4.11 out of 5.
- **Monthly trend:** Group by `order_purchase_timestamp` month; workbook Excel serial date base is 1899-12-30. At the dataset edges, September 2016 and September 2018 have tiny counts and are not full comparable trading months.
- **Product category:** Join `product_id`, then the provided category translations. Each item contributes once to its category; the same order may contribute to multiple categories. “Other categories” combines everything outside the eight largest categories by all-period listed item value.
- **Customer geography:** Group `customer_state` (not seller state). “Other states” combines everything outside the ten largest customer states by all-period order count.

## Reconciliation and interpretive limits

The aggregate-only site data are defined in `lib/olist-reconstruction-data.ts`. With the **All data** period selected, the monthly distinct order counts reconcile to 98,582, delivery-eligible counts reconcile to 96,386, and the eight displayed product categories plus Other reconcile to 13,401,483.41 in listed item prices.

The selectable 2017 and 2018 views do not reassign order items across years; they use their associated order purchase year. All data includes sparse 2016 months. No original dashboard screenshot, original DAX measure, payments table, causal finding, achieved commercial impact or raw individual record is asserted or uploaded.

The source workbook remains private and is not included in the public GitHub repository.
