import { pageMetadata } from '@/lib/page-metadata';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';
import { NativeLink } from '@/components/native-link';
import { bcuModules, bcuProjects } from '@/lib/bcu-projects';

export const metadata = pageMetadata('BCU Digital Marketing Projects', 'Audience research, consumer insight, content strategy and campaign planning from Daniel Christopher’s BA (Hons) Digital Marketing at Birmingham City University.', '/bcu/');

export default function BcuPage() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content" className="bcu-page">
      <section className="page-hero"><div className="shell">
        <small>Birmingham City University · BA (Hons) Digital Marketing · 2:1</small>
        <h1>Customer research.<br /><span>Campaigns with a clear purpose.</span></h1>
        <p>Undergraduate work in audience insight, content marketing and campaign planning. These projects show the commercial and customer perspective I later developed through MSc Business Analytics.</p>
        <nav className="bcu-jump-links" aria-label="BCU projects and modules">
          {bcuProjects.map(project => <a key={project.id} href={`#${project.id}`}>{project.title}</a>)}
          <a href="#modules">Degree modules</a>
        </nav>
      </div></section>
      <section className="bcu-projects"><div className="shell">
        {bcuProjects.map((project, index) => <article className="bcu-project" id={project.id} key={project.id}>
          <header><p className="overline">0{index + 1} · {project.ownership}</p><h2>{project.title}</h2><p className="bcu-question">{project.question}</p></header>
          <div className="bcu-project-copy">
            <h3>Contribution and approach</h3><p>{project.contribution}</p>
            <h3>Evidence and output</h3><p>{project.evidence}</p><p>{project.outcome}</p>
            <p className="bcu-skills">{project.skills}</p>
            <p className="bcu-limit"><strong>Scope:</strong> {project.limits}</p>
          </div>
        </article>)}
        <article className="bcu-project" id="ai-gen-z">
          <header><p className="overline">Further research writing</p><h2>AI and Generation Z marketing</h2><p className="bcu-question">How might AI shape marketing strategies aimed at Generation Z?</p></header>
          <div className="bcu-project-copy"><p>My earlier research document discusses personalisation, chatbots, predictive analytics, trust and privacy. It connects my undergraduate interest in customer behaviour with the question I later tested in my MSc dissertation.</p><p className="bcu-limit">Exploratory research writing covering concepts and proposed methods. Empirical findings and completed statistical analysis are not verified for this retained draft.</p><NativeLink className="arrow-link" href="/research-case">Explore the MSc research ↗</NativeLink></div>
        </article>
      </div></section>
      <section className="work-digital-feature" id="modules"><div className="shell">
        <p className="overline">Accelerated two-year degree · 360 credits</p><h2>BA (Hons) Digital Marketing modules</h2>
        <ul className="bcu-modules">{bcuModules.map(module => <li key={module}>{module}</li>)}</ul>
        <p className="bcu-limit">Module titles checked against the BCU transcript. Project descriptions draw on retained coursework and its earlier evidence review. Individual contributions and team outputs are identified where the record supports them.</p>
        <NativeLink className="arrow-link" href="/work">Back to selected work ↗</NativeLink>
      </div></section>
    </main><PageFooter />
  </>;
}
