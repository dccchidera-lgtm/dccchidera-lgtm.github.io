import { publicPath } from '@/lib/paths';
import { ModelExplorer } from '@/components/model-explorer';
import { CaseQuickIndex } from '@/components/case-quick-index';
import { LoanRiskVisual } from '@/components/loan-risk-visual';
import { NativeLink } from '@/components/native-link';
import { SiteHeader } from '@/components/site-header';

const cases = [
  {
    number: '01',
    name: 'Credit Risk Analytics',
    title: 'Testing what drives',
    muted: 'loan affordability risk',
    description:
      'A four-person team analysis of 44,986 loan records in SPSS: a data audit, correlation and multiple regression (R² .617) showing that credit score and interest rate were not significant once other factors were included.',
    type: 'Team project',
    href: '/credit-risk',
    linkLabel: 'View case study and try the what-if model',
    visual: 'loan',
    tone: 'paper',
  },
  {
    number: '02',
    name: 'Customer Intelligence',
    title: 'Examining trust in the relationship',
    muted: 'between personalisation and loyalty',
    description:
      'My individual MSc dissertation: an ethically approved survey of 139 UK online shoppers, showing that trust carried the link between AI personalisation and loyalty.',
    type: 'Individual dissertation',
    href: '/research-case',
    visual: 'trust',
    tone: 'ink',
  },
  {
    number: '03',
    name: 'Predictive Analytics',
    title: 'Comparing churn models',
    muted: 'for targeted retention decisions',
    description:
      'An individual comparison of three churn classifiers in SAS Enterprise Miner on 4,000 gym members. The neural network reached 95.6% validation accuracy, and early tenure emerged as the main churn driver.',
    type: 'Individual project',
    href: '/churn',
    visual: 'model',
    tone: 'mist',
  },
  {
    number: '04',
    name: 'Data Management',
    title: 'Translating business data flows',
    muted: 'into a documented SQL prototype',
    description:
      'A four-person team audit of 1,000 merchant records (99.7% of delivery fees missing), followed by a normalised six-table schema and analytical SQL queries.',
    type: 'Team project',
    href: '/sql',
    visual: 'data',
    tone: 'paper',
  },
];

