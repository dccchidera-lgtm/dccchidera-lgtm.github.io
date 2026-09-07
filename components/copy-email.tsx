"use client";
import { useState } from "react";
export function CopyEmail() {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText("dccchidera@gmail.com");
      setMessage("Email copied");
    } catch {
      setMessage(
        "Copy unavailable. Select the email address below or use the email link.",
      );
    }
  }
  return (
    <div className="copy-email-wrap">
      <button className="button copy-email" type="button" onClick={copy}>
        Copy email address
      </button>
      <span role="status">{message}</span>
    </div>
  );
}
