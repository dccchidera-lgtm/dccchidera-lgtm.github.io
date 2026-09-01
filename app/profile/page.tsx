import type { Metadata } from 'next';
import { NativeLink } from '@/components/native-link';
import { PageFooter } from '@/components/page-footer';
import { ProfileNavigator } from '@/components/profile-navigator';
import { RoleFit } from '@/components/role-fit';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'Daniel Christopher’s bilingual background, digital marketing foundation and verified business analytics capabilities.',
};

export default function ProfilePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="page-hero profile-hero">
          <div className="shell">
            <small>Profile</small>
            <h1>
              I approach business and technology questions
              <br />
              <span>through customer context and analytical evidence.</span>
            </h1>
            <div className="profile-hero-foot">
              <p>
                Manchester-based Business Analytics postgraduate with a 2:1 in Digital
                Marketing, bringing customer understanding, structured analysis and an
                adaptable international perspective to early-career roles.
              </p>
              <div className="profile-signature" aria-label="Daniel Christopher monogram">
                <span>DC</span>
                <small>Manchester · UK</small>
              </div>
            </div>
          </div>
        </section>

        <ProfileNavigator />

        <section className="profile-snapshot" id="about">
          <div className="shell snapshot-grid">
            <article className="snapshot-about" data-reveal>
              <span className="snapshot-label">About me</span>
              <h2>I combine curiosity about customers with care in how evidence is interpreted.</h2>
              <p>
                I started with digital marketing, learning how organisations understand
                audiences, shape propositions and communicate value. Business analytics
                gave me a more rigorous way to test those assumptions through research,
                modelling and data.
              </p>
              <p>
                I now bring both perspectives to a problem: the commercial question that
                matters and the analytical discipline needed to answer it responsibly.
              </p>
            </article>
            <article className="snapshot-card snapshot-role" data-reveal>
              <span className="snapshot-label">Looking for</span>
              <strong>Analytics · Marketing technology · Digital transformation</strong>
            </article>
            <article className="snapshot-card snapshot-language" data-reveal>
              <span className="snapshot-label">Languages</span>
              <strong>English + German</strong>
              <small>570+ day Duolingo streak</small>
            </article>
            <article className="snapshot-card snapshot-status" data-reveal>
              <span className="snapshot-label">Current stage</span>
              <strong>MSc dissertation submitted</strong>
              <small>Final result pending</small>
            </article>
          </div>
        </section>

        <section className="background-story" id="background">
          <div className="shell background-story-grid">
            <div className="background-intro" data-reveal>
              <p className="overline">Background · adaptability</p>
              <h2>Raised in Germany. Developed personally and academically in the UK.</h2>
              <p>
                I was born and raised in Germany and moved to the UK in 2017 during Year
                8. I completed secondary school at St Peter’s Roman Catholic High School,
                spent two years at Xaverian College, and later studied at Birmingham City
                University before moving into Business Analytics in Manchester.
              </p>
              <p>
                Adjusting meant learning a new school environment, building relationships
                and becoming confident in English while retaining German. I still maintain
                my German through daily Duolingo practice, with a streak of more than
                570 consecutive days confirmed in September 2026.
              </p>
            </div>

            <div className="background-route" aria-label="Personal and education route" data-reveal>
              <article>
                <span>2004–2017</span>
                <strong>Germany</strong>
                <p>Born and raised; the foundation of my German fluency.</p>
              </article>
              <article>
                <span>2017–2020</span>
                <strong>St Peter’s RC High School</strong>
                <p>Joined during Year 8 and adapted to a new country and school system.</p>
              </article>
              <article>
                <span>2020–2022</span>
                <strong>Xaverian College</strong>
                <p>Completed two years of sixth-form education in Manchester.</p>
              </article>
              <article>
                <span>2022–now</span>
                <strong>Higher education</strong>
                <p>Digital Marketing at BCU, followed by Business Analytics in Manchester.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="personal-milestones" id="milestones" aria-labelledby="milestones-title">
          <div className="shell">
            <div className="milestones-heading" data-reveal>
              <p className="overline">Selected milestones</p>
              <h2 id="milestones-title">My progress includes a 2:1, certified marketing training and more than 570 consecutive days of German practice.</h2>
            </div>
            <div className="milestones-grid">
              <article data-reveal>
                <strong>570+</strong>
                <span>days of continuous Duolingo practice</span>
                <small>Confirmed September 2026</small>
              </article>
              <article data-reveal>
                <strong>2:1</strong>
                <span>BA (Hons) Digital Marketing</span>
                <small>Accelerated two-year programme</small>
              </article>
              <article data-reveal>
                <strong>85</strong>
                <span>individual Shopify transformation analysis</span>
                <small>Provisional assignment mark</small>
              </article>
              <article data-reveal>
                <strong>DMI</strong>
                <span>Certified Digital Marketing Associate</span>
                <small>Professional certification</small>
              </article>
            </div>
          </div>
        </section>

        <section className="marketing-foundation" id="marketing-foundation">
          <div className="shell">
            <div className="marketing-heading" data-reveal>
              <p className="overline">Digital marketing foundation</p>
              <h2>I use my marketing training to place customer and commercial context around the analysis.</h2>
              <p>
                My 2:1 BA (Hons) covered market research, campaign methodology, content
                strategy and digital measurement. It gives me a useful second lens: not
                only what the data shows, but who the audience is, how value is communicated
                and which decision the evidence needs to improve.
              </p>
            </div>

            <div className="marketing-capability-grid">
              <article data-reveal>
                <span>01</span>
                <h3>Audience and customer understanding</h3>
                <p>Market research, audience segmentation and customer-centred problem framing.</p>
              </article>
              <article data-reveal>
                <span>02</span>
                <h3>Campaign and content strategy</h3>
                <p>Planning, content marketing, SEO/SEM foundations and proposition thinking.</p>
              </article>
              <article data-reveal>
                <span>03</span>
                <h3>Measurement and optimisation</h3>
                <p>GA4 training, KPI interpretation, A/B testing principles and campaign analysis.</p>
              </article>
              <article data-reveal>
                <span>04</span>
                <h3>Digital transformation</h3>
                <p>Individual analytical writing on Shopify, platform change and responsible adoption.</p>
                <NativeLink href="/work#shopify-transformation">View related work</NativeLink>
              </article>
            </div>

            <p className="marketing-evidence-note" data-reveal>
              These entries document degree and certification-backed capability. Commercial
              campaign deployment falls outside the evidence shown here.
            </p>
          </div>
        </section>

        <RoleFit />

        <section className="profile-story">
          <div className="shell story-grid" data-reveal>
            <p className="overline">How I work</p>
            <div>
              <p className="statement">
                I use analysis to clarify a decision, and I state the limits before anyone
                acts on the result.
              </p>
              <div className="story-copy">
                <p>
                  My work spans survey analytics, statistical modelling, classification,
                  relational data design and decision models. I start by defining the
                  question, checking whether the data can answer it and choosing a method
                  that fits the decision.
                </p>
                <p>
                  I value evidence that is useful, transparent and honest about its
                  limits. That means separating validation from deployment, association
                  from causation and team output from individual ownership.
                </p>
                <p>
                  This is a living portfolio. It begins with the strongest work I can
                  verify today and will expand with professional projects, responsibilities
                  and outcomes as my career develops.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-journey" id="journey">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <p className="overline">Journey</p>
              <h2>A cross-disciplinary route from customer context to analytical decisions.</h2>
            </div>
            <ol className="journey-list">
              <li data-reveal>
                <span>2022–2025</span>
                <strong>BA (Hons) Digital Marketing</strong>
                <p>Completed an accelerated two-year programme at Birmingham City University with Upper Second-Class Honours.</p>
              </li>
              <li data-reveal>
                <span>2025–2026</span>
                <strong>MSc Business Analytics</strong>
                <p>Built evidence across statistics, data management, decision modelling, machine learning and transformation.</p>
              </li>
              <li data-reveal>
                <span>2026</span>
                <strong>Independent research</strong>
                <p>Designed and delivered a dissertation study on AI personalisation, trust and loyalty.</p>
              </li>
              <li data-reveal>
                <span>Now</span>
                <strong>Seeking an analytical or technology-facing role</strong>
                <p>Open to analytics, customer insight, marketing technology, digital transformation and responsible AI-adjacent opportunities.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="tools-section" id="toolkit">
          <div className="shell tools-grid" data-reveal>
            <div>
              <p className="overline">Verified toolkit</p>
              <h2>I used these tools across verified projects, from survey design to predictive modelling.</h2>
            </div>
            <div className="tool-lines">
              <p><span>Statistical research</span> SPSS · Qualtrics · PROCESS Model 4</p>
              <p><span>Machine learning</span> SAS Enterprise Miner</p>
              <p><span>Data and models</span> SQL · Excel · relational modelling</p>
              <p><span>Visualisation</span> Power BI / DAX foundations · Python figures</p>
              <p><span>Digital measurement</span> GA4 · segmentation · A/B testing principles</p>
            </div>
          </div>
        </section>

        <section className="credentials" id="education">
          <div className="shell credential-grid" data-reveal>
            <p className="overline">Education</p>
            <div>
              <article>
                <span>Manchester Metropolitan University</span>
                <h2>MSc Business Analytics</h2>
                <p>Dissertation submitted · final award and classification pending</p>
              </article>
              <article>
                <span>Undergraduate degree</span>
                <h2>BA (Hons) Digital Marketing</h2>
                <p>Upper Second-Class Honours (2:1)</p>
              </article>
            </div>
          </div>
        </section>

        <section className="profile-extras">
          <div className="shell extras-grid">
            <div data-reveal>
              <p className="overline">Training and certifications</p>
              <h2>Training completed across analytics and digital practice.</h2>
            </div>
            <ul data-reveal>
              <li><span>01</span>DMI Certified Digital Marketing Associate</li>
              <li><span>02</span>Google Analytics (GA4)</li>
              <li><span>03</span>HubSpot Content Marketing</li>
              <li><span>04</span>Microsoft Power BI</li>
              <li><span>05</span>HackerRank SQL (Basic)</li>
            </ul>
          </div>
        </section>

        <section className="profile-cta" id="profile-contact">
          <div className="shell">
            <p className="overline">Next</p>
            <h2 data-reveal>
              Review the evidence or contact me
              <br />
              <span>about an analytical or technology-facing opportunity.</span>
            </h2>
            <div>
              <NativeLink className="arrow-link" href="/work">View work</NativeLink>
              <NativeLink className="arrow-link" href="/contact">Contact</NativeLink>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </>
  );
}
