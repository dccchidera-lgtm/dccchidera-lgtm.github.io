'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'question', label: 'Question' },
  { id: 'approach', label: 'Approach' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'implications', label: 'Implications' },
  { id: 'limits', label: 'Limits' },
  { id: 'contribution', label: 'Contribution' },
];

export function CaseNavigator() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((target): target is HTMLElement => Boolean(target));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0, 0.15, 0.4] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="case-index" aria-label="Case study contents">
      <p>On this page</p>
      <nav>
        {sections.map((section, index) => (
          <a
            href={`#${section.id}`}
            key={section.id}
            className={activeSection === section.id ? 'active' : undefined}
            aria-current={activeSection === section.id ? 'location' : undefined}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {section.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

