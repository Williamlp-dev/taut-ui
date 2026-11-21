import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@/registry/default/ui/toast";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { appConfig } from "@/lib/config";
import { fontMono, fontSans } from "@/lib/fonts";

const defaultTitle = "Taut UI — Accessible, tactile Base UI components";

export const metadata: Metadata = {
  authors: [{ name: "Williamlp-dev", url: appConfig.links.github }],
  description: appConfig.description,
  metadataBase: new URL(appConfig.url),
  openGraph: {
    locale: "en_US",
    siteName: "Taut UI",
    type: "website",
  },
  robots: {
    follow: true,
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    index: true,
  },
  title: {
    default: defaultTitle,
    template: "%s — Taut UI",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#ffffff", media: "(prefers-color-scheme: light)" },
    { color: "#141414", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable}  ${fontMono.variable} relative bg-sidebar font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <ToastProvider>
            <AnchoredToastProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1">{children}</main>
              </div>
            </AnchoredToastProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
