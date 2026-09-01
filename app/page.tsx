import type { CSSProperties } from 'react';
import { CaseQuickIndex } from '@/components/case-quick-index';
import { CaseFinder } from '@/components/case-finder';
import { NativeLink } from '@/components/native-link';
import { SiteHeader } from '@/components/site-header';

const cases = [
  {
    number: '01',
    name: 'Decision Intelligence',
    title: 'Comparing scenarios and optimisation',
    muted: 'for a management decision',
    description:
      'A four-person team project combining a management dashboard, margin scenarios and optimisation to support a location and store-configuration decision.',
    type: 'Team project',
    href: '/work/decision-intelligence',
    visual: 'decision',
    visualLabel: 'Scenario range from 60 to 70 percent leading to an optimisation decision',
    tone: 'paper',
  },
  {
    number: '02',
    name: 'Customer Intelligence',
    title: 'Examining trust in the relationship',
    muted: 'between personalisation and loyalty',
    description:
      'Individual MSc research into the statistical links among AI-driven personalisation, trust and customer loyalty in UK ecommerce.',
    type: 'Individual dissertation',
    href: '/work/customer-intelligence',
    visual: 'trust',
    visualLabel: '139 responses analysed with a personalisation and trust correlation of point 591',
    tone: 'ink',
  },
  {
    number: '03',
    name: 'Data Management',
    title: 'Translating business data flows',
    muted: 'into a relational SQL prototype',
    description:
      'A four-person team project moving from data-flow and entity models to a working relational SQL prototype.',
    type: 'Team project',
    href: '/work/process-redesign',
    visual: 'data',
    visualLabel: 'Data flow diagram translated to entity relationship design and SQL',
    tone: 'paper',
  },
  {
    number: '04',
    name: 'Predictive Analytics',
    title: 'Comparing churn models',
    muted: 'for targeted retention decisions',
    description:
      'An individual comparison of three churn classifiers in SAS Enterprise Miner, using a 4,000-record gym-membership dataset.',
    type: 'Individual project',
    href: '/work/predictive-analytics',
    visual: 'model',
    visualLabel: 'Validation misclassification comparison: tree 10.52 percent, logistic regression 6.18 percent, neural network 4.42 percent',
    tone: 'mist',
  },
];

