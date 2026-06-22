import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-900", className)}>{children}</span>;
}