function ChapterVisual({ kind }: { kind: string }) {
  if (kind === 'loan') return <div className="chapter-visual"><LoanRiskVisual compact /></div>;
  const mode = kind === 'model' ? 'network' : kind === 'trust' ? 'trust' : kind === 'data' ? 'data' : 'decision';
  return <div className="chapter-visual chapter-visual--interactive"><ModelExplorer compact initialMode={mode} /></div>;
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
              <p className="overline">Business and data analyst · Manchester, UK</p>
              <span><i /> Available now for analyst roles</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-reveal">Daniel <span className="nowrap">Christopher.</span></span>
              <span className="secondary display-serif hero-reveal">I analyse customer and commercial data and turn the evidence into clearer decisions.</span>
            </h1>
            <div className="recruiter-actions">
              <NativeLink href="/work" className="button">Explore selected work</NativeLink>
              <a href={publicPath('/Daniel_Christopher_Public_CV.pdf')} download>Download CV <span aria-hidden="true">↗</span></a>
              <NativeLink href="/contact">Contact Daniel</NativeLink>
            </div>
            <div className="hero-footer">
              <div className="hero-intro hero-reveal">
                <p>
                  From loan-risk regression and churn models to SQL data audits and Power BI
                  reporting, I check the data first and then explain what it means for the decision.
                </p>
                <a className="arrow-link" href="#case-index">
                  Compare the case studies
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
                Dissertation submitted · Predicted Distinction
              </small>
            </div>
          </div>
        </section>

        <section className="candidate-facts" aria-label="Candidate profile at a glance">
          <dl className="shell candidate-facts-grid">
            <div data-reveal><dt>Qualifications</dt><dd>MSc Business Analytics · BA Digital Marketing 2:1</dd></div>
            <div data-reveal><dt>Status</dt><dd>Dissertation submitted</dd></div>
            <div data-reveal><dt>Based in</dt><dd>Manchester, UK</dd></div>
            <div data-reveal><dt>Focus</dt><dd>Performance · risk · BI reporting · customer insight</dd></div>
            <div data-reveal><dt>Languages</dt><dd>Native German · fluent English</dd></div>
          </dl>
        </section>

        <section className="proof-strip" aria-label="Portfolio evidence at a glance">
          <div className="shell proof-grid">
            <article data-reveal>
              <strong>06</strong>
              <span>analytics case studies</span>
            </article>
            <article data-reveal>
              <strong>44,986</strong>
              <span>loan records in the credit-risk study</span>
            </article>
            <article data-reveal>
              <strong>100,000+</strong>
              <span>ecommerce orders modelled in Power BI</span>
            </article>
            <article data-reveal>
              <strong>2 / 4</strong>
              <span>individual / team cases, each clearly attributed</span>
            </article>
          </div>
        </section>

        <section className="digital-feature" aria-labelledby="digital-feature-title">
          <div className="shell digital-feature-grid">
            <div className="digital-feature-copy" data-reveal>
              <p className="overline">Digital work · independently built</p>
              <h2 id="digital-feature-title">I make things, not just analyses.</h2>
              <p>I designed, coded and deployed this website myself. It is built to make research, code and evidence easy to explore, and it is where my next pieces of work will be published first.</p>
              <NativeLink className="arrow-link" href="/site-build">Explore how this site was built ↗</NativeLink>
            </div>
            <div className="digital-feature-details" data-reveal aria-label="Portfolio website build features">
              <div><span>01 / Product</span><strong>Next.js · React · TypeScript</strong></div>
              <div><span>02 / Experience</span><strong>Responsive layout · theme · navigation</strong></div>
              <div><span>03 / Evidence</span><strong>Original work and reconstructions distinguished</strong></div>
              <div><span>04 / Delivery</span><strong>Live on GitHub Pages</strong></div>
            </div>
          </div>
        </section>

        <div id="case-index">
          <CaseQuickIndex />
        </div>

        <div className="signal-marquee" aria-hidden="true">
          <div>
            <span>Credit risk</span><i>/</i><span>Customer research</span><i>/</i>
            <span>Predictive analytics</span><i>/</i><span>SQL & data quality</span><i>/</i>
            <span>Credit risk</span><i>/</i><span>Customer research</span><i>/</i>
            <span>Predictive analytics</span><i>/</i><span>SQL & data quality</span><i>/</i>
          </div>
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
                <ChapterVisual kind={item.visual} />
                <div className="chapter-copy" data-reveal>
                  <h2>
                    {item.title}
                    <br />
                    <span>{item.muted}</span>
                  </h2>
                  <p>{item.description}</p>
                  <NativeLink className="chapter-link" href={item.href}>
                    {'linkLabel' in item ? item.linkLabel : 'View case study'}
                  </NativeLink>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="writing-samples" aria-labelledby="beyond-title">
          <div className="shell writing-grid">
            <div className="writing-heading" data-reveal>
              <p className="overline">Beyond the classroom</p>
              <h2 id="beyond-title">Work, credentials and projects of my own.</h2>
            </div>
            <article data-reveal>
              <span>Professional experience · Oct 2025 to present</span>
              <h3>Security Officer, Constant Security Services</h3>
              <p>SIA-licensed front-of-house cover at university sites in Manchester, held alongside full-time study. The role depends on reliability, calm judgement and accurate incident and handover records.</p>
            </article>
            <article data-reveal>
              <span>Certifications · 2025</span>
              <h3>Google Data Analytics and more</h3>
              <p>Google Data Analytics Professional Certificate, Google Analytics (GA4), HackerRank SQL (Basic), DMI Certified Digital Marketing Associate and HubSpot Content Marketing.</p>
              <NativeLink className="arrow-link" href="/profile">View profile and credentials</NativeLink>
            </article>
            <article data-reveal>
              <span>Self-initiated follow-on · Python and public data</span>
              <h3>Olist, revisited, and a service-mix analysis</h3>
              <p>An interactive ecommerce dashboard rebuilt from the recovered cleaned workbook of 98,582 orders, plus a runnable Python analysis with data checks and documented limits.</p>
              <NativeLink className="arrow-link" href="/olist-reconstruction">Explore the Olist dashboard</NativeLink>
            </article>
            <article data-reveal>
              <span>BA Digital Marketing · Birmingham City University</span>
              <h3>Audience insight and campaign strategy</h3>
              <p>Undergraduate research and campaign planning for brands including Nando’s and Mailchimp. It is the customer-side grounding behind my analytical work.</p>
              <NativeLink className="arrow-link" href="/bcu">Explore the marketing projects</NativeLink>
            </article>
          </div>
        </section>

        <section className="profile-feature">
          <div className="shell profile-grid" data-reveal>
            <h2 data-reveal>
              Analytical by training, bilingual by background,
              <span>commercial in how I apply it.</span>
            </h2>
            <div className="profile-copy">
              <span className="profile-eyebrow">About Daniel</span>
              <p>
                An MSc in Business Analytics and a BA in Digital Marketing let me look at a
                question from both the numbers side and the customer side. I grew up in
                Germany and moved to the UK in Year 8, and I work natively in German and English.
              </p>
              <div className="profile-facts" aria-label="Profile highlights">
                <span>Native German · fluent English</span>
                <span>Analytics + digital marketing</span>
                <span>Full UK driving licence</span>
                <span>Open to hybrid, remote or relocation</span>
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
              I am open to graduate analyst roles in performance, risk and BI, <span>where clear evidence informs the decision.</span>
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
