import { NativeLink } from '@/components/native-link';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="page-hero">
          <div className="shell">
            <small>404 · Page not found</small>
            <h1>
              This page is not part of
              <br />
              <span>the published portfolio.</span>
            </h1>
            <p>
              The address may have changed. Return to the case index or the portfolio
              home page.
            </p>
            <div className="profile-links">
              <NativeLink className="arrow-link" href="/">
                Portfolio home
              </NativeLink>
              <NativeLink className="arrow-link" href="/work">
                View work
              </NativeLink>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </>
  );
}