function ChapterVisual({ kind, label }: { kind: string; label: string }) {
  if (kind === 'decision') {
    return (
      <div className="chapter-visual visual-decision" role="img" aria-label={label}>
        <div className="scenario-bars" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className="visual-caption" aria-hidden="true">
          <span>60%</span><span>Scenario range</span><span>70%</span>
        </div>
      </div>
    );
  }

  if (kind === 'trust') {
    return (
      <div className="chapter-visual visual-trust" role="img" aria-label={label}>
        <div className="trust-orbits" aria-hidden="true">
          <span /><span /><span /><i />
        </div>
        <div className="visual-stat" aria-hidden="true">
          <strong>r = .591</strong><span>personalisation × trust</span>
        </div>
      </div>
    );
  }

  if (kind === 'data') {
    return (
      <div className="chapter-visual visual-data" role="img" aria-label={label}>
        <div className="data-flow" aria-hidden="true">
          <span>DFD</span><i>→</i><span>ERD</span><i>→</i><span>SQL</span>
        </div>
        <div className="data-nodes" aria-hidden="true">
          <span /><span /><span /><span /><i /><b />
        </div>
      </div>
    );
  }

  return (
    <div className="chapter-visual visual-model" role="img" aria-label={label}>
      <div className="model-row" aria-hidden="true">
        <span>Decision tree</span><i style={{ '--score': '100%' } as CSSProperties} /><b>10.52%</b>
      </div>
      <div className="model-row" aria-hidden="true">
        <span>Logistic regression</span><i style={{ '--score': '59%' } as CSSProperties} /><b>6.18%</b>
      </div>
      <div className="model-row best" aria-hidden="true">
        <span>Neural network</span><i style={{ '--score': '42%' } as CSSProperties} /><b>4.42%</b>
      </div>
      <p aria-hidden="true">Validation misclassification · lower is better</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero">
          <div className="shell hero-inner">
            <div className="hero-kicker hero-reveal">
              <p className="overline">Analytics × digital marketing · Manchester, UK</p>
              <span><i /> Available for analytical and technology-facing roles</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-reveal">Daniel Christopher.</span>
              <span className="secondary display-serif hero-reveal">I study customer behaviour, test the evidence and explain the decision it supports.</span>
            </h1>
            <div className="hero-footer">
              <div className="hero-intro hero-reveal">
                <p>
                  I combine business analytics, digital marketing and customer understanding
                  to make evidence easier to act on.
                </p>
                <a className="arrow-link" href="#find-a-case">
                  Find a relevant case
                </a>
              </div>
              <ol className="hero-method hero-reveal" aria-label="Analytical workflow">
                <li><span>01</span>Question</li>
                <li><span>02</span>Method</li>
                <li><span>03</span>Evidence</li>
                <li><span>04</span>Action</li>
              </ol>
              <small className="hero-reveal">
                MSc Business Analytics
                <br />
                Dissertation submitted · final result pending
              </small>
            </div>
          </div>
        </section>

        <section className="candidate-facts" aria-label="Candidate profile at a glance">
          <dl className="shell candidate-facts-grid">
            <div data-reveal><dt>Qualifications</dt><dd>MSc Business Analytics · BA Digital Marketing 2:1</dd></div>
            <div data-reveal><dt>Status</dt><dd>Dissertation submitted</dd></div>
            <div data-reveal><dt>Based in</dt><dd>Manchester, UK</dd></div>
            <div data-reveal><dt>Role range</dt><dd>Analytics · MarTech · Digital transformation</dd></div>
            <div data-reveal><dt>Languages</dt><dd>English · German</dd></div>
          </dl>
        </section>

        <section className="proof-strip" aria-label="Portfolio evidence at a glance">
          <div className="shell proof-grid">
            <article data-reveal>
              <strong>04</strong>
              <span>verified case studies</span>
            </article>
            <article data-reveal>
              <strong>139</strong>
              <span>complete dissertation responses</span>
            </article>
            <article data-reveal>
              <strong>4,000</strong>
              <span>records in the churn study</span>
            </article>
            <article data-reveal>
              <strong>2 / 2</strong>
              <span>individual / team cases, each clearly attributed</span>
            </article>
          </div>
        </section>

        <CaseQuickIndex />

        <div className="signal-marquee" aria-hidden="true">
          <div>
            <span>Research design</span><i>/</i><span>Decision modelling</span><i>/</i>
            <span>SQL & data structure</span><i>/</i><span>Predictive analytics</span><i>/</i>
            <span>Research design</span><i>/</i><span>Decision modelling</span><i>/</i>
            <span>SQL & data structure</span><i>/</i><span>Predictive analytics</span><i>/</i>
          </div>
        </div>

        <div id="find-a-case">
          <CaseFinder />
        </div>

        <div id="work">
          {cases.map((item) => (
            <section className={`chapter ${item.tone}`} key={item.number}>
              <div className="chapter-inner">
                <div className="chapter-top">
                  <span>{item.number}</span>
                  <span>{item.name}</span>
                  <span>{item.type}</span>
                </div>
                <ChapterVisual kind={item.visual} label={item.visualLabel} />
                <div className="chapter-copy" data-reveal>
                  <h2>
                    {item.title}
                    <br />
                    <span>{item.muted}</span>
                  </h2>
                  <p>{item.description}</p>
                  <NativeLink className="chapter-link" href={item.href}>
                    View case study
                  </NativeLink>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="visual-methods" aria-labelledby="visual-methods-title">
          <div className="shell visual-methods-heading" data-reveal>
            <div>
              <p className="overline">Visual methods</p>
              <h2 id="visual-methods-title">Three views of the analytical evidence behind the case studies.</h2>
            </div>
            <p>
              The diagrams make model structure, validation results and statistical relationships
              easier to inspect. Every number comes from the submitted project evidence; conceptual
              elements are labelled as such.
            </p>
          </div>

          <div className="shell visual-methods-grid">
            <article className="method-panel method-panel--network" data-reveal>
              <header>
                <span>01 · Model architecture</span>
                <h3>Feed-forward neural network</h3>
                <p>Conceptual structure of the SAS Enterprise Miner method used for churn classification.</p>
              </header>
              <div
                className="portfolio-network"
                role="img"
                aria-label="Conceptual neural network with input features, a hidden representation and a churn output"
              >
                <div className="portfolio-network-layer">
                  <span /><span /><span /><span />
                  <strong>Input features</strong>
                </div>
                <div className="portfolio-network-links" aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </div>
                <div className="portfolio-network-layer portfolio-network-layer--hidden">
                  <span /><span /><span />
                  <strong>Hidden layer</strong>
                </div>
                <div className="portfolio-network-links portfolio-network-links--output" aria-hidden="true">
                  <i /><i /><i />
                </div>
                <div className="portfolio-network-layer portfolio-network-layer--output">
                  <span />
                  <strong>Churn output</strong>
                </div>
              </div>
              <p className="method-note">
                Conceptual topology. The submitted evidence does not retain the trained network weights or exact node count.
              </p>
              <NativeLink className="method-link" href="/work/predictive-analytics#evidence">
                Inspect predictive evidence
              </NativeLink>
            </article>

            <article className="method-panel method-panel--validation" data-reveal>
              <header>
                <span>02 · Validation comparison</span>
                <h3>Misclassification rate</h3>
                <p>Validation results from 4,000 records. The scale begins at zero; lower is better.</p>
              </header>
              <div
                className="validation-chart"
                role="img"
                aria-label="Validation misclassification rate: decision tree 10.52 percent, logistic regression 6.18 percent, neural network 4.42 percent"
              >
                <div className="validation-row">
                  <span>Decision tree</span><strong>10.52%</strong>
                  <i style={{ '--value': '87.7%' } as CSSProperties} />
                </div>
                <div className="validation-row">
                  <span>Logistic regression</span><strong>6.18%</strong>
                  <i style={{ '--value': '51.5%' } as CSSProperties} />
                </div>
                <div className="validation-row validation-row--best">
                  <span>Neural network</span><strong>4.42%</strong>
                  <i style={{ '--value': '36.8%' } as CSSProperties} />
                </div>
                <div className="validation-axis" aria-hidden="true"><span>0%</span><span>12%</span></div>
              </div>
              <p className="method-note">40 / 30 / 30 training, validation and test partition. No oversampling reported.</p>
              <NativeLink className="method-link" href="/work/predictive-analytics#evidence">
                Review the model comparison
              </NativeLink>
            </article>

            <article className="method-panel method-panel--mediation" data-reveal>
              <header>
                <span>03 · Relationship model</span>
                <h3>Trust in the mediation analysis</h3>
                <p>Cross-sectional evidence from 139 complete eligible responses.</p>
              </header>
              <div
                className="mediation-chart"
                role="img"
                aria-label="Personalisation, trust and loyalty mediation model. Personalisation and trust correlation r equals point 591. Indirect effect equals point 303 with 95 percent confidence interval point 199 to point 422."
              >
                <div className="mediation-node"><span>AI-driven</span><strong>Personalisation</strong></div>
                <div className="mediation-path"><span>association</span><strong>r = .591</strong><i aria-hidden="true">→</i></div>
                <div className="mediation-node mediation-node--signal"><span>Customer</span><strong>Trust</strong></div>
                <div className="mediation-path mediation-path--plain"><span>mediating path</span><i aria-hidden="true">→</i></div>
                <div className="mediation-node"><span>Customer</span><strong>Loyalty</strong></div>
              </div>
              <dl className="mediation-result">
                <div><dt>Indirect effect</dt><dd>.303</dd></div>
                <div><dt>95% confidence interval</dt><dd>[.199, .422]</dd></div>
                <div><dt>Bootstrap samples</dt><dd>10,000</dd></div>
              </dl>
              <p className="method-note">The design supports association and mediation estimates, not a causal claim.</p>
              <NativeLink className="method-link" href="/work/customer-intelligence#evidence">
                Inspect dissertation evidence
              </NativeLink>
            </article>
          </div>
        </section>

        <section className="attribution">
          <div className="shell attribution-grid" data-reveal>
            <p className="overline">Transparent attribution</p>
            <p>
              Two cases are individual projects. Two were completed in four-person teams
              with no fixed specialist roles: tasks were divided as evenly as possible,
              and every member covered the full assignment.
            </p>
          </div>
        </section>

        <section className="research-feature">
          <div className="shell research-feature-grid" data-reveal>
            <div>
              <small>MSc research · flagship individual study</small>
              <h2>
                AI personalisation and loyalty were associated.{' '}
                <span>Trust was central to the observed pattern.</span>
              </h2>
              <p>
                Research into AI-driven personalisation, customer trust and loyalty in UK
                ecommerce, based on 139 complete eligible responses.
              </p>
              <NativeLink className="arrow-link" href="/research">
                Explore the research
              </NativeLink>
            </div>
            <aside className="research-method-card" aria-label="Research method summary">
              <span>Method stack</span>
              <strong>Survey → quality checks → EFA → regression → mediation</strong>
              <dl>
                <div><dt>Variables</dt><dd>45</dd></div>
                <div><dt>Bootstrap samples</dt><dd>10,000</dd></div>
                <div><dt>Interpretation</dt><dd>Non-causal</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="profile-feature">
          <div className="shell profile-grid" data-reveal>
            <h2 data-reveal>
              Raised in Germany, developed in the UK, bringing digital marketing into
              <br />
              <span>business analytics.</span>
            </h2>
            <div className="profile-copy">
              <span className="profile-eyebrow">About Daniel</span>
              <p>
                I was raised in Germany and moved to the UK during Year 8. That experience
                shaped how I adapt and communicate; my two degrees now let me examine a
                business question through both customer and analytical lenses.
              </p>
              <div className="profile-facts" aria-label="Profile highlights">
                <span>Raised in Germany</span>
                <span>English + German</span>
                <span>577-day practice streak</span>
                <span>Analytics + digital marketing</span>
              </div>
              <div className="profile-links">
                <NativeLink className="arrow-link" href="/profile">
                  Profile
                </NativeLink>
                <NativeLink className="arrow-link" href="/work">
                  All work
                </NativeLink>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <h2>
              I am open to analytical and technology-facing work where <span>clear evidence informs the decision.</span>
            </h2>
            <div className="footer-bottom">
              <span>Daniel Christopher · 2026</span>
              <NativeLink href="/contact">Get in touch</NativeLink>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
