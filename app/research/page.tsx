import type { Metadata } from 'next';
import { NativeLink } from '@/components/native-link';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Method, evidence and limitations from Daniel Christopher’s MSc research into AI personalisation, trust and customer loyalty.',
};

const workflow = [
  ['01', 'Question', 'Define the relationship and the proposed mediating role of trust.'],
  ['02', 'Collect', 'Qualtrics survey of eligible UK online shoppers with consent and ethics controls.'],
  ['03', 'Prepare', 'Eligibility, completeness, duplicate, range and labelling checks across 45 variables.'],
  ['04', 'Validate', 'Reliability, KMO, Bartlett’s test and exploratory factor analysis.'],
  ['05', 'Model', 'Correlation, HC3 robust regression and 10,000-sample bootstrap mediation.'],
  ['06', 'Interpret', 'Translate associations into trust-centred recommendations and visible limits.'],
];

export default function ResearchPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="page-hero research-hero">
          <div className="shell">
            <small>Research practice</small>
            <h1>
              Research methods, evidence and
              <br />
              <span>limitations stated clearly.</span>
            </h1>
            <p>
              Research is most useful when the question, evidence, analytical choices and
              limitations remain visible.
            </p>
          </div>
        </section>

        <section className="research-question">
          <div className="shell research-question-grid" data-reveal>
            <p className="overline">The dissertation question</p>
            <div>
              <h2>
                Does trust statistically mediate the association between perceived
                AI-driven personalisation and customer loyalty?
              </h2>
              <p>
                Confirmed individual research using 139 complete, eligible UK
                online-shopper responses collected through Qualtrics on 7–8 August 2026.
              </p>
            </div>
          </div>
        </section>

        <section className="research-workflow">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <p className="overline">Analytical workflow</p>
              <h2>The six stages used to complete the dissertation analysis.</h2>
            </div>
            <ol>
              {workflow.map(([number, title, body]) => (
                <li key={number} data-reveal>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="results-section">
          <div className="shell results-grid" data-reveal>
            <div>
              <p className="overline">Selected results</p>
              <h2>Trust remained material in the joint loyalty model.</h2>
              <p>
                The pattern was consistent with an indirect, trust-mediated association,
                although the cross-sectional design does not establish causation.
              </p>
            </div>
            <div className="results-table" role="table" aria-label="Selected dissertation results">
              <div className="result-row result-head" role="row">
                <span role="columnheader">Test</span>
                <span role="columnheader">Result</span>
              </div>
              <div className="result-row" role="row">
                <span role="cell">Personalisation–trust correlation</span>
                <strong role="cell">r = .591 · p &lt; .001</strong>
              </div>
              <div className="result-row" role="row">
                <span role="cell">Trust model · personalisation coefficient</span>
                <strong role="cell">R² = .349 · B = .575</strong>
              </div>
              <div className="result-row" role="row">
                <span role="cell">Joint loyalty model · trust coefficient</span>
                <strong role="cell">B = .526 · p &lt; .001</strong>
              </div>
              <div className="result-row" role="row">
                <span role="cell">Joint loyalty model · personalisation direct coefficient</span>
                <strong role="cell">B = .048 · p = .552</strong>
              </div>
              <div className="result-row" role="row">
                <span role="cell">Indirect effect through trust</span>
                <strong role="cell">.303 · 95% CI [.199, .422]</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="research-standards">
          <div className="shell standards-grid">
            <article data-reveal>
              <span>01</span>
              <h3>Data quality</h3>
              <p>
                Consent, eligibility, completeness, range and duplicate checks; raw export
                preserved; locked SPSS dataset and cleaned CSV cross-checked.
              </p>
            </article>
            <article data-reveal>
              <span>02</span>
              <h3>Reproducibility</h3>
              <p>
                Structured variable labels, reproducible SPSS syntax and Python used only
                for two documented figures.
              </p>
            </article>
            <article data-reveal>
              <span>03</span>
              <h3>Privacy</h3>
              <p>
                Raw participant data is not public. The portfolio reports aggregate
                methods and findings without exposing individual responses.
              </p>
            </article>
            <article data-reveal>
              <span>04</span>
              <h3>Claim discipline</h3>
              <p>
                Cross-sectional convenience and snowball sampling supports association,
                not causation or population-wide representation.
              </p>
            </article>
          </div>
        </section>

        <section className="research-decision">
          <div className="shell research-decision-grid" data-reveal>
            <p className="overline">Decision implication</p>
            <div>
              <h2>Trust should be included when personalisation performance is assessed.</h2>
              <p>
                Explain personalisation, provide meaningful controls, minimise data use,
                strengthen security and monitor trust alongside verified behaviour. Test
                changes through staged experiments before treating the relationship as
                causal.
              </p>
              <NativeLink className="arrow-link" href="/work/customer-intelligence">
                View the business case
              </NativeLink>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </>
  );
}

