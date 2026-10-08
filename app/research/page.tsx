import DissertationPage from '../dissertation/page';
import { pageMetadata } from '@/lib/page-metadata';

/** Earlier address for the dissertation page, kept so existing links still work. */
export const metadata = pageMetadata(
  'MSc dissertation',
  'Method, results and limits from Daniel Christopher’s MSc dissertation on AI personalisation, customer trust and loyalty.',
  '/dissertation/',
);

export default DissertationPage;
