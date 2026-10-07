'use client';

import { useId, useMemo, useState } from 'react';
import { NativeLink } from '@/components/native-link';

type Proof = { title: string; detail: string; ownership: string; href: string };
type Skill = { id: string; label: string; keywords: string[]; proof: Proof[] };

/** Every proof point below is taken from the published case studies and CV. */
const skills: Skill[] = [
  {
    id: 'sql',
    label: 'SQL',
    keywords: ['sql', 'database', 'queries', 'query', 'relational', 'data model', 'schema', 't-sql', 'postgres', 'mysql', 'bigquery', 'snowflake'],
    proof: [
      { title: 'Data Management', detail: 'Normalised six table schema with primary and foreign keys, plus seven queries using joins, window functions and aggregation.', ownership: 'Team project, SQL build focus', href: '/sql' },
      { title: 'HackerRank SQL (Basic)', detail: 'Certified 2025.', ownership: 'Certification', href: '/profile' },
    ],
  },
  {
    id: 'powerbi',
    label: 'Power BI & DAX',
    keywords: ['power bi', 'powerbi', 'dax', 'power query', 'dashboard', 'dashboards', 'tableau', 'bi ', 'business intelligence', 'visualisation', 'visualization', 'reporting'],
    proof: [
      { title: 'Ecommerce Business Intelligence', detail: 'Nine linked tables and 100,000+ orders cleaned and modelled in Power Query, with DAX measures and report pages.', ownership: 'MSc team project', href: '/powerbi' },
      { title: 'Olist, revisited', detail: 'Interactive dashboard rebuilt from the recovered cleaned workbook of 98,582 orders.', ownership: 'Independent follow on', href: '/olist-reconstruction' },
    ],
  },
  {
    id: 'excel',
    label: 'Excel & modelling',
    keywords: ['excel', 'spreadsheet', 'spreadsheets', 'pivot', 'vlookup', 'xlookup', 'scenario', 'forecast', 'forecasting', 'optimisation', 'optimization', 'solver'],
    proof: [
      { title: 'Decision Intelligence', detail: 'Management dashboard with 60 to 70% margin scenarios and optimisation behind a location recommendation.', ownership: 'Four person team', href: '/decisions' },
    ],
  },
  {
    id: 'python',
    label: 'Python',
    keywords: ['python', 'pandas', 'numpy', 'jupyter', 'scripting', 'automation', 'programming'],
    proof: [
      { title: 'Restaurant service mix', detail: 'Runnable Pandas analysis with automated data checks and exported results.', ownership: 'Independent project', href: '/service-mix' },
      { title: 'Olist reconstruction', detail: 'Python rebuild script with tests that produces the dashboard data.', ownership: 'Independent follow on', href: '/olist-reconstruction' },
    ],
  },
  {
    id: 'stats',
    label: 'Statistics & regression',
    keywords: ['statistic', 'statistics', 'statistical', 'regression', 'spss', 'hypothesis', 'significance', 'correlation', 'quantitative', 'econometric', 'modelling', 'modeling'],
    proof: [
      { title: 'Credit Risk Analytics', detail: '12 predictor regression on 44,986 loan records (R² .617) with full diagnostics, plus an interactive what if model.', ownership: 'Four person team', href: '/credit-risk' },
      { title: 'Customer Intelligence dissertation', detail: 'Reliability testing, factor analysis, robust regression and bootstrapped mediation in reproducible SPSS syntax.', ownership: 'Individual', href: '/research-case' },
    ],
  },
  {
    id: 'ml',
    label: 'Predictive modelling',
    keywords: ['machine learning', 'predictive', 'classification', 'churn', 'sas', 'propensity', 'scoring', 'forecasting model', 'statistical model'],
    proof: [
      { title: 'Predictive Analytics', detail: 'Three churn classifiers compared on 4,000 members; the neural network reached 95.6% validation accuracy.', ownership: 'Individual', href: '/churn' },
    ],
  },
  {
    id: 'risk',
    label: 'Credit & risk',
    keywords: ['risk', 'credit', 'lending', 'loan', 'affordability', 'financial services', 'bank', 'banking', 'finance', 'financial', 'arrears', 'collections', 'fraud'],
    proof: [
      { title: 'Credit Risk Analytics', detail: 'Found that credit score and interest rate were not significant once loan size and income were included.', ownership: 'Four person team', href: '/credit-risk' },
    ],
  },
  {
    id: 'quality',
    label: 'Data quality',
    keywords: ['data quality', 'cleansing', 'cleaning', 'accuracy', 'validation', 'integrity', 'governance', 'reconciliation', 'audit', 'etl'],
    proof: [
      { title: 'Data Management', detail: 'Audited 1,000 merchant records: delivery fees missing for 99.7% and ratings for 58.2%.', ownership: 'Four person team', href: '/sql' },
      { title: 'Ecommerce Business Intelligence', detail: 'Fixed nulls, duplicates, orphaned keys and impossible delivery dates before reporting.', ownership: 'MSc team project', href: '/powerbi' },
      { title: 'Credit Risk Analytics', detail: 'Flagged implausible records, such as 100 years of work experience for a 35 year old.', ownership: 'Four person team', href: '/credit-risk' },
    ],
  },
  {
    id: 'performance',
    label: 'KPIs & performance',
    keywords: ['kpi', 'kpis', 'performance', 'metrics', 'mi ', 'management information', 'insight', 'insights', 'trend', 'trends', 'variance'],
    proof: [
      { title: 'Ecommerce Business Intelligence', detail: 'Report pages on delivery, sellers and customer satisfaction.', ownership: 'MSc team project', href: '/powerbi' },
      { title: 'Olist, revisited', detail: 'Monthly orders, late delivery rates and category and state breakdowns.', ownership: 'Independent follow on', href: '/olist-reconstruction' },
    ],
  },
  {
    id: 'stakeholders',
    label: 'Stakeholder communication',
    keywords: ['stakeholder', 'stakeholders', 'communication', 'communicate', ' present ', 'presentation', 'presenting', 'non-technical', 'storytelling', 'business partner', 'collaborat'],
    proof: [
      { title: 'Predictive Analytics', detail: 'Kept the decision tree alongside the best model so flags could be explained to nontechnical stakeholders.', ownership: 'Individual', href: '/churn' },
      { title: 'Ecommerce Business Intelligence', detail: 'Presented the dashboard in a 15 minute group talk.', ownership: 'MSc team project', href: '/powerbi' },
    ],
  },
  {
    id: 'research',
    label: 'Research & customer insight',
    keywords: ['survey', 'research', 'customer insight', 'consumer', 'segmentation', 'qualtrics', 'market research', 'user research'],
    proof: [
      { title: 'Customer Intelligence dissertation', detail: 'Ethically approved survey of 139 UK online shoppers on personalisation, trust and loyalty.', ownership: 'Individual', href: '/research-case' },
      { title: 'BCU marketing projects', detail: 'Audience research and campaign planning for brands including Nando’s and Mailchimp.', ownership: 'Undergraduate', href: '/bcu' },
    ],
  },
  {
    id: 'digital',
    label: 'Digital analytics',
    keywords: ['ga4', 'google analytics', 'digital', 'marketing', 'campaign', 'a/b', 'ab test', 'seo', 'crm', 'ecommerce', 'e-commerce'],
    proof: [
      { title: 'Profile and credentials', detail: 'Google Analytics (GA4), Google Data Analytics Professional Certificate and DMI Digital Marketing Associate.', ownership: 'Certifications', href: '/profile' },
      { title: 'BCU marketing projects', detail: 'Campaign, content and measurement planning from the BA in Digital Marketing.', ownership: 'Undergraduate', href: '/bcu' },
    ],
  },
];

