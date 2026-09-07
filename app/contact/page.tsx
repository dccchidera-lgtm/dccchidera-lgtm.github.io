import { publicPath } from "@/lib/paths";
import { PageFooter } from "@/components/page-footer";
import type { Metadata } from "next";
import { CopyEmail } from "@/components/copy-email";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact/" },
  description:
    "Contact Daniel Christopher about entry-level analytics, customer insight, marketing technology and digital transformation opportunities.",
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
              Have a role in mind?
              <br />
              <span>Let’s talk.</span>
            </h1>
            <p className="contact-intro">
              I’m open to entry-level roles across business and data analysis,
              customer insight, marketing analytics, digital transformation and
              responsible AI-adjacent work. To discuss a role or a case study,
              email me or connect with me on LinkedIn.
            </p>
            <CopyEmail />
          </div>
        </section>

        <section className="contact-links">
          <div className="shell">
            <a
              href="mailto:dccchidera@gmail.com"
              className="contact-row"
              data-reveal
            >
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
            <a
              href={publicPath("/Daniel_Christopher_Public_CV.pdf")}
              className="contact-row"
              download
            >
              <span>CV</span>
              <strong>Download my analyst CV</strong>
              <span>PDF</span>
            </a>
            <div className="contact-row contact-location" data-reveal>
              <span>Based in</span>
              <strong>Manchester, United Kingdom</strong>
              <span>UK</span>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
