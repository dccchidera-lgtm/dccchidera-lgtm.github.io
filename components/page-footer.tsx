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
        <NativeLink href="/contact">Get in touch</NativeLink>
      </div>
      <div className="shell page-footer-meta">
        <span>Daniel Christopher</span>
        <span>Manchester, UK · 2026</span>
      </div>
    </footer>
  );
}

