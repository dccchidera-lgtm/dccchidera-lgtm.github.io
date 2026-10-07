export const projectSummaries: Record<
  string,
  { headline: string; result: string; takeaway: string; category: string }
> = {
  "loan-affordability": {
    headline: "What really drives loan affordability risk?",
    result: "Loan amount drove affordability pressure (β = .767). Credit score and interest rate were not significant.",
    takeaway:
      "Test assumed risk signals against the full model and report diagnostics alongside coefficients.",
    category: "Credit risk",
  },
  "customer-intelligence": {
    headline: "What connects personalisation to loyalty?",
    result:
      "139 responses. Trust remained material in the joint loyalty model.",
    takeaway:
      "Monitor trust alongside engagement, then test proposed changes experimentally.",
    category: "Customer research",
  },
  "predictive-analytics": {
    headline: "Which members might leave next?",
    result: "The neural network recorded 4.42% validation misclassification.",
    takeaway:
      "Compare retention costs and test set performance before using churn scores operationally.",
    category: "Predictive modelling",
  },
  "decision-intelligence": {
    headline: "Which store configuration makes sense?",
    result:
      "A dashboard, 60% to 70% margin scenarios and an optimisation recommendation.",
    takeaway:
      "Make assumptions visible so decision makers can challenge the recommendation.",
    category: "Decision modelling",
  },
  "ecommerce-bi": {
    headline: "What makes ecommerce reporting reliable?",
    result: "Nine related source tables covering 100,000+ orders required data preparation before cross table reporting.",
    takeaway: "Check data quality, joins and KPI definitions before making business recommendations.",
    category: "Business intelligence",
  },
  "process-redesign": {
    headline: "Can better data structure improve reporting?",
    result:
      "A normalised six table schema with keys and history, plus seven analytical queries.",
    takeaway:
      "Align the business rules, entity relationships and SQL before building reports.",
    category: "Data management",
  },
};
