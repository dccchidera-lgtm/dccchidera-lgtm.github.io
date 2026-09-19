import { pageMetadata } from '@/lib/page-metadata';
import { SiteHeader } from '@/components/site-header';
import { PageFooter } from '@/components/page-footer';
import { NativeLink } from '@/components/native-link';

export const metadata = pageMetadata(
  'Building this portfolio | Independent digital project',
  'A live, self-directed Next.js portfolio build showing information architecture, responsive interfaces, technical implementation and transparent case-study presentation.',
  '/site-build/',
);

export default function SiteBuildPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero site-build-hero">
          <div className="shell">
            <small>Independent digital build · ongoing</small>
            <h1>Designing the experience.<br /><span>Not just presenting the work.</span></h1>
            <p>This portfolio is a live website that I build and maintain. The aim is to make different kinds of work easy to navigate, easy to inspect, and clear about what was done individually, as a team or as a later reconstruction.</p>
            <div className="site-build-links">
              <a className="arrow-link" href="https://github.com/dccchidera-lgtm/dccchidera-lgtm.github.io" target="_blank" rel="noopener noreferrer">Explore the source code ↗</a>
              <NativeLink className="arrow-link" href="/work">Explore the work ↗</NativeLink>
            </div>
          </div>
        </section>
        <section className="shell site-build-intro" aria-label="Project details">
          <p className="overline">Type / ownership</p>
          <div>
            <h2>An independently maintained digital product.</h2>
            <p>This is my personal project, not a paid client commission. It gives me a place to bring together analytics, research, digital marketing and practical web development as I complete more work.</p>
          </div>
        </section>
        <section className="shell site-build-grid" aria-label="Website build details">
          <article>
            <span>01 / Build</span>
            <h2>Working website, not a mock-up.</h2>
            <p>A React and Next.js site written in TypeScript, statically built and published through GitHub Pages. Case-study pages and reusable components keep the interface coherent as work is added.</p>
          </article>
          <article>
            <span>02 / Navigation</span>
            <h2>Different paths through the work.</h2>
            <p>Selected-work browsing, a mobile menu and keyboard-searchable commands help a visitor reach a relevant example without reading the entire site.</p>
          </article>
          <article>
            <span>03 / Evidence</span>
            <h2>Make provenance visible.</h2>
            <p>Source-linked project figures, runnable public-data analysis and a clearly labelled Olist reconstruction make it possible to distinguish original coursework from independent follow-on work.</p>
          </article>
          <article>
            <span>04 / Iteration</span>
            <h2>Improve the reading experience.</h2>
            <p>Responsive typography, consistent page alignment, theme controls and print-friendly case studies are part of the ongoing build. The site is refined as new projects and real deliverables are ready to show.</p>
          </article>
        </section>
        <section className="shell site-build-close">
          <p className="overline">What this does not claim</p>
          <h2>No imaginary clients or invented outcomes.</h2>
          <p>This page demonstrates the website itself. It does not claim that I built it for a local business, achieved a traffic increase or delivered a commercial result. Future client work will be added separately when the work exists and I have permission to share it.</p>
          <NativeLink href="/contact" className="arrow-link">Discuss a digital or analytical project ↗</NativeLink>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
