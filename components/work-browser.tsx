"use client";

import { useState } from "react";
import { ProjectCards } from "@/components/project-cards";
import type { CaseStudy } from "@/lib/cases";

type Filter = "all" | "individual" | "team";

export function WorkBrowser({ projects }: { projects: CaseStudy[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => {
      if (filter === "all") return true;
      return filter === "individual"
        ? project.label.toLowerCase().includes("individual")
        : project.label.toLowerCase().includes("team");
    });

  return (
    <>
      <div className="work-filters" aria-label="Filter case studies">
        {(["all", "individual", "team"] as const).map((option) => (
          <button
            type="button"
            key={option}
            className={filter === option ? "active" : undefined}
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option === "all"
              ? "All cases"
              : option === "individual"
                ? "Individual work"
                : "Team work"}
          </button>
        ))}
        <span aria-live="polite">
          {visible.length} case{visible.length === 1 ? "" : "s"}
        </span>
      </div>
      <ProjectCards projects={visible.map(({ project }) => project)} />
    </>
  );
}
