import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { PageFooter } from '@/components/page-footer';
import { NativeLink } from '@/components/native-link';
import { OlistReconstructionDashboard } from '@/components/olist-reconstruction-dashboard';

export const metadata: Metadata = {
  title: 'Olist data reconstruction | Daniel Christopher',
  description: 'Interactive, aggregate-only Olist ecommerce dashboard reconstructed from eight recovered MSc project workbook sheets. Original PBIX not recovered.',
  alternates: { canonical: '/olist-reconstruction/' },
};

export default function OlistReconstructionPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero">
          <div className="shell">
            <small>Reconstructed analysis · recovered MSc group-project data</small>
            <h1>Olist, revisited.<br /><span>From source tables to decision-ready evidence.</span></h1>
            <p>My original Power BI file was not recovered. Rather than reproduce an imagined screenshot, this interactive analysis rebuilds a transparent view from the cleaned workbook: orders, delivery timing, product categories and customer geography.</p>
            <NativeLink className="arrow-link" href="/powerbi">View the original MSc team-project case study ↗</NativeLink>
          </div>
        </section>
        <section className="shell olist-reconstruction" aria-label="Reconstructed interactive Olist analysis">
          <OlistReconstructionDashboard />
        </section>
        <section className="shell olist-reconstruction__closing">
          <p className="overline">What I would test next</p>
          <h2>A dashboard points to a question; it does not answer why.</h2>
          <p>Recheck order, payment and delivery keys against the complete original source; validate whether the missing ninth table was a payments table or a model-created date table; inspect the March 2018 delivery pattern by seller, carrier and location. Do not interpret the descriptive rates here as causal effects or proven cost savings.</p>
          <p><a className="arrow-link" href="https://github.com/dccchidera-lgtm/dccchidera-lgtm.github.io/tree/main/projects/olist-reconstruction" target="_blank" rel="noopener noreferrer">Inspect the reproducible Python analysis and tests ↗</a></p>
          <NativeLink className="arrow-link" href="/work">Back to selected work ↗</NativeLink>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
