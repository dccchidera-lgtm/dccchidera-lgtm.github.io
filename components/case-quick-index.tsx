import { NativeLink } from '@/components/native-link';

const caseRows = [
  {
    number: '01',
    name: 'Credit Risk Analytics',
    href: '/credit-risk',
    question: 'Which factors are associated with loan affordability risk?',
    found: 'Loan size and income mattered most; credit score and interest rate showed no significant effect.',
    ownership: 'Four person team',
  },
  {
    number: '02',
    name: 'Decision Intelligence',
    href: '/decisions',
    question: 'Which store configuration best supports the management objective?',
    found: 'Tested margin scenarios from 60% to 70% before recommending a store location and setup.',
    ownership: 'Four person team',
  },
  {
    number: '03',
    name: 'Customer Intelligence',
    href: '/research-case',
    question: 'Is the link between AI personalised shopping and customer loyalty carried by trust?',
    found: 'Personalisation was linked to loyalty largely through trust, in a survey of 139 shoppers.',
    ownership: 'Individual dissertation',
  },
  {
    number: '04',
    name: 'Data Management',
    href: '/sql',
    question: 'How can clearer data structure support reliable reporting?',
    found: 'Almost all delivery fees were missing; we designed a six table database for reliable reporting.',
    ownership: 'Four person team',
  },
  {
    number: '05',
    name: 'Predictive Analytics',
    href: '/churn',
    question: 'Which of three prediction methods best spots gym members at risk of leaving?',
    found: 'A neural network spotted likely leavers best, 95.6% accurate on held back checking data.',
    ownership: 'Individual project',
  },
  {
    number: '06',
    name: 'Ecommerce Business Intelligence',
    href: '/powerbi',
    question: 'How can ecommerce data spread across linked tables support reliable reporting?',
    found: 'Inconsistent data had to be cleaned before delivery, seller and customer figures could be compared.',
    ownership: 'Four person team',
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
          Each row gives the business question, what the work found and who did it, before you open the full case study.
        </p>
      </div>

      <div className="shell quick-index-table" role="table" aria-label="Summary of six documented analytics case studies" data-reveal>
        <div className="quick-index-header" role="row">
          <span role="columnheader">Case</span>
          <span role="columnheader">Business question</span>
          <span role="columnheader">What it found</span>
          <span role="columnheader">Ownership</span>
        </div>
        {caseRows.map((item) => (
          <article className="quick-index-row" role="row" key={item.number}>
            <div role="cell" data-label="Case">
              <span>{item.number}</span>
              <NativeLink href={item.href}>{item.name}</NativeLink>
            </div>
            <p role="cell" data-label="Business question">{item.question}</p>
            <p role="cell" data-label="What it found">{item.found}</p>
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

