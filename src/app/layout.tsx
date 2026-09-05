import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layouts/NavBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { themeInitScript } from "@/lib/theme";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic", "latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Book Club — Чотири вальта",
    template: "%s · Book Club",
  },
  description:
    "Книжковий клуб «Чотири вальта»: прочитані книги, оцінки учасників і статистика обговорень.",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Book Club",
    title: "Book Club — Чотири вальта",
    description:
      "Книжковий клуб «Чотири вальта»: прочитані книги, оцінки учасників і статистика обговорень.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${roboto.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <NavBar />
          <div className="pt-20">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
