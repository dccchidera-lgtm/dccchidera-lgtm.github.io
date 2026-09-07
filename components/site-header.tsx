"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { NativeLink } from "@/components/native-link";
import { PortfolioCommand } from "@/components/portfolio-command";
import { ThemeSwitch } from "@/components/theme-switch";
const navigation = [
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "Profile", href: "/profile" },
  { label: "Contact", href: "/contact" },
];
export function SiteHeader() {
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <NativeLink className="wordmark" href="/">
          <span className="monogram">dc.</span>
          <span>Daniel Christopher</span>
        </NativeLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NativeLink
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </NativeLink>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeSwitch />
          <PortfolioCommand />
          <button
            type="button"
            className="menu-trigger"
            aria-haspopup="dialog"
            onClick={() => menu.current?.showModal()}
          >
            Menu
          </button>
        </div>
        <dialog
          ref={menu}
          className="mobile-menu"
          aria-label="Main navigation"
          onClick={(event) => {
            if (event.target === event.currentTarget) menu.current?.close();
          }}
        >
          <div className="mobile-menu-inner">
            <div className="mobile-menu-top">
              <span>Navigation</span>
              <button type="button" onClick={() => menu.current?.close()}>
                Close ×
              </button>
            </div>
            <nav>
              {navigation.map((item, i) => (
                <NativeLink
                  key={item.href}
                  href={item.href}
                  aria-current={
                    pathname.startsWith(item.href) ? "page" : undefined
                  }
                  onClick={() => menu.current?.close()}
                >
                  <small>0{i + 1}</small>
                  {item.label}
                  <span>↗</span>
                </NativeLink>
              ))}
            </nav>
            <p>
              Analytics × Digital Marketing
              <br />
              Manchester, UK
            </p>
          </div>
        </dialog>
      </div>
    </header>
  );
}
