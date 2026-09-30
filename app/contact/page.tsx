import { publicPath } from '@/lib/paths';
import { pageMetadata } from '@/lib/page-metadata';
import { CopyEmail } from '@/components/copy-email';
import { NativeLink } from '@/components/native-link';
import { SiteHeader } from '@/components/site-header';

export const metadata = pageMetadata(
  'Contact',
  'Contact Daniel Christopher about graduate data, BI, performance and risk analyst roles. Available immediately, based in Manchester, with full UK right to work.',
  '/contact/',
);

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
              Let’s talk
              <br />
              <span>about working together.</span>
            </h1>
            <p className="contact-intro">
              I’m open to graduate analyst roles in performance, risk, BI reporting and
              customer insight, particularly in financial services. I’m available
              immediately, based in Manchester and open to hybrid work across the North
              West, Yorkshire, the Midlands or London. I have full UK right to work and
              need no sponsorship. To discuss a role or a case study, email me or connect
              with me on LinkedIn.
            </p>
            <CopyEmail />
            <div className="recruiter-actions"><a href="mailto:dccchidera@gmail.com">Email Daniel ↗</a><a href={publicPath('/Daniel_Christopher_Public_CV.pdf')} download>Download CV ↗</a></div>
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
            <a href={publicPath('/Daniel_Christopher_Public_CV.pdf')} className="contact-row" download>
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
