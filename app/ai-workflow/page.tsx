import { pageMetadata } from '@/lib/page-metadata';
import { SiteHeader } from '@/components/site-header';
import { PageFooter } from '@/components/page-footer';
import { NativeLink } from '@/components/native-link';

export const metadata = pageMetadata(
  'How I work with AI | Independent workflow',
  'How this portfolio is built and maintained with a small AI team: Claude Opus 5.5 leads, OpenAI Codex writes code, and Claude Sonnet 5.5 helpers research, review and write.',
  '/ai-workflow/',
);

const rulesUrl = 'https://github.com/dccchidera-lgtm/dccchidera-lgtm.github.io/blob/main/CLAUDE.md';

type Helper = {
  role: string;
  provider: 'anthropic' | 'openai';
  model: string;
  job: string;
  examples: string[];
  access: string;
};

const helpers: Helper[] = [
  {
    role: 'Coder',
    provider: 'openai',
    model: 'OpenAI Codex',
    job: 'Writes the code.',
    examples: ['New pages and features', 'Changes across many files', 'Hard bugs'],
    access: 'Edits files',
  },
  {
    role: 'Researcher',
    provider: 'anthropic',
    model: 'Claude Sonnet 5.5',
    job: 'Looks things up.',
    examples: ['Companies and job market', 'Dissertation reading', 'Finding code in the repo'],
    access: 'Read only',
  },
  {
    role: 'Reviewer',
    provider: 'anthropic',
    model: 'Claude Sonnet 5.5',
    job: 'Checks for mistakes.',
    examples: ['Reads every change', 'Runs lint, type and build checks', 'Flags broken content'],
    access: 'Checks only, never edits',
  },
  {
    role: 'Writer',
    provider: 'anthropic',
    model: 'Claude Sonnet 5.5',
    job: 'Writes the words.',
    examples: ['Site and project copy', 'CV bullets and cover letters', 'House style, no hyphens'],
    access: 'Edits text',
  },
];

const steps = [
  { who: 'Opus', title: 'Plans the job', detail: 'Works out what a new case study page needs and which files it touches.' },
  { who: 'Researcher', title: 'Gathers context', detail: 'Pulls the project notes and shows how existing case pages are built.' },
  { who: 'Codex', title: 'Builds it', detail: 'Receives a full written brief and writes the page code.' },
  { who: 'Reviewer', title: 'Checks it', detail: 'Runs the site checks and lists anything that is broken or unclear.' },
  { who: 'Opus and me', title: 'Signs it off', detail: 'Opus fixes what was flagged and reports back. I read it before it goes live.' },
];

const reasons = [
  { label: 'Specialists', title: 'Each model does the job it is best at.', body: 'A coding agent handles code, a fast model handles research and review, and the strongest model is kept for planning and judgement.' },
  { label: 'Independent checks', title: 'The builder never marks its own work.', body: 'Every change Codex makes is checked by a separate reviewer before it is committed, the way a second analyst would check a model.' },
  { label: 'Parallel work', title: 'Research and review run at the same time.', body: 'Helpers that do not depend on each other work side by side, so a task takes the time of its slowest step rather than the sum of them all.' },
  { label: 'Accountability', title: 'I stay responsible for what is published.', body: 'The rules the team follows are written down in the repository, and nothing reaches the live site without passing the build checks and my review.' },
];

export default function AiWorkflowPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero">
          <div className="shell">
            <small>Independent workflow · set up October 2026</small>
            <h1>One lead model.<br /><span>Four specialists.</span></h1>
            <p>How I use AI to build and maintain this portfolio. One model plans and checks, specialist helpers each do one job, and I decide what gets published.</p>
          </div>
        </section>

        <section className="shell ai-team" aria-labelledby="ai-team-title">
          <p className="overline">The team</p>
          <h2 id="ai-team-title">Who does what.</h2>

          <div className="ai-chart">
            <div className="ai-you">Me</div>
            <div className="ai-stem" aria-hidden="true" />
            <div className="ai-node ai-lead">
              <span className="ai-provider ai-provider--anthropic">Anthropic</span>
              <h3>The lead</h3>
              <span className="ai-model ai-model--anthropic">Claude Opus 5.5</span>
              <p>Plans the work, hands out jobs, checks every result and reports back to me.</p>
            </div>
            <div className="ai-stem" aria-hidden="true" />
            <p className="ai-hands">hands jobs to</p>
            <ul className="ai-branch" role="list">
              {helpers.map((helper) => (
                <li className="ai-node ai-helper" key={helper.role}>
                  <span className={`ai-provider ai-provider--${helper.provider}`}>{helper.provider === 'openai' ? 'OpenAI' : 'Anthropic'}</span>
                  <h3>{helper.role}</h3>
                  <span className={`ai-model ai-model--${helper.provider}`}>{helper.model}</span>
                  <p className="ai-job">{helper.job}</p>
                  <ul className="ai-examples">
                    {helper.examples.map((example) => <li key={example}>{example}</li>)}
                  </ul>
                  <span className="ai-access">{helper.access}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="shell ai-flow" aria-labelledby="ai-flow-title">
          <p className="overline">Example</p>
          <h2 id="ai-flow-title">How one job moves through the team.</h2>
          <p className="ai-flow-intro">Adding a new case study page, from request to live site.</p>
          <ol className="ai-steps" role="list">
            {steps.map((step) => (
              <li key={step.title}>
                <span>{step.who}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="shell site-build-grid ai-reasons" aria-label="Why the workflow is set up this way">
          {reasons.map((reason) => (
            <article key={reason.label}>
              <span>{reason.label}</span>
              <h2>{reason.title}</h2>
              <p>{reason.body}</p>
            </article>
          ))}
        </section>

        <section className="shell site-build-close">
          <p className="overline">What this does not claim</p>
          <h2>The AI does not choose my work or my conclusions.</h2>
          <p>The models write code and drafts when asked. I choose what to build, read changes before they are published, and the ownership of each case study is stated on its own page. When this page launched in October 2026, Codex was not yet connected, so Opus built it directly with my approval.</p>
          <div className="site-build-links ai-close-links">
            <a className="arrow-link" href={rulesUrl} target="_blank" rel="noopener noreferrer">Read the team&rsquo;s rules ↗</a>
            <NativeLink className="arrow-link" href="/site-build">See how the site was built ↗</NativeLink>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
