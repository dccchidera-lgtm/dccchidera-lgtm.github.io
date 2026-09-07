import { NativeLink } from "@/components/native-link";
import { publicPath } from "@/lib/paths";
export function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="shell page-footer-inner">
        <div>
          <p className="overline">Let’s talk</p>
          <h2>
            A good question is
            <br />
            <span>a great place to start.</span>
          </h2>
          <p>Open to opportunities in analytics and customer insight.</p>
        </div>
        <div className="page-footer-actions">
          <a className="button primary" href="mailto:dccchidera@gmail.com">
            Email Daniel ↗
          </a>
          <NativeLink className="button" href="/contact">
            Contact details
          </NativeLink>
          <a
            className="text-link"
            href={publicPath("/Daniel_Christopher_Public_CV.pdf")}
            download
          >
            Download CV · PDF ↓
          </a>
        </div>
      </div>
      <div className="shell page-footer-meta">
        <span>© 2026 Daniel Christopher</span>
        <span>Manchester, UK · English / German</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