function matchSkills(text: string) {
  const haystack = ` ${text.toLowerCase().replace(/\s+/g, ' ')} `;
  return skills.filter((skill) => skill.keywords.some((keyword) => haystack.includes(keyword)));
}

export function SkillMatch() {
  const id = useId();
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<string>('sql');
  const matched = useMemo(() => (text.trim().length > 20 ? matchSkills(text) : null), [text]);
  const shown = matched ?? skills.filter((skill) => skill.id === picked);

  return (
    <div className="skill-match">
      <label className="skill-match__paste" htmlFor={`${id}-jd`}>
        <span>Paste a job description (it stays in your browser)</span>
        <textarea
          id={`${id}-jd`}
          rows={4}
          value={text}
          placeholder="e.g. We’re looking for a graduate analyst with strong SQL and Excel, experience of Power BI dashboards and clear communication with stakeholders…"
          onChange={(event) => setText(event.target.value)}
        />
      </label>

      {matched ? (
        <p className="skill-match__summary" aria-live="polite">
          {matched.length
            ? `This role asks for ${matched.length} of the ${skills.length} skill areas I can evidence.`
            : 'No matching skill areas found yet. Try pasting the full requirements list.'}
          {text && (
            <button type="button" onClick={() => setText('')}>Clear</button>
          )}
        </p>
      ) : (
        <div className="skill-match__chips" role="group" aria-label="Choose a skill">
          {skills.map((skill) => (
            <button key={skill.id} type="button" aria-pressed={picked === skill.id} onClick={() => setPicked(skill.id)}>
              {skill.label}
            </button>
          ))}
        </div>
      )}

      <div className="skill-match__results">
        {shown.map((skill) => (
          <section key={skill.id} className="skill-match__skill" aria-label={skill.label}>
            <h3>{skill.label}</h3>
            <ul>
              {skill.proof.map((item) => (
                <li key={item.title + item.detail}>
                  <NativeLink href={item.href}>{item.title} ↗</NativeLink>
                  <p>{item.detail}</p>
                  <small>{item.ownership}</small>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
