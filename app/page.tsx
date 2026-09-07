import { NativeLink } from "@/components/native-link";
import { SiteHeader } from "@/components/site-header";
import { PageFooter } from "@/components/page-footer";
import { ModelExplorer } from "@/components/model-explorer";
import { InteractiveEvidenceLab } from "@/components/interactive-evidence-lab";
import { ProjectCards } from "@/components/project-cards";
import { cases } from "@/lib/cases";
import { publicPath } from "@/lib/paths";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <section className="home-hero shell">
          <div className="hero-copy">
            <p className="overline">Daniel Christopher · Manchester, UK</p>
            <h1>
              Customer curiosity.
              <br />
              <span>Analytical clarity.</span>
            </h1>
            <p className="hero-description">
              I turn business questions into research, models and clear
              recommendations. Business Analytics postgraduate with a Digital
              Marketing foundation.
            </p>
            <div className="hero-cta">
              <NativeLink className="button primary" href="/work">
                Explore my work <span aria-hidden="true">↗</span>
              </NativeLink>
              <a
                className="button"
                href={publicPath("/Daniel_Christopher_Public_CV.pdf")}
                download
              >
                Download CV <span className="file-label">PDF</span>
              </a>
            </div>
            <p className="availability">
              Open to analyst and customer insight opportunities
            </p>
          </div>
          <ModelExplorer />
          <div className="hero-baseline">
            <span>Business analytics × digital marketing</span>
            <a href="#selected-work">Scroll to the evidence ↓</a>
          </div>
        </section>
        <section className="proof-strip" aria-label="Portfolio at a glance">
          <div className="shell proof-grid">
            <div>
              <strong>04</strong>
              <span>MSc case studies</span>
            </div>
            <div>
              <strong>139</strong>
              <span>Research responses</span>
            </div>
            <div>
              <strong>4,000</strong>
              <span>Churn study records</span>
            </div>
            <div>
              <strong>EN / DE</strong>
              <span>English and German</span>
            </div>
          </div>
        </section>
        <section className="section shell" id="selected-work">
          <div className="section-heading">
            <div>
              <p className="overline">01 / Selected work</p>
              <h2>Questions worth answering.</h2>
            </div>
            <NativeLink className="text-link" href="/work">
              Browse all work ↗
            </NativeLink>
          </div>
          <ProjectCards projects={cases} />
          <p className="section-note">
            2 individual projects · 2 team projects. Each case explains the
            method, findings, contribution and limits.
          </p>
        </section>
        <section className="research-spotlight">
          <div className="shell spotlight-grid">
            <div>
              <p className="overline">02 / Research spotlight</p>
              <h2>
                Personalisation gets attention.
                <br />
                <span>Trust deserves it too.</span>
              </h2>
              <p>
                In my study of 139 UK online shoppers, trust remained associated
                with loyalty when personalisation was included in the same
                model. Personalisation’s direct coefficient was small and
                statistically non significant.
              </p>
              <NativeLink className="button primary" href="/research">
                Explore the findings ↗
              </NativeLink>
            </div>
            <div className="finding-card">
              <span>Estimated indirect effect through trust</span>
              <strong>.303</strong>
              <div className="confidence-interval">
                <span>.199</span>
                <span>95% bootstrap interval</span>
                <span>.422</span>
              </div>
              <p>
                10,000 bootstrap samples. Statistical association; this survey
                does not establish causation.
              </p>
            </div>
          </div>
        </section>
        <section className="section shell" id="visual-methods">
          <div className="section-heading">
            <div>
              <p className="overline">03 / Explore the analysis</p>
              <h2>Look inside the evidence.</h2>
            </div>
            <p>
              Compare model results and explore the reasoning behind the
              research.
            </p>
          </div>
          <InteractiveEvidenceLab />
        </section>
        <section className="section about-preview shell">
          <div>
            <p className="overline">04 / A little about me</p>
            <h2>
              The customer context.
              <br />
              <span>The analytical discipline.</span>
            </h2>
          </div>
          <div>
            <p>
              Digital marketing taught me to ask what matters to an audience.
              Business analytics gave me the methods to test the answer. I bring
              both perspectives, plus English and German, to my next role.
            </p>
            <div className="tag-list">
              <span>SQL</span>
              <span>Excel</span>
              <span>SPSS</span>
              <span>SAS Enterprise Miner</span>
              <span>Qualtrics</span>
            </div>
            <NativeLink className="text-link" href="/profile">
              Meet Daniel ↗
            </NativeLink>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
