import CaseStudyPage, { generateMetadata as caseMetadata } from '../work/[slug]/page';
import type { Metadata } from 'next';

/** Direct, statically exported alias of the existing case study, not a redesign. */
const slug = 'ecommerce-bi';
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata({ params: Promise.resolve({ slug }) });
}
export default function Page() {
  return CaseStudyPage({ params: Promise.resolve({ slug }) });
}
