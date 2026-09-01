export type CaseStudy = {
  slug: string;
  name: string;
  label: string;
  title: string;
  lead: string;
  facts: Array<{ value: string; label: string }>;
  question: string;
  approach: string[];
  evidence: string;
  implications: string[];
  limitations: string;
  improvement: string;
  contribution: string;
  tools: string[];
};

export const cases: CaseStudy[] = [
  {
    slug: 'decision-intelligence',
    name: 'Decision Intelligence',
    label: 'Four-person MSc team project',
    title: 'Comparing scenarios and optimisation for a management decision',
    lead:
      'Our team audited and cleaned a business dataset, built an interactive management dashboard, tested margin scenarios and used optimisation to support a location and store-configuration recommendation.',
    facts: [
      { value: '60–70%', label: 'Margin scenarios tested' },
      { value: '4', label: 'Team members' },
      { value: '1', label: 'Optimisation-led recommendation' },
    ],
    question:
      'Which scenario and store configuration best supported the management objective, and how could the trade-offs be made clear to regional directors?',
    approach: [
      'Our team systematically audited missing values, outliers and inconsistencies, then applied appropriate cleaning.',
      'We built a management dashboard with KPIs, charts, slicers, dynamic formulas and drill-down.',
      'We modelled margin scenarios from 60% to 70% using simulation and sensitivity analysis.',
      'We used optimisation to compare location and store-configuration choices before making a recommendation.',
    ],
    evidence:
      'Assessor feedback confirmed systematic data checking, appropriate cleaning, a useful interactive dashboard, a correct optimisation model and a justified recommendation. The submission received a provisional group mark of 75; no final degree classification is claimed here.',
    implications: [
      'Put the management decision at the centre of the dashboard rather than treating every metric as equally important.',
      'Use scenarios to make the effect of changing assumptions visible before committing to a recommendation.',
      'Keep the model logic transparent enough for a decision-maker to challenge and understand.',
    ],
    limitations:
      'The work was an assessed decision model, not a production deployment. It does not evidence realised revenue, margin or operational impact.',
    improvement:
      'Add external evidence and decision-relevant KPIs such as sales per square metre, then publish a clearer formula and sensitivity audit.',
    contribution:
      'There were no fixed specialist roles. We divided the work as evenly as possible across four people, and every member covered the complete assignment. The dashboard, cleaning, scenarios and optimisation are therefore described as our team’s work, not my sole output.',
    tools: ['Excel', 'Dashboarding', 'Scenario modelling', 'Optimisation', 'Data quality'],
  },
  {
    slug: 'customer-intelligence',
    name: 'Customer Intelligence',
    label: 'Individual MSc dissertation',
    title: 'Examining trust in the relationship between personalisation and loyalty',
    lead:
      'I investigated whether perceived AI-driven personalisation was associated with customer loyalty and whether customer trust statistically mediated that relationship.',
    facts: [
      { value: '139', label: 'Complete eligible responses' },
      { value: '45', label: 'Structured variables' },
      { value: '10,000', label: 'Bootstrap samples' },
    ],
    question:
      'Is perceived AI-driven personalisation associated with loyalty among UK online shoppers, and is that association statistically mediated by trust?',
    approach: [
      'Designed and distributed a cross-sectional Qualtrics survey using convenience and snowball sampling.',
      'Checked consent, eligibility, completeness, value ranges and duplicate responses; preserved the raw export and created a locked SPSS dataset.',
      'Assessed scale reliability and factor structure using Cronbach’s alpha, KMO, Bartlett’s test and exploratory factor analysis.',
      'Ran Pearson correlations, HC3 robust regression, diagnostics and PROCESS Model 4 mediation with 10,000 bootstrap samples.',
      'Used Python for two figures and retained reproducible SPSS syntax.',
    ],
    evidence:
      'Personalisation and trust were positively correlated (r = .591, p < .001). In the trust regression model, personalisation was statistically associated with trust (R² = .349, B = .575). In the joint loyalty model, trust remained material (B = .526, p < .001), while personalisation’s direct coefficient was small and non-significant (B = .048, p = .552). The indirect effect through trust was .303 with a 95% bootstrap interval of [.199, .422].',
    implications: [
      'Treat trust as both a design criterion and a performance measure for personalisation.',
      'Explain why personalisation is happening and give customers meaningful control.',
      'Minimise data use, strengthen security and validate changes through staged experiments.',
      'Monitor trust alongside verified customer behaviour rather than relying on engagement alone.',
    ],
    limitations:
      'This was a cross-sectional, non-probability survey. The findings show statistical associations, not causal effects, and should not be treated as representative of every UK shopper.',
    improvement:
      'A longitudinal or experimental follow-up could test temporal order and causal mechanisms using a broader probability-based sample and verified behavioural outcomes.',
    contribution:
      'This was confirmed individual work. I designed the study, prepared and quality-checked the data, ran the analysis and translated the findings into recommendations. Raw participant data is not published.',
    tools: ['Qualtrics', 'SPSS', 'PROCESS Model 4', 'Python figures', 'Research ethics'],
  },
  {
    slug: 'process-redesign',
    name: 'Data Management',
    label: 'Four-person MSc team project',
    title: 'Translating business data flows into a relational SQL prototype',
    lead:
      'Our team moved from a business data-management problem through DFD and ERD design to a working relational database prototype.',
    facts: [
      { value: 'DFD', label: 'Data movement mapped' },
      { value: 'ERD', label: 'Relationships modelled' },
      { value: 'SQL', label: 'Prototype executed' },
    ],
    question:
      'How could clearer data flows and relational structure support more reliable reporting for an Uber Eats-style operating model?',
    approach: [
      'Our team defined the business problem and reviewed the organisation’s data-management context.',
      'We mapped the movement of data with a data-flow diagram and modelled the relational structure with an entity-relationship diagram.',
      'We translated the ERD into SQL scripts that created and populated the prototype database.',
      'We executed business queries against the populated structure to test the model and support reporting needs.',
    ],
    evidence:
      'The submitted scripts successfully created the database and tables, populated them and executed queries. Assessor feedback highlighted strong ERD-to-SQL alignment, clear naming and good query complexity. The submission received a provisional group mark of 65.',
    implications: [
      'Agree the business entities and relationships before building reports on top of them.',
      'Use the same business rules in the conceptual model and the implemented schema.',
      'Test the database through decision-relevant queries rather than treating creation as the finish line.',
    ],
    limitations:
      'No process automation was built or deployed. The work evidences analysis, relational design and a functioning assessed prototype only.',
    improvement:
      'Correct the DFD notation, deepen the supporting research, add comments to the SQL and introduce explicit test cases and a short governance note.',
    contribution:
      'There were no fixed specialist roles. We divided the work as evenly as possible across four people and shared coverage of the report, modelling and SQL prototype. I do not claim sole authorship of any one deliverable.',
    tools: ['SQL', 'Relational modelling', 'ERD', 'DFD', 'Data management'],
  },
  {
    slug: 'predictive-analytics',
    name: 'Predictive Analytics',
    label: 'Individual MSc project',
    title: 'Comparing churn models to support targeted retention decisions',
    lead:
      'I compared three classification approaches on a 4,000-record gym-membership dataset to identify a model that could support targeted retention decisions.',
    facts: [
      { value: '4,000', label: 'Membership records' },
      { value: '3', label: 'Classifiers compared' },
      { value: '4.42%', label: 'Best validation misclassification' },
    ],
    question:
      'Which classification approach best identified members at risk of churn, and how could its output support proportionate retention action?',
    approach: [
      'Imported a gym-customer dataset with 4,000 records and 14 attributes into SAS Enterprise Miner.',
      'Used a 40% training, 30% validation and 30% test partition; no oversampling was reported.',
      'Built decision-tree, logistic-regression and neural-network classifiers.',
      'Compared models using validation misclassification and interpreted the strongest displayed decision-tree drivers.',
      'Translated the model output into risk tiers, monitoring and responsible-use recommendations.',
    ],
    evidence:
      'The neural network produced the lowest validation misclassification at 4.42%, equivalent to 95.6% validation accuracy. Logistic regression recorded 6.18% and the decision tree 10.52% validation misclassification. The displayed tree highlighted membership length, contract length and visit behaviour among its strongest drivers.',
    implications: [
      'Use risk tiers to guide interventions rather than treating every flagged member in the same way.',
      'Watch early-tenure and declining-visit signals and connect scores to appropriately timed CRM workflows.',
      'Retain human review and monitor model fairness, drift and business performance.',
    ],
    limitations:
      'Model selection was based on validation performance. This was not a production deployment, and no achieved churn, revenue or cost improvement is claimed.',
    improvement:
      'Document preprocessing fully, compare test-set precision, recall and F1, assess business-cost thresholds and add explainability before any operational use.',
    contribution:
      'This was confirmed individual work. I built and compared the three models, interpreted their validation results and developed the business and responsible-use recommendations.',
    tools: ['SAS Enterprise Miner', 'Decision tree', 'Logistic regression', 'Neural network', 'Model comparison'],
  },
];

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}

