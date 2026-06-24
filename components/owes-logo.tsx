import Image from "next/image";
import { cn } from "@/lib/utils";

type OwesLogoProps = {
  className?: string;
  priority?: boolean;
};

export function OwesLogo1({ className, priority }: OwesLogoProps) {
  return (
    <Image
      src="/OWES-Logo-1.svg"
      alt="OWES"
      width={3020}
      height={928}
      className={cn("h-auto w-auto object-contain", className)}
      priority={priority}
    />
  );
}

export function OwesLogoSlog({ className, priority }: OwesLogoProps) {
  return (
    <Image
      src="/OWES-Logo-Slog.svg"
      alt="OWES - Office Web et Service"
      width={2502}
      height={928}
      className={cn("h-auto w-auto object-contain", className)}
      priority={priority}
    />
  );
}
