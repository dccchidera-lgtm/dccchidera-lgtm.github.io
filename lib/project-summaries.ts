export const projectSummaries: Record<
  string,
  { headline: string; result: string; takeaway: string; category: string }
> = {
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
  "process-redesign": {
    headline: "Can better data structure improve reporting?",
    result:
      "A relational prototype that created tables, populated data and executed queries.",
    takeaway:
      "Align the business rules, entity relationships and SQL before building reports.",
    category: "Data management",
  },
};
