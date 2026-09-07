'use client';

import { useState } from 'react';
import { NativeLink } from '@/components/native-link';
import type { CaseStudy } from '@/lib/cases';

type Filter = 'all' | 'individual' | 'team';

export function WorkBrowser({ projects }: { projects: CaseStudy[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => {
      if (filter === 'all') return true;
      return filter === 'individual'
        ? project.label.toLowerCase().includes('individual')
        : project.label.toLowerCase().includes('team');
    });

  return (
    <>
      <div className="work-filters" aria-label="Filter case studies">
        {(['all', 'individual', 'team'] as const).map((option) => (
          <button
            type="button"
            key={option}
            className={filter === option ? 'active' : undefined}
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option === 'all' ? 'All cases' : option === 'individual' ? 'Individual work' : 'Team work'}
          </button>
        ))}
        <span aria-live="polite">{visible.length} case{visible.length === 1 ? '' : 's'}</span>
      </div>
      <div className="work-filtered-list">
        {visible.map(({ project: item, index }) => (
            <NativeLink className="work-row" href={`/work/${item.slug}`} key={item.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{item.name}</h2>
                <p>{item.title}</p>
              </div>
              <span>{item.label}</span>
              <span aria-hidden="true">View</span>
            </NativeLink>
        ))}
      </div>
    </>
  );
}
