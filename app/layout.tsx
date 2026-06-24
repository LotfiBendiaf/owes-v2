import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "OWES | Votre partenaire professionnel", template: "%s | OWES" },
  description: "Domiciliation, coworking, formation et accompagnement professionnel en Algérie.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/OWES-Icon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
