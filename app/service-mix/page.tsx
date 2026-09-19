import { pageMetadata } from '@/lib/page-metadata';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';
import { NativeLink } from '@/components/native-link';

export const metadata = pageMetadata(
  'Restaurant service mix | Independent analysis',
  'An independent, reproducible public-data project comparing restaurant lunch and dinner bills and outlining decision limits.',
  '/service-mix/',
);

export default function ServiceMixPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="case-hero">
          <div className="shell">
            <p className="overline">Independent public-data project · Python / Pandas</p>
            <h1>When does a restaurant check look different?</h1>
            <p className="case-lead">A reproducible analysis of the public Plotly restaurant-bills sample. The question is how lunch and dinner differ by bill size and bill per cover, and what more an operator needs before changing staffing or offers.</p>
            <div className="case-takeaway"><span>Key point</span><p>Descriptive differences can suggest what to investigate; they cannot establish profitability or justify a rota change.</p><a href="#evidence">Explore the evidence ↓</a></div>
          </div>
        </section>
        <section className="case-facts">
          <div className="shell fact-grid">
            <div className="fact"><strong>244</strong><span>Public example bills</span></div>
            <div className="fact"><strong>68 / 176</strong><span>Lunch / dinner observations</span></div>
            <div className="fact"><strong>3</strong><span>Automated checks</span></div>
          </div>
        </section>
        <section className="case-content">
          <div className="shell case-layout">
            <div className="case-body">
              <section className="case-section" id="question">
                <p className="section-number">01 · Business question</p>
                <h2>Which service-period differences warrant a closer look?</h2>
                <p>With limited resources, a restaurant would want to understand how the value of a typical check and party size vary across service periods. This dataset supports an exploratory comparison, not an actual staffing recommendation.</p>
              </section>
              <section className="case-section" id="approach">
                <p className="section-number">02 · Runnable method</p>
                <h2>Validate, derive, compare and export.</h2>
                <p>I used Plotly’s public educational tips dataset; the Python script checks its 244 records for completeness, expected columns and plausible values, calculates bill per cover and tip rate, and exports period-level results and a chart.</p>
                <a className="arrow-link" href="https://github.com/dccchidera-lgtm/dccchidera-lgtm.github.io/tree/main/projects/restaurant-service-analysis">Open the runnable code and reproduction steps ↗</a>
              </section>
              <section className="case-section evidence-block" id="evidence">
                <p className="section-number">03 · Evidence</p>
                <h2>A descriptive comparison with the sample sizes visible.</h2>
                <figure className="case-visual">
                  <figcaption><span>Service-period results · dataset units</span><strong>Lunch compared with dinner.</strong></figcaption>
                  <div className="visual-result-strip">
                    <div><span>Average lunch bill / cover</span><strong>7.32</strong></div>
                    <div><span>Average dinner bill / cover</span><strong>8.11</strong></div>
                    <div><span>Median tip rate</span><strong>15.4% / 15.5%</strong></div>
                  </div>
                  <p>Lunch includes 68 bills, with a mean bill of 17.17; dinner includes 176 bills, with a mean bill of 20.80. These results are descriptive and rounded from the script outputs.</p>
                  <p className="visual-caveat">Source: Plotly’s public 244-bill restaurant example, not transactions collected by Daniel. Currency, margin and business outcomes are not established.</p>
                </figure>
              </section>
              <section className="case-section" id="implications">
                <p className="section-number">04 · Decision implications</p>
                <h2>What an operator would need next.</h2>
                <p>Before adjusting staffing or promotional spend, measure representative hourly orders, cover counts, contribution margin and labour costs over multiple weeks. The sample is small and unbalanced across service periods; the data have no known timestamps, staff allocation or profit information.</p>
                <NativeLink className="arrow-link" href="/work">Back to selected work</NativeLink>
              </section>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
