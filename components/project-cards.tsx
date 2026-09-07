import { NativeLink } from "@/components/native-link";
import { projectSummaries } from "@/lib/project-summaries";
import type { CaseStudy } from "@/lib/cases";

export function ProjectCards({ projects }: { projects: CaseStudy[] }) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => {
        const summary = projectSummaries[project.slug];
        return (
          <NativeLink
            href={`/work/${project.slug}`}
            className={`project-card project-${project.slug}`}
            key={project.slug}
          >
            <div className="project-top">
              <span>{summary.category}</span>
              <span className="project-number">0{index + 1}</span>
            </div>
            <div className="project-signal">
              {project.slug === "predictive-analytics" ? (
                <div
                  className="mini-model-chart"
                  aria-label="Validation misclassification: tree 10.52%, logistic regression 6.18%, neural network 4.42%"
                >
                  {[
                    ["Tree", "10.52", "100%"],
                    ["Logistic", "6.18", "58.75%"],
                    ["Neural", "4.42", "42.02%"],
                  ].map(([name, value, width]) => (
                    <div key={name}>
                      <span>{name}</span>
                      <i style={{ width }} />
                      <strong>{value}%</strong>
                    </div>
                  ))}
                </div>
              ) : project.slug === "customer-intelligence" ? (
                <>
                  <strong>
                    139<span>responses</span>
                  </strong>
                  <div className="signal-caption">
                    Personalisation
                    <br />
                    Trust
                    <br />
                    Loyalty
                  </div>
                </>
              ) : project.slug === "process-redesign" ? (
                <div className="schema-labels">
                  <span>DFD</span>
                  <b>→</b>
                  <span>ERD</span>
                  <b>→</b>
                  <span>SQL</span>
                </div>
              ) : (
                <>
                  <strong>
                    60<span>to</span>70<span>% margin scenarios</span>
                  </strong>
                  <div className="signal-caption">
                    Audit
                    <br />
                    Model
                    <br />
                    Recommend
                  </div>
                </>
              )}
            </div>
            <div className="project-copy">
              <p className="project-ownership">
                {project.label.replace("Four-person", "4 person")}
              </p>
              <h3>{summary.headline}</h3>
              <p>{summary.result}</p>
              <div className="project-bottom">
                <span>{project.tools.slice(0, 2).join(" · ")}</span>
                <span aria-label="Read case study">↗</span>
              </div>
            </div>
          </NativeLink>
        );
      })}
    </div>
  );
}
