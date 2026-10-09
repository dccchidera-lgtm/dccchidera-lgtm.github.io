import { publicPath } from '@/lib/paths';
import { NativeLink } from '@/components/native-link';

const buildDate = new Date();
const formattedBuildDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/London',
}).format(buildDate);
const buildDateParts = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Europe/London',
}).formatToParts(buildDate);
const buildDateIso = ['year', 'month', 'day']
  .map((part) => buildDateParts.find(({ type }) => type === part)?.value)
  .join('-');

export function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="shell page-footer-inner">
        <p>
          Digital and analytical work
          <br />
          grounded in verifiable evidence.
        </p>
        <div className="page-footer-actions">
          <NativeLink href="/contact">Get in touch</NativeLink>
          <a href={publicPath('/Daniel_Christopher_Public_CV.pdf')} download>Download CV</a>
        </div>
      </div>
      <div className="shell page-footer-meta">
        <span>Daniel Christopher</span>
        <span>Manchester, UK · 2026</span>
        <span>Last updated <time dateTime={buildDateIso}>{formattedBuildDate}</time></span>
      </div>
    </footer>
  );
}
