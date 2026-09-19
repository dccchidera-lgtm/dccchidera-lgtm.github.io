/** Public-facing direct links; original /work/[slug] pages remain available. */
const routes: Record<string, string> = {
  'decision-intelligence': '/decisions',
  'customer-intelligence': '/research-case',
  'process-redesign': '/sql',
  'predictive-analytics': '/churn',
  'ecommerce-bi': '/powerbi',
};

export function casePath(slug: string): string {
  return routes[slug] ?? `/work/${slug}`;
}
