import { NativeLink } from '@/components/native-link';

const caseRows = [
  {
    number: '01',
    name: 'Credit Risk Analytics',
    href: '/credit-risk',
    question: 'Which factors are associated with loan affordability risk?',
    method: 'Data audit · correlation · multiple regression',
    evidence: '44,986 records · R² .617 · credit score not significant',
    ownership: 'Four-person team',
  },
  {
    number: '02',
    name: 'Decision Intelligence',
    href: '/decisions',
    question: 'Which store configuration best supports the management objective?',
    method: 'Data audit · dashboard · scenarios · optimisation',
    evidence: '60–70% margin range stress-tested before the recommendation',
    ownership: 'Four-person team',
  },
  {
    number: '03',
    name: 'Customer Intelligence',
    href: '/research-case',
    question: 'Does trust mediate the association between personalisation and loyalty?',
    method: 'Survey · EFA · robust regression · mediation',
    evidence: 'Indirect effect .303 · 95% CI [.199, .422]',
    ownership: 'Individual dissertation',
  },
  {
    number: '04',
    name: 'Data Management',
    href: '/sql',
    question: 'How can clearer data structure support reliable reporting?',
    method: 'Data-flow diagram · ERD · SQL prototype',
    evidence: '99.7% of delivery fees missing · six-table schema',
    ownership: 'Four-person team',
  },
  {
    number: '05',
    name: 'Predictive Analytics',
    href: '/churn',
    question: 'Which classifier best identifies members at risk of churn?',
    method: 'Three classifiers · 40 / 30 / 30 partition',
    evidence: 'Neural network · 4.42% validation misclassification',
    ownership: 'Individual project',
  },
  {
    number: '06',
    name: 'Ecommerce Business Intelligence',
    href: '/powerbi',
    question: 'How can related ecommerce data support reliable cross-table reporting?',
    method: 'Power Query · Power BI · DAX · team analysis',
    evidence: 'Nine tables · 100,000+ orders · Power BI dashboard',
    ownership: 'MSc team project',
  },
];

export function CaseQuickIndex() {
  return (
    <section className="quick-index" aria-labelledby="quick-index-title">
      <div className="shell quick-index-heading" data-reveal>
        <div>
          <p className="overline">Case index · quick comparison</p>
          <h2 id="quick-index-title">Six case studies compared in one view.</h2>
        </div>
        <p>
          Each row identifies the business question, method, strongest evidence and
          ownership before you open the full case study.
        </p>
      </div>

      <div className="shell quick-index-table" role="table" aria-label="Summary of six documented analytics case studies" data-reveal>
        <div className="quick-index-header" role="row">
          <span role="columnheader">Case</span>
          <span role="columnheader">Business question</span>
          <span role="columnheader">Method</span>
          <span role="columnheader">Selected evidence</span>
          <span role="columnheader">Ownership</span>
        </div>
        {caseRows.map((item) => (
          <article className="quick-index-row" role="row" key={item.number}>
            <div role="cell" data-label="Case">
              <span>{item.number}</span>
              <NativeLink href={item.href}>{item.name}</NativeLink>
            </div>
            <p role="cell" data-label="Business question">{item.question}</p>
            <p role="cell" data-label="Method">{item.method}</p>
            <p role="cell" data-label="Selected evidence">{item.evidence}</p>
            <small role="cell" data-label="Ownership">{item.ownership}</small>
          </article>
        ))}
      </div>

      <div className="shell quick-index-note" data-reveal>
        <p>
          Two cases are individual and four are team projects. Team work had no fixed
          specialist roles and is described as the team’s output throughout.
        </p>
        <NativeLink href="/work">Open the full case index</NativeLink>
      </div>
    </section>
  );
}

