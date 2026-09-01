'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { NativeLink } from '@/components/native-link';

const destinations = [
  { label: 'Selected work', detail: 'All four verified case studies', href: '/work', type: 'Page' },
  { label: 'Decision Intelligence', detail: 'Dashboard, scenarios and optimisation', href: '/work/decision-intelligence', type: 'Team case' },
  { label: 'Customer Intelligence', detail: 'AI personalisation, trust and loyalty', href: '/work/customer-intelligence', type: 'Individual case' },
  { label: 'Data Management', detail: 'DFD, ERD and SQL prototype', href: '/work/process-redesign', type: 'Team case' },
  { label: 'Predictive Analytics', detail: 'Churn model comparison and validation', href: '/work/predictive-analytics', type: 'Individual case' },
  { label: 'Research', detail: 'Dissertation method and results', href: '/research', type: 'Page' },
  { label: 'Profile', detail: 'Bilingual background, skills and credentials', href: '/profile', type: 'Page' },
  { label: 'Digital Marketing', detail: 'Customer context, measurement and strategy', href: '/profile#marketing-foundation', type: 'Profile section' },
  { label: 'Role fit', detail: 'Five evidence-linked career directions', href: '/profile#role-fit', type: 'Profile section' },
  { label: 'Contact', detail: 'Email, LinkedIn and location', href: '/contact', type: 'Page' },
];

export function PortfolioCommand({ onOpen }: { onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return destinations;
    return destinations.filter((item) => `${item.label} ${item.detail} ${item.type}`.toLowerCase().includes(term));
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpen?.();
        setOpen((current) => !current);
      }
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onOpen]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function openCommand() {
    onOpen?.();
    setQuery('');
    setOpen(true);
  }

  return (
    <>
      <button className="command-trigger" type="button" onClick={openCommand} aria-haspopup="dialog">
        Search <span aria-hidden="true">⌘K</span>
      </button>

      <div className={`command-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
        <button className="command-backdrop" type="button" aria-label="Close portfolio search" onClick={() => setOpen(false)} />
        <section className="command-dialog" role="dialog" aria-modal="true" aria-label="Search the portfolio">
          <div className="command-search">
            <span aria-hidden="true">Search</span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, methods or pages"
              aria-label="Search projects, methods or pages"
            />
            <button type="button" onClick={() => setOpen(false)}>Esc</button>
          </div>
          <div className="command-results" aria-live="polite">
            {results.length ? results.map((item, index) => (
              <NativeLink href={item.href} key={item.href} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                <em>{item.type}</em>
              </NativeLink>
            )) : <p>No matching evidence. Try “SQL”, “customer” or “model”.</p>}
          </div>
          <footer><span>Search verified work</span><span>Esc to close</span></footer>
        </section>
      </div>
    </>
  );
}

