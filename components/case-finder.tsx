'use client';

import { useState } from 'react';
import { NativeLink } from '@/components/native-link';

const choices = [
  {
    id: 'decision',
    prompt: 'Make a complex business decision',
    project: 'Decision Intelligence',
    title: 'Scenario and optimisation evidence for a management decision',
    type: 'Four-person team project',
    evidence: 'Dashboard · 60–70% margin scenarios · optimisation',
    note: 'Best for seeing how assumptions and trade-offs become a transparent recommendation.',
    metric: '60–70%',
    metricLabel: 'scenario range',
    href: '/work/decision-intelligence',
  },
  {
    id: 'customer',
    prompt: 'Understand customer behaviour',
    project: 'Customer Intelligence',
    title: 'Independent research into personalisation, trust and loyalty',
    type: 'Individual dissertation',
    evidence: 'Survey design · robust regression · mediation',
    note: 'Best for seeing independent research, careful interpretation and non-causal recommendations.',
    metric: '139',
    metricLabel: 'eligible responses',
    href: '/work/customer-intelligence',
  },
  {
    id: 'data',
    prompt: 'Design reliable data foundations',
    project: 'Data Management',
    title: 'Business data flows translated into a working SQL prototype',
    type: 'Four-person team project',
    evidence: 'DFD · ERD · working SQL prototype',
    note: 'Best for seeing how a business process becomes a relational design and executable queries.',
    metric: 'DFD → SQL',
    metricLabel: 'design path',
    href: '/work/process-redesign',
  },
  {
    id: 'predict',
    prompt: 'Compare predictive models',
    project: 'Predictive Analytics',
    title: 'Churn-model comparison linked to retention decisions',
    type: 'Individual MSc project',
    evidence: 'Decision tree · logistic regression · neural network',
    note: 'Best for seeing model comparison, validation and responsible retention actions.',
    metric: '4.42%',
    metricLabel: 'best validation error',
    href: '/work/predictive-analytics',
  },
];

export function CaseFinder() {
  const [activeId, setActiveId] = useState(choices[0].id);
  const active = choices.find((choice) => choice.id === activeId) ?? choices[0];

  return (
    <section className="case-finder" aria-labelledby="case-finder-title">
      <div className="shell case-finder-heading" data-reveal>
        <p className="overline">Find the relevant evidence</p>
        <h2 id="case-finder-title">
          Choose the business question most relevant to you.
        </h2>
      </div>

      <div className="shell case-finder-grid" data-reveal>
        <div className="case-finder-options" role="tablist" aria-label="Choose an analytical need">
          {choices.map((choice, index) => (
            <button
              type="button"
              role="tab"
              id={`finder-tab-${choice.id}`}
              aria-selected={active.id === choice.id}
              aria-controls="case-finder-result"
              className={active.id === choice.id ? 'active' : undefined}
              key={choice.id}
              onClick={() => setActiveId(choice.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{choice.prompt}</strong>
            </button>
          ))}
        </div>

        <article
          className="case-finder-result"
          id="case-finder-result"
          role="tabpanel"
          aria-labelledby={`finder-tab-${active.id}`}
          data-kind={active.id}
          aria-live="polite"
        >
          <div className="finder-result-top">
            <span>{active.project}</span>
            <span>{active.type}</span>
          </div>
          <div className="finder-signal" aria-hidden="true">
            <span /><span /><span /><span />
            <strong>{active.metric}</strong>
            <small>{active.metricLabel}</small>
          </div>
          <div className="finder-result-copy">
            <p>{active.evidence}</p>
            <h3>{active.title}</h3>
            <p>{active.note}</p>
            <NativeLink href={active.href}>Open the case study</NativeLink>
          </div>
        </article>
      </div>
    </section>
  );
}

