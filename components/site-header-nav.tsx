"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links: ReadonlyArray<{
  label: string;
  href: string;
  index: string;
}> = [
  { label: "Services", href: "/services", index: "01" },
  { label: "Articles", href: "/articles", index: "02" },
  { label: "À propos", href: "/#about", index: "03" },
  { label: "Contact", href: "/contact", index: "04" },
];

function useActiveHref() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (href: string) => {
    const [basePath, anchor] = href.split("#");
    const normalizedBasePath = basePath || "/";

    if (anchor) {
      return pathname === normalizedBasePath && hash === `#${anchor}`;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };
}

export function DesktopNav() {
  const isActiveHref = useActiveHref();

  return (
    <nav className="hidden h-full items-stretch border-x border-brand-950/15 md:flex" aria-label="Navigation principale">
      {links.map(({ label, href, index }) => {
        const isActive = isActiveHref(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative inline-flex min-w-24 items-center justify-center gap-2 border-r border-brand-950/15 px-4 text-sm font-bold text-brand-950 transition-colors last:border-r-0 hover:bg-brand-950 hover:text-white lg:min-w-28",
              isActive && "bg-brand-950 text-white",
            )}
          >
            <span className={cn("font-mono text-[9px] text-slate-400 transition-colors group-hover:text-brand-200", isActive && "text-brand-200")}>{index}</span>
            {label}
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-rose-500 transition-transform group-hover:scale-x-100", isActive && "scale-x-100")} />
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavLinks() {
  const isActiveHref = useActiveHref();

  return (
    <>
      {links.map(({ label, href, index }) => {
        const isActive = isActiveHref(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group flex items-center justify-between border-b border-brand-950/15 px-1 py-4 text-base font-bold text-brand-950 transition-colors last:border-b-0 hover:text-brand-500",
              isActive && "text-brand-500",
            )}
          >
            <span>{label}</span>
            <span className={cn("font-mono text-[10px] text-slate-400", isActive && "text-brand-500")}>{index}</span>
          </Link>
        );
      })}
    </>
  );
}
