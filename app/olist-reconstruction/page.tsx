import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';
import { SiteHeader } from '@/components/site-header';
import { PageFooter } from '@/components/page-footer';
import { NativeLink } from '@/components/native-link';
import { OlistReconstructionDashboard } from '@/components/olist-reconstruction-dashboard';

export const metadata: Metadata = {
  ...pageMetadata(
    'Olist ecommerce dashboard',
    'Interactive, aggregate only Olist ecommerce dashboard built in Python from the eight table cleaned workbook of an MSc team Power BI project.',
    '/olist-reconstruction/',
  ),
};

export default function OlistReconstructionPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero">
          <div className="shell">
            <small>Interactive analysis · MSc team project data</small>
            <h1>Olist, revisited.<br /><span>From source tables to decision ready evidence.</span></h1>
            <p>A follow on to our team’s Power BI project. I rebuilt the analysis in Python from the cleaned workbook so anyone can explore orders, delivery timing, product categories and customer geography in the browser.</p>
            <p><strong>My part.</strong> I shared responsibilities on the original MSc team Power BI report. I independently built this Python rebuild, its tests and this interactive dashboard as my own follow on work.</p>
            <NativeLink className="arrow-link" href="/powerbi">View the original MSc team project case study ↗</NativeLink>
          </div>
        </section>
        <section className="shell olist-reconstruction" aria-label="Interactive Olist analysis">
          <OlistReconstructionDashboard />
        </section>
        <section className="shell olist-reconstruction__closing">
          <p className="overline">What I would test next</p>
          <h2>A dashboard points to a question; it does not answer why.</h2>
          <p>Add the payments table to compare delivery performance with order value; break the March 2018 delivery pattern down by seller, carrier and location; then test whether late deliveries lower review scores. The rates shown here are descriptive, so the next step is to find the drivers behind them.</p>
          <p><a className="arrow-link" href="https://github.com/dccchidera-lgtm/dccchidera-lgtm.github.io/tree/main/projects/olist-reconstruction" target="_blank" rel="noopener noreferrer">Inspect the reproducible Python analysis and tests ↗</a></p>
          <NativeLink className="arrow-link" href="/work">Back to selected work ↗</NativeLink>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
