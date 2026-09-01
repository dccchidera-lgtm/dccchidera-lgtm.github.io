import type { Metadata } from 'next';
import { CopyEmail } from '@/components/copy-email';
import { NativeLink } from '@/components/native-link';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Daniel Christopher about entry-level analytics, customer insight, marketing technology and digital transformation opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content" className="contact-page">
        <section className="contact-hero">
          <div className="shell">
            <p className="overline">Contact · Manchester, UK</p>
            <h1>
              Contact Daniel about
              <br />
              <span>an analytical or technology-facing opportunity.</span>
            </h1>
            <p className="contact-intro">
              I’m open to entry-level roles across business and data analysis, customer
              insight, marketing analytics, digital transformation and responsible
              AI-adjacent work. To discuss a role or a case study, email me or connect
              with me on LinkedIn.
            </p>
            <CopyEmail />
          </div>
        </section>

        <section className="contact-links">
          <div className="shell">
            <a href="mailto:dccchidera@gmail.com" className="contact-row" data-reveal>
              <span>Email</span>
              <strong>dccchidera@gmail.com</strong>
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-christopher-3a42a0254"
              target="_blank"
              rel="noreferrer"
              className="contact-row"
              data-reveal
            >
              <span>LinkedIn</span>
              <strong>Daniel Christopher</strong>
            </a>
            <a href="/Daniel_Christopher_Public_CV.pdf" className="contact-row" download>
              <span>CV</span>
              <strong>Download the one-page analyst CV</strong>
              <span>PDF</span>
            </a>
            <div className="contact-row contact-location" data-reveal>
              <span>Based in</span>
              <strong>Manchester, United Kingdom</strong>
              <span>UK</span>
            </div>
          </div>
        </section>

        <footer className="contact-footer">
          <div className="shell">
            <span>Daniel Christopher · 2026</span>
            <NativeLink href="/work">View the work</NativeLink>
          </div>
        </footer>
      </main>
    </>
  );
}
