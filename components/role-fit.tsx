'use client';

import { useState } from 'react';
import { NativeLink } from '@/components/native-link';

const roles = [
  {
    id: 'business',
    label: 'Business analysis',
    headline: 'I structure business questions, test key trade-offs and explain how the evidence supports a recommendation.',
    summary:
      'A strong fit for work that needs requirements thinking, data quality, scenario analysis and clear communication between evidence and action.',
    strengths: ['Problem framing', 'Scenario modelling', 'Stakeholder-ready recommendations'],
    evidence: [
      {
        name: 'Decision Intelligence',
        detail: 'Dashboard, 60–70% margin scenarios and optimisation',
        ownership: 'Four-person team',
        href: '/work/decision-intelligence',
      },
      {
        name: 'Data Management',
        detail: 'Business process, DFD, ERD and SQL prototype',
        ownership: 'Four-person team',
        href: '/work/process-redesign',
      },
    ],
  },
  {
    id: 'data',
    label: 'Data analytics',
    headline: 'I assess data quality, select an appropriate method and communicate the limits as clearly as the result.',
    summary:
      'A strong fit for analytical work spanning data preparation, statistical investigation, model comparison and decision-focused reporting.',
    strengths: ['Data quality', 'Statistical analysis', 'Model validation'],
    evidence: [
      {
        name: 'Customer Intelligence',
        detail: 'Survey quality, regression and mediation analysis',
        ownership: 'Individual work',
        href: '/work/customer-intelligence',
      },
      {
        name: 'Predictive Analytics',
        detail: 'Three classifiers compared on 4,000 records',
        ownership: 'Individual work',
        href: '/work/predictive-analytics',
      },
    ],
  },
  {
    id: 'insight',
    label: 'Customer & CRM',
    headline: 'I combine customer context with structured research and responsible interpretation.',
    summary:
      'A strong fit for customer questions that benefit from digital marketing context, survey design and evidence translated into practical recommendations.',
    strengths: ['Customer research', 'Survey design', 'Insight communication'],
    evidence: [
      {
        name: 'Customer Intelligence',
        detail: 'AI personalisation, trust and loyalty research',
        ownership: 'Individual dissertation',
        href: '/work/customer-intelligence',
      },
      {
        name: 'Digital marketing foundation',
        detail: '2:1 BA (Hons), GA4 and customer research foundations',
        ownership: 'Profile evidence',
        href: '/profile#marketing-foundation',
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing analytics',
    headline: 'I connect audience understanding and digital measurement with evidence-led optimisation.',
    summary:
      'Relevant to junior marketing analytics, digital performance and campaign insight roles that value commercial context alongside data skills.',
    strengths: ['Audience segmentation', 'Digital measurement', 'Campaign evaluation'],
    evidence: [
      {
        name: 'Digital Marketing BA',
        detail: 'Market research, campaign methods, content and strategy',
        ownership: '2:1 degree foundation',
        href: '/profile#marketing-foundation',
      },
      {
        name: 'Customer Intelligence',
        detail: 'Customer research connecting personalisation, trust and loyalty',
        ownership: 'Individual dissertation',
        href: '/work/customer-intelligence',
      },
    ],
  },
  {
    id: 'technology',
    label: 'Digital & AI',
    headline: 'I evaluate how data, automation and digital change can support a business decision responsibly.',
    summary:
      'Relevant to entry-level digital transformation, technology consulting and AI-adjacent roles where model literacy, governance and business translation matter.',
    strengths: ['Technology evaluation', 'Model literacy', 'Responsible adoption'],
    evidence: [
      {
        name: 'Shopify transformation',
        detail: 'Cloud scaling, merchant capability and responsible platform change',
        ownership: 'Individual analysis',
        href: '/work#shopify-transformation',
      },
      {
        name: 'Predictive Analytics',
        detail: 'Three classifiers compared with validation-led interpretation',
        ownership: 'Individual project',
        href: '/work/predictive-analytics',
      },
    ],
  },
];

export function RoleFit() {
  const [activeId, setActiveId] = useState(roles[0].id);
  const active = roles.find((role) => role.id === activeId) ?? roles[0];

  return (
    <section className="role-fit" id="role-fit" aria-labelledby="role-fit-title">
      <div className="shell role-fit-heading" data-reveal>
        <p className="overline">Role fit · evidence linked</p>
        <h2 id="role-fit-title">I can apply this evidence across five entry-level role directions.</h2>
      </div>

      <div className="shell role-fit-shell" data-reveal>
        <div className="role-fit-tabs" role="tablist" aria-label="Choose a role lens">
          {roles.map((role, index) => (
            <button
              type="button"
              role="tab"
              id={`role-tab-${role.id}`}
              aria-controls="role-fit-panel"
              aria-selected={active.id === role.id}
              className={active.id === role.id ? 'active' : undefined}
              onClick={() => setActiveId(role.id)}
              key={role.id}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {role.label}
            </button>
          ))}
        </div>

        <article
          className="role-fit-panel"
          id="role-fit-panel"
          role="tabpanel"
          aria-labelledby={`role-tab-${active.id}`}
          data-role={active.id}
          aria-live="polite"
        >
          <div className="role-fit-intro">
            <span>{active.label}</span>
            <h3>{active.headline}</h3>
            <p>{active.summary}</p>
          </div>

          <div className="role-strengths" aria-label="Relevant strengths">
            {active.strengths.map((strength, index) => (
              <div key={strength}><span>0{index + 1}</span><strong>{strength}</strong></div>
            ))}
          </div>

          <div className="role-evidence">
            <p>Linked evidence</p>
            {active.evidence.map((item) => (
              <NativeLink href={item.href} key={`${active.id}-${item.name}`}>
                <div><strong>{item.name}</strong><span>{item.detail}</span></div>
                <small>{item.ownership}</small>
              </NativeLink>
            ))}
          </div>

          <p className="role-fit-note">
            Ownership is stated per case. Team evidence is never presented as sole output.
          </p>
        </article>
      </div>
    </section>
  );
}

