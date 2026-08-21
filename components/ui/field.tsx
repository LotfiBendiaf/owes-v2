import * as React from "react";
import { cn } from "@/lib/utils";

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-slate-800">{label}{children}{error && <span role="alert" className="text-xs text-red-600">{error}</span>}</label>;
}

export const inputClass = "h-11 w-full border border-brand-950/20 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "min-h-28 py-3", props.className)} />;
}
