"use client";

import Link from "next/link";
import { BriefcaseBusiness, Info, Mail, Newspaper, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links: ReadonlyArray<{
  label: string;
  href: string;
  icon: LucideIcon;
}> = [
  { label: "Services", href: "/services", icon: BriefcaseBusiness },
  { label: "Articles", href: "/articles", icon: Newspaper },
  { label: "A propos", href: "/#about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
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
    <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
      {links.map(({ label, href, icon: Icon }) => {
        const isActive = isActiveHref(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-brand-950",
              isActive && "bg-rose-50 text-brand-950 shadow-sm ring-1 ring-rose-100",
            )}
          >
            <Icon size={15} className={cn("text-slate-400", isActive && "text-rose-500")} />
            {label}
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
      {links.map(({ label, href, icon: Icon }) => {
        const isActive = isActiveHref(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50",
              isActive && "bg-rose-50 text-brand-950",
            )}
          >
            <Icon size={16} className={cn("text-slate-400", isActive && "text-rose-500")} />
            {label}
          </Link>
        );
      })}
    </>
  );
}
