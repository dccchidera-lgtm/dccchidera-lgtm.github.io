'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'background', label: 'Background' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'marketing-foundation', label: 'Marketing' },
  { id: 'role-fit', label: 'Role fit' },
  { id: 'journey', label: 'Journey' },
  { id: 'profile-contact', label: 'Contact' },
];

export function ProfileNavigator() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.2] },
    );

    sections.forEach((section) => {
      const target = document.getElementById(section.id);
      if (target) observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="profile-navigator" aria-label="Profile sections">
      <div className="shell">
        <span>Profile index</span>
        <div>
          {sections.map((section, index) => (
            <a
              href={`#${section.id}`}
              key={section.id}
              className={active === section.id ? 'active' : undefined}
              aria-current={active === section.id ? 'location' : undefined}
            >
              <small>0{index + 1}</small>{section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

