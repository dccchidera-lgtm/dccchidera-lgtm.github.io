import { pageMetadata } from '@/lib/page-metadata';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';
import { NativeLink } from '@/components/native-link';
import { WorkBrowser } from '@/components/work-browser';
import { InteractiveEvidenceLab } from '@/components/interactive-evidence-lab';
import { bcuProjects } from '@/lib/bcu-projects';
import { cases } from '@/lib/cases';

export const metadata = pageMetadata(
  'Work',
  'Credit risk, customer research, churn modelling, SQL and Power BI case studies, plus digital builds and marketing projects by Daniel Christopher.',
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
            <small>Selected work · Undergraduate, postgraduate & independent</small>
            <h1>
              Selected work
              <br />
              <span>across data and digital.</span>
            </h1>
            <p>
              Digital builds, BCU marketing projects, independent analysis and MSc research in one place.
              Each project makes its methods, ownership and limits clear.
            </p>
          </div>
        </section>

        <section className="work-digital-feature" aria-labelledby="work-digital-title">
          <div className="shell">
            <p className="overline">Digital builds & independent work</p>
            <div className="work-digital-heading">
              <h2 id="work-digital-title">Building and analysing beyond the classroom.</h2>
              <p>A website I designed and deployed, a rebuilt ecommerce dashboard and reproducible public data work.</p>
            </div>
            <div className="work-digital-grid">
              <article>
                <span>01 · Independent digital project</span>
                <h3>This portfolio website</h3>
                <p>Built with Next.js, React and TypeScript, with responsive navigation, theme controls and case study storytelling.</p>
                <NativeLink className="arrow-link" href="/site-build">Explore the build ↗</NativeLink>
              </article>
              <article>
                <span>02 · Independent public data analysis</span>
                <h3>Restaurant service mix</h3>
                <p>Runnable Python analysis of 244 example bills, with data checks, descriptive findings and limits.</p>
                <NativeLink className="arrow-link" href="/service-mix">Explore the analysis ↗</NativeLink>
              </article>
              <article>
                <span>03 · MSc follow on analysis</span>
                <h3>Olist, revisited</h3>
                <p>Interactive ecommerce reporting built in Python from our team’s cleaned workbook of 98,582 orders.</p>
                <NativeLink className="arrow-link" href="/olist-reconstruction">Explore the dashboard ↗</NativeLink>
              </article>
            </div>
          </div>
        </section>

        <section className="work-spectrum" aria-label="Portfolio capability coverage">
          <div className="shell spectrum-grid">
            <article data-reveal><span>01</span><strong>Risk</strong><p>Data audits, regression and diagnostics on loan records.</p></article>
            <article data-reveal><span>02</span><strong>Research</strong><p>Survey design, quality checks and statistical interpretation.</p></article>
            <article data-reveal><span>03</span><strong>Decisions</strong><p>Dashboards, scenarios, optimisation and recommendations.</p></article>
            <article data-reveal><span>04</span><strong>Data</strong><p>Process models, relational design and SQL query methods.</p></article>
            <article data-reveal><span>05</span><strong>Prediction</strong><p>Model comparison, validation and action design.</p></article>
          </div>
        </section>

        <section className="work-index" aria-label="MSc analytics case studies">
          <div className="shell">
            <div className="work-index-intro"><p className="overline">Academic evidence</p><h2>Six MSc analytics case studies.</h2><p>Individual and team work, with original submission evidence and limitations identified.</p></div>
            <WorkBrowser projects={cases} />
          </div>
        </section>

        <section className="visual-methods" id="visual-methods" aria-labelledby="visual-methods-title">
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
          <div className="shell">
            <InteractiveEvidenceLab />
          </div>
        </section>

        <section className="ownership-note">
          <div className="shell attribution-grid" data-reveal>
            <p className="overline">Attribution matters</p>
            <div>
              <p>
                Two cases are individual projects and four are team projects. The credit risk, data management and decision modelling projects were completed in four person teams with shared responsibilities; the ecommerce BI project was also shared work.
              </p>
              <p>
                Group outputs are always described as “our team’s work.”
              </p>
            </div>
          </div>
        </section>

        <section className="work-digital-feature" aria-labelledby="bcu-work-title">
          <div className="shell">
            <p className="overline">Birmingham City University · BA (Hons) Digital Marketing</p>
            <div className="work-digital-heading"><h2 id="bcu-work-title">Audience insight and campaign strategy.</h2><p>Undergraduate research and creative planning, with each contribution and project’s scope explained.</p></div>
            <div className="work-digital-grid bcu-work-grid">
              {bcuProjects.map(project => <article key={project.id}>
                <span>{project.ownership}</span><h3>{project.title}</h3><p>{project.summary}</p>
                <NativeLink className="arrow-link" href={`/bcu#${project.id}`}>Explore the project ↗</NativeLink>
              </article>)}
            </div>
            <NativeLink className="arrow-link bcu-modules-link" href="/bcu#modules">View all 10 BCU modules ↗</NativeLink>
          </div>
        </section>

        <section className="writing-samples">
          <div className="shell writing-grid">
            <div className="writing-heading" data-reveal>
              <p className="overline">Further analytical writing</p>
              <h2>Research, frameworks and exploratory questions.</h2>
            </div>
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
              <h3>Cyber physical systems at Siemens</h3>
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
