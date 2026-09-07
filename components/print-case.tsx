'use client';
export function PrintCase() {
  return <button className="button print-case" type="button" onClick={() => window.print()}>Print or save as PDF ↓</button>;
}
