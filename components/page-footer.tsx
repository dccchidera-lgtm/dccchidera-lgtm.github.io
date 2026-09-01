import { NativeLink } from '@/components/native-link';

export function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="shell page-footer-inner">
        <p>
          Analytical and digital work
          <br />
          grounded in verifiable evidence.
        </p>
        <div className="page-footer-actions">
          <NativeLink href="/contact">Get in touch</NativeLink>
          <a href="/Daniel_Christopher_Public_CV.pdf" download>Download CV</a>
        </div>
      </div>
      <div className="shell page-footer-meta">
        <span>Daniel Christopher</span>
        <span>Manchester, UK · 2026</span>
      </div>
    </footer>
  );
}
