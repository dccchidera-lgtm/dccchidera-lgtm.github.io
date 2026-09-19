import { pageMetadata } from '@/lib/page-metadata';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';
import { NativeLink } from '@/components/native-link';
import { WorkBrowser } from '@/components/work-browser';
import { cases } from '@/lib/cases';

export const metadata = pageMetadata(
  'Work',
  'Five MSc business analytics case studies featuring Daniel Christopher’s individual work and clearly attributed team work.',
  '/work/',
);

export default function WorkPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="page-hero">
          <div className="shell">
            <small>Selected work · 2025–2026</small>
            <h1>
              Five business analytics
              <br />
              <span>case studies.</span>
            </h1>
            <p>
              Verified MSc work showing how I frame a decision, assess the evidence,
              choose an appropriate method and explain the conclusions and limits.
            </p>
          </div>
        </section>

        <section className="work-spectrum" aria-label="Portfolio capability coverage">
          <div className="shell spectrum-grid">
            <article data-reveal><span>01</span><strong>Research</strong><p>Survey design, quality checks and statistical interpretation.</p></article>
            <article data-reveal><span>02</span><strong>Decisions</strong><p>Dashboards, scenarios, optimisation and recommendations.</p></article>
            <article data-reveal><span>03</span><strong>Data</strong><p>Process models, relational design and working SQL.</p></article>
            <article data-reveal><span>04</span><strong>Prediction</strong><p>Model comparison, validation and action design.</p></article>
          </div>
        </section>

        <section className="work-index">
          <div className="shell">
            <WorkBrowser projects={cases} />
          </div>
        </section>

        <section className="ownership-note">
          <div className="shell attribution-grid" data-reveal>
            <p className="overline">Attribution matters</p>
            <div>
              <p>
                Two cases are individual projects. Three are team projects. The data management and decision modelling projects were completed in four-person teams with shared responsibilities; the ecommerce BI project also involved shared work.
              </p>
              <p>
                Group outputs are always described as “our team’s work.” No realised
                commercial impact, deployment or sole ownership is implied.
              </p>
            </div>
          </div>
        </section>

        <section className="writing-samples">
          <div className="shell writing-grid">
            <div className="writing-heading" data-reveal>
              <p className="overline">Selected analytical writing</p>
              <h2>Additional analytical writing from individual assignments.</h2>
            </div>
            <article id="independent-service-mix" data-reveal>
              <span>Independent public-data project · reproducible Python</span>
              <h3>Restaurant service mix</h3>
              <p>Analysed 244 public example restaurant bills and compared lunch with dinner, separating descriptive evidence from unsupported staffing or profit claims.</p>
              <NativeLink className="arrow-link" href="/service-mix">Explore the project and runnable code</NativeLink>
            </article>
            <article id="shopify-transformation" data-reveal>
              <span>Individual analysis</span>
              <h3>Shopify digital transformation</h3>
              <p>
                Applied PESTLE, Markus’s technochange framework and Kotter’s change model
                to evaluate cloud scaling, merchant capability and ethical platform
                leadership.
              </p>
            </article>
            <article id="siemens-industry-4" data-reveal>
              <span>Individual analysis</span>
              <h3>Cyber-physical systems at Siemens</h3>
              <p>
                Used CPS architecture and a sociotechnical lens to examine operations,
                workforce capability, cybersecurity and sustainability.
              </p>
            </article>
          </div>
        </section>
      </main>

      <PageFooter />
    </>
  );
}
