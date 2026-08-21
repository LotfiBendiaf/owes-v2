import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "OWES | Votre partenaire professionnel", template: "%s | OWES" },
  description: "Domiciliation, création de sites web, coworking, salles de réunion et formation professionnelle en Algérie.",
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
    <html lang="fr" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
