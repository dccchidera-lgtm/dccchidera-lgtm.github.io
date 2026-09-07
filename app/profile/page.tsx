import type { Metadata } from "next";
import { NativeLink } from "@/components/native-link";
import { PageFooter } from "@/components/page-footer";
import { RoleFit } from "@/components/role-fit";
import { SiteHeader } from "@/components/site-header";
export const metadata: Metadata = {
  title: "Profile",
  description:
    "Meet Daniel Christopher: Business Analytics postgraduate, Digital Marketing graduate and English and German speaker based in Manchester.",
  alternates: { canonical: "/profile/" },
};
export default function ProfilePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero">
          <div className="shell">
            <small>Profile / Daniel Christopher</small>
            <h1>
              Curious about people.
              <br />
              <span>Careful with evidence.</span>
            </h1>
            <p>
              I bring customer understanding, analytical methods and an
              international perspective to business questions. Based in
              Manchester, ready for the next stage of my career.
            </p>
          </div>
        </section>
        <section className="section shell profile-intro-grid" id="about">
          <div>
            <p className="overline">My perspective</p>
            <h2>
              Marketing asks the question.
              <br />
              <span>Analytics tests the answer.</span>
            </h2>
            <p>
              My Digital Marketing degree taught me to think about audiences,
              propositions and commercial context. Business Analytics gave me a
              more rigorous way to investigate those questions through research,
              statistical modelling and data.
            </p>
            <p>
              I start with the decision, check whether the evidence can answer
              it and explain what the result means. I also make the boundaries
              clear: what I did, what the team did and what the analysis cannot
              establish.
            </p>
            <NativeLink className="text-link" href="/work">
              See that approach in my work ↗
            </NativeLink>
          </div>
          <dl className="profile-facts-list">
            <div>
              <dt>Current stage</dt>
              <dd>
                MSc Business Analytics
                <small>Dissertation submitted · final result pending</small>
              </dd>
            </div>
            <div>
              <dt>Foundation</dt>
              <dd>BA (Hons) Digital Marketing · 2:1</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>English and German</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Manchester, United Kingdom</dd>
            </div>
          </dl>
        </section>
        <section className="background-story" id="background">
          <div className="shell background-story-grid">
            <div>
              <p className="overline">Background</p>
              <h2>
                Different perspectives.
                <br />
                <span>One adaptable approach.</span>
              </h2>
              <p>
                My experience in Germany and the UK shaped how I communicate,
                learn and adapt. Working across different cultures taught me to
                listen carefully and approach unfamiliar situations with curiosity.
              </p>
              <p>
                I speak English and German and keep practising German daily.
                That international perspective sits alongside a practical
                interest in customer behaviour and how businesses make
                decisions.
              </p>
            </div>
            <div className="background-route" id="journey">
              <article>
                <span>Foundation</span>
                <strong>Xaverian College, Manchester</strong>
                <p>Business and German studies.</p>
              </article>
              <article>
                <span>Undergraduate</span>
                <strong>Birmingham City University</strong>
                <p>BA (Hons) Digital Marketing, awarded a 2:1.</p>
              </article>
              <article>
                <span>Postgraduate</span>
                <strong>Manchester Metropolitan University</strong>
                <p>
                  MSc Business Analytics. Dissertation on AI personalisation,
                  trust and loyalty submitted in August 2026; final result
                  pending.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section
          className="personal-milestones"
          id="milestones"
          aria-label="Qualifications and experience"
        >
          <div className="shell milestones-grid">
            <article>
              <strong>2:1</strong>
              <span>Digital Marketing degree</span>
              <small>Birmingham City University</small>
            </article>
            <article>
              <strong>MSc</strong>
              <span>Business Analytics</span>
              <small>Final result pending</small>
            </article>
            <article>
              <strong>DMI</strong>
              <span>Digital Marketing Associate</span>
              <small>Professional certification</small>
            </article>
            <article>
              <strong>85</strong>
              <span>Shopify transformation analysis</span>
              <small>Provisional individual assignment mark</small>
            </article>
          </div>
        </section>
        <section className="marketing-foundation" id="marketing-foundation">
          <div className="shell">
            <div className="marketing-heading">
              <div>
                <p className="overline">Skills in context</p>
                <h2>
                  Tools are useful.
                  <br />
                  <span>Knowing why matters more.</span>
                </h2>
              </div>
              <p>
                These capabilities come from degree work, research and training.
                The linked cases show where I applied them and how the work was
                assessed.
              </p>
            </div>
            <div className="marketing-capability-grid">
              <article>
                <span>01 / Research</span>
                <h3>Understand the customer</h3>
                <p>
                  Survey design, Qualtrics, data quality, SPSS and careful
                  statistical interpretation.
                </p>
                <NativeLink
                  className="text-link"
                  href="/work/customer-intelligence"
                >
                  Research case ↗
                </NativeLink>
              </article>
              <article>
                <span>02 / Decisions</span>
                <h3>Make assumptions visible</h3>
                <p>
                  Excel dashboards, scenario modelling, sensitivity analysis and
                  optimisation.
                </p>
                <NativeLink
                  className="text-link"
                  href="/work/decision-intelligence"
                >
                  Decision case ↗
                </NativeLink>
              </article>
              <article>
                <span>03 / Data</span>
                <h3>Build sound foundations</h3>
                <p>
                  SQL, entity relationships, data flow modelling and testing
                  business queries.
                </p>
                <NativeLink className="text-link" href="/work/process-redesign">
                  Database case ↗
                </NativeLink>
              </article>
              <article>
                <span>04 / Marketing</span>
                <h3>Connect to the audience</h3>
                <p>
                  Customer research, campaign strategy, GA4 training and digital
                  transformation analysis.
                </p>
                <NativeLink
                  className="text-link"
                  href="/work#shopify-transformation"
                >
                  Related writing ↗
                </NativeLink>
              </article>
            </div>
          </div>
        </section>
        <RoleFit />
        <section className="section shell" id="profile-contact">
          <p className="overline">The next chapter</p>
          <h2>Let’s put the work to use.</h2>
          <p style={{ marginTop: "1.5rem", maxWidth: "42rem" }}>
            I’m interested in opportunities across data analysis, business
            analysis, customer insight and marketing analytics.
          </p>
          <NativeLink className="button primary" href="/contact">
            Get in touch ↗
          </NativeLink>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
