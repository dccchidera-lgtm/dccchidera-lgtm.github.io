'use client';

import { useEffect, useState } from 'react';
import { NativeLink } from '@/components/native-link';
import { PortfolioCommand } from '@/components/portfolio-command';
import { ThemeSwitch } from '@/components/theme-switch';

const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'Research', href: '/research' },
  { label: 'Profile', href: '/profile' },
  { label: 'Contact', href: '/contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <NativeLink className="wordmark" href="/" onClick={() => setOpen(false)}>
            Daniel Christopher
          </NativeLink>
          <div className="header-actions">
            <ThemeSwitch />
            <PortfolioCommand onOpen={() => setOpen(false)} />
            <button
              className="menu-trigger"
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((current) => !current)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <div className={`menu${open ? ' open' : ''}`} id="site-menu" aria-hidden={!open}>
        <div className="menu-inner">
          <nav className="menu-nav" aria-label="Site menu">
            {navigation.map((item) => (
              <NativeLink href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </NativeLink>
            ))}
          </nav>
          <div className="menu-meta">
            <span>Business analytics work with methods, evidence and ownership stated clearly.</span>
            <span>Manchester, UK · 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}

