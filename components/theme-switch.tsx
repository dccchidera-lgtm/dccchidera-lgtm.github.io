"use client";
import { useEffect, useSyncExternalStore } from "react";
type Theme = "auto" | "light" | "dark";
const next: Record<Theme, Theme> = {
  auto: "light",
  light: "dark",
  dark: "auto",
};
let volatileTheme: Theme | null = null;
function snapshot(): Theme {
  try {
    const value = localStorage.getItem("portfolio-theme");
    return value === "dark" || value === "light" ? value : "auto";
  } catch {
    return volatileTheme ?? "auto";
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-theme", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-theme", callback);
  };
}
export function ThemeSwitch() {
  const theme = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "auto" as Theme,
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  function change() {
    volatileTheme = next[theme];
    try {
      localStorage.setItem("portfolio-theme", volatileTheme);
    } catch {}
    window.dispatchEvent(new Event("portfolio-theme"));
  }
  return (
    <button
      className="theme-switch"
      type="button"
      onClick={change}
      aria-label={`Theme: ${theme}. Change to ${next[theme]}.`}
      title={`Theme: ${theme}`}
    >
      <span aria-hidden="true">◐</span>
      <span className="theme-label">{theme}</span>
    </button>
  );
}
