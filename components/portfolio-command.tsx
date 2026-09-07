"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { NativeLink } from "@/components/native-link";

const destinations = [
  {
    label: "Selected work",
    detail: "All 4 MSc case studies",
    href: "/work",
    type: "Page",
  },
  {
    label: "Decision Intelligence",
    detail: "Dashboard, scenarios and optimisation",
    href: "/work/decision-intelligence",
    type: "Team case",
  },
  {
    label: "Customer Intelligence",
    detail: "AI personalisation, trust and loyalty",
    href: "/work/customer-intelligence",
    type: "Individual case",
  },
  {
    label: "Data Management",
    detail: "DFD, ERD and SQL prototype",
    href: "/work/process-redesign",
    type: "Team case",
  },
  {
    label: "Predictive Analytics",
    detail: "Churn model comparison and validation",
    href: "/work/predictive-analytics",
    type: "Individual case",
  },
  {
    label: "Research",
    detail: "Dissertation method and results",
    href: "/research",
    type: "Page",
  },
  {
    label: "Profile",
    detail: "Bilingual background, skills and credentials",
    href: "/profile",
    type: "Page",
  },
  {
    label: "Digital Marketing",
    detail: "Customer context, measurement and strategy",
    href: "/profile#marketing-foundation",
    type: "Profile section",
  },
  {
    label: "Role fit",
    detail: "Five evidence-linked career directions",
    href: "/profile#role-fit",
    type: "Profile section",
  },
  {
    label: "Contact",
    detail: "Email, LinkedIn and location",
    href: "/contact",
    type: "Page",
  },
];

export function PortfolioCommand() {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return destinations.filter((item) =>
      words.every((word) =>
        `${item.label} ${item.detail} ${item.type}`
          .toLowerCase()
          .includes(word),
      ),
    );
  }, [query]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else {
          dialogRef.current?.showModal();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <>
      <button
        className="command-trigger"
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          setQuery("");
          dialogRef.current?.showModal();
          inputRef.current?.focus();
        }}
      >
        Search <kbd>⌘ K</kbd>
      </button>
      <dialog
        ref={dialogRef}
        className="command-dialog"
        aria-label="Search the portfolio"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="command-search">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, methods or pages"
            aria-label="Search projects, methods or pages"
          />
          <button type="button" onClick={() => dialogRef.current?.close()}>
            Close ×
          </button>
        </div>
        <div className="command-results">
          <p role="status">
            {results.length} matching destination
            {results.length === 1 ? "" : "s"}
          </p>
          {results.length ? (
            results.map((item) => (
              <NativeLink
                href={item.href}
                key={item.href}
                onClick={() => dialogRef.current?.close()}
              >
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </div>
                <em>{item.type}</em>
              </NativeLink>
            ))
          ) : (
            <p>Try “SQL”, “customer” or “model”.</p>
          )}
        </div>
        <footer>
          Use Tab to move through results and Enter to open. Esc closes search.
        </footer>
      </dialog>
    </>
  );
}
