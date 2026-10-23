import Image from 'next/image';
import { pageMetadata } from '@/lib/page-metadata';
import { publicPath } from '@/lib/paths';
import { SiteHeader } from '@/components/site-header';
import { PageFooter } from '@/components/page-footer';
import { NativeLink } from '@/components/native-link';
import { HeroField } from '@/components/hero-field';

const heroImage = '/projects/cotton-and-crumb-hero.jpg';
const heroImageWidth = 800;
const heroImageHeight = 500;

// TODO: Cotton & Crumb is not hosted yet. Set isLive to true once it is deployed to GitHub Pages at this planned URL.
const liveUrl = 'https://dccchidera-lgtm.github.io/cotton-and-crumb/';
const isLive: boolean = false;

export const metadata = pageMetadata(
  'Cotton & Crumb | Independent design and engineering study',
  'A fictional Manchester sourdough bakery site with a working preorder system and no backend, built with React, TypeScript, Tailwind CSS and GSAP.',
  '/cotton-and-crumb/',
);

export default function CottonAndCrumbPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero site-build-hero">
          <HeroField motif="corner" />
          <div className="shell">
            <small>Independent design and engineering study · fictional business</small>
            <h1>A bakery site that takes orders.<br /><span>With no backend behind it.</span></h1>
            <p>Cotton & Crumb is a fictional wood fired sourdough bakery in New Islington, Manchester. I built it as a design and engineering study: an editorial marketing site plus a working preorder system that anyone can try on a static host.</p>
            <div className="site-build-links">
              {isLive && <a className="arrow-link" href={liveUrl} target="_blank" rel="noopener noreferrer">Visit the live site ↗</a>}
              <NativeLink className="arrow-link" href="/work">Explore the work ↗</NativeLink>
            </div>
          </div>
        </section>
        <section className="shell" aria-label="Home page preview">
          <figure className="case-visual">
            <figcaption>
              <span>Home page · desktop width</span>
              <strong>An editorial bakery journal.</strong>
            </figcaption>
            <Image
              src={publicPath(heroImage)}
              alt="The Cotton & Crumb home page at desktop width: masthead, a three line headline and a tall photograph of a scored loaf."
              width={heroImageWidth}
              height={heroImageHeight}
              sizes="(max-width: 760px) 100vw, 1100px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <p className="visual-caveat">Cotton & Crumb is fictional. Photography is from Unsplash.</p>
          </figure>
        </section>
        <section className="shell site-build-intro" aria-label="Project details">
          <p className="overline">Type / ownership</p>
          <div>
            <h2>A fictional business, built properly.</h2>
            <p>There is no real bakery, no real orders and no payments. The project shows how I approach a small business website end to end: design direction, ordering rules, motion, accessibility and performance.</p>
          </div>
        </section>
        <section className="shell site-build-grid" aria-label="Website build details">
          <article>
            <span>01 / Ordering</span>
            <h2>A preorder flow with real rules.</h2>
            <p>Customers choose a collection day and a 30 minute slot, with an 8pm cutoff in UK time that stays correct across clock changes. Stock and slot limits, form validation, a receipt style confirmation with a calendar download, a basket drawer and an owner Kitchen view complete the flow. Orders are kept in the browser, so there is nothing to run or pay for.</p>
          </article>
          <article>
            <span>02 / Motion</span>
            <h2>Editorial motion, with fallbacks.</h2>
            <p>A pinned scroll Process section in a dark night bake style includes a 36 hour proofing dial. A scroll speed marquee, self drawing line illustrations, word by word heading reveals, parallax and page transitions add character, and each one has a reduced motion fallback.</p>
          </article>
          <article>
            <span>03 / Engineering</span>
            <h2>Static pages, then hydrated.</h2>
            <p>Built with Vite, React 19, TypeScript, Tailwind CSS v4, React Router, GSAP ScrollTrigger and Lenis. Pages are prerendered to static HTML and then hydrated, and the ordering and time rules are pure functions covered by over 150 Vitest tests.</p>
          </article>
          <article>
            <span>04 / Quality</span>
            <h2>Accessible and fast on mobile.</h2>
            <p>Lighthouse scores 100 for accessibility, best practices and SEO on mobile. The whole flow works by keyboard, colour contrast is checked in code and live regions announce basket changes.</p>
          </article>
        </section>
        <section className="shell site-build-close">
          <p className="overline">What this does not claim</p>
          <h2>No real customers or invented outcomes.</h2>
          <p>Cotton & Crumb demonstrates design and engineering skills. It does not claim a client, sales or a commercial result. Orders live in one browser only; shared stock, payments and email confirmations would need a real backend.</p>
          <NativeLink href="/contact" className="arrow-link">Discuss a digital or analytical project ↗</NativeLink>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
