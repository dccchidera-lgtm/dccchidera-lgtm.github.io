'use client';

import { useState } from 'react';

const email = 'dccchidera@gmail.com';

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="copy-email" type="button" onClick={copyEmail}>
      <span>{copied ? 'Email copied' : 'Copy email'}</span>
    </button>
  );
}

