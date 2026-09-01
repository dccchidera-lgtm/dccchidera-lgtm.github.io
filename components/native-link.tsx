import type { AnchorHTMLAttributes } from 'react';
import { publicPath } from '@/lib/paths';

type NativeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function NativeLink({ href, ...props }: NativeLinkProps) {
  return <a {...props} href={publicPath(href)} />;
}
