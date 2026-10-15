import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { publication } from "./content/publication";
import { siteMeta } from "./content/site";

const siteUrl = new URL(publication.url);
const siteTitle = siteMeta.title;
const siteDescription = siteMeta.description;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInitialization = `(() => {
  document.documentElement.dataset.js = "enabled";
  try {
    const stored = window.localStorage.getItem("zim-portfolio-theme");
    const theme = stored === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#03070d" : "#f4f8f6",
    );
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: "%s | Fatgezim “Zim” Bela",
  },
  description: siteDescription,
  applicationName: "Fatgezim “Zim” Bela — Portfolio",
  authors: [{ name: "Fatgezim “Zim” Bela", url: siteUrl.toString() }],
  creator: "Fatgezim “Zim” Bela",
  publisher: "Fatgezim “Zim” Bela",
  category: "Portfolio",
  alternates: { canonical: publication.url },
  icons: {
    icon: `${publication.url}favicon.svg`,
    shortcut: `${publication.url}favicon.svg`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: publication.url,
    siteName: "Fatgezim “Zim” Bela — Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: `${publication.url}og.png`,
        width: 1200,
        height: 630,
        alt: "Fatgezim Zim Bela — software, data, automation, and scientific systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${publication.url}og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-js="disabled" data-theme="light" lang="en" suppressHydrationWarning>
      <head>
        <meta content="#f4f8f6" name="theme-color" />
        <script dangerouslySetInnerHTML={{ __html: themeInitialization }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
