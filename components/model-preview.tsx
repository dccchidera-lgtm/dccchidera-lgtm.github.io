import { NativeLink } from '@/components/native-link';
import { modelInfo } from '@/lib/model-info';
import { publicPath } from '@/lib/paths';

type PreviewMode = 'trust' | 'network' | 'data';

/**
 * Static stand in for the 3D model explorer on the homepage. It shows a pre rendered
 * still of the same scene so the homepage never downloads three.js; the interactive
 * version stays on each case page.
 */
export function ModelPreview({ mode }: { mode: PreviewMode }) {
  const info = modelInfo[mode];
  const caseHref = `/work/${info.path}#evidence`;
  return (
    <section className="model-explorer model-explorer--compact model-explorer--preview" aria-label={`${info.title} model preview`}>
      <div className="model-heading">
        <span>{info.title}</span>
        <span>3D preview</span>
      </div>
      <div className="model-viewport model-viewport--still">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={publicPath(`/models/${mode}.webp`)}
          alt={`${info.caption}. Conceptual 3D diagram.`}
          width={658}
          height={602}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="model-controls">
        <NativeLink href={caseHref}>Open the interactive 3D view ↗</NativeLink>
      </div>
      <div className="model-note">
        <strong>{info.caption}</strong>
        <p>{info.detail}</p>
        <NativeLink href={caseHref}>Read the supporting case ↗</NativeLink>
      </div>
    </section>
  );
}
