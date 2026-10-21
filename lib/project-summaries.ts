export const projectSummaries: Record<
  string,
  { headline: string; plain: string; result: string; takeaway: string; category: string }
> = {
  "loan-affordability": {
    headline: "What really drives loan affordability risk?",
    plain: "Our team asked what makes a loan hard for a borrower to afford. Loan size and income explained it far better than credit score or interest rate. We recommend sizing loans against income first. Coursework on public data, so links not causes.",
    result: "Loan size and income explained how hard a loan was to afford far better than credit score or interest rate.",
    takeaway:
      "Test assumed risk signals against the full model and report diagnostics alongside coefficients.",
    category: "Credit risk",
  },
  "customer-intelligence": {
    headline: "What connects personalisation to loyalty?",
    plain: "I asked whether AI personalisation is linked to customer loyalty among UK online shoppers, and whether trust explains the link. In my survey of 139 people, the link ran through trust. Businesses should track trust as well as engagement. This shows links, not cause.",
    result: "Trust carried the link between personalisation and loyalty, though a survey shows links, not cause.",
    takeaway:
      "Monitor trust alongside engagement, then test proposed changes experimentally.",
    category: "Customer research",
  },
  "predictive-analytics": {
    headline: "Which members might leave next?",
    plain: "I asked which of three prediction methods best identifies gym members likely to leave. A neural network was the most accurate on data held back for checking. A gym could use that to target retention effort, but costs and further testing would need checking first. Coursework, not deployed.",
    result: "A neural network was the best of three methods at identifying members likely to leave, on data held back for checking.",
    takeaway:
      "Compare retention costs and test set performance before using churn scores operationally.",
    category: "Predictive modelling",
  },
  "decision-intelligence": {
    headline: "Which store configuration makes sense?",
    plain: "Our team asked which store location and setup best met a management goal. We built a dashboard and tested margins from 60% to 70%, then used optimisation to recommend an option. The aim was to make assumptions visible so decision makers can challenge them. Coursework, not a live result.",
    result: "A dashboard and margin scenarios let the team test its assumptions before recommending a store location and setup.",
    takeaway:
      "Make assumptions visible so decision makers can challenge the recommendation.",
    category: "Decision modelling",
  },
  "ecommerce-bi": {
    headline: "What makes ecommerce reporting reliable?",
    plain: "Our team asked how linked ecommerce data could support reliable reports on deliveries, sellers and customer satisfaction. The data had inconsistencies that had to be cleaned before figures from different tables could be compared. We then built a Power BI reporting model. Coursework on public data, not a live system.",
    result: "Inconsistent source data had to be cleaned before delivery, seller and customer figures could be compared reliably.",
    takeaway: "Check data quality, joins and KPI definitions before making business recommendations.",
    category: "Business intelligence",
  },
  "process-redesign": {
    headline: "Can better data structure improve reporting?",
    plain: "Our team asked how clearer data structure could make reporting more reliable for an Uber Eats style business. Almost every delivery fee was missing from the 1,000 merchant records, so we designed a six table database and seven SQL queries. Coursework prototype on public data.",
    result: "The merchant data had large gaps, so the team designed a structured database and queries to support reliable reporting.",
    takeaway:
      "Align the business rules, entity relationships and SQL before building reports.",
    category: "Data management",
  },
};
