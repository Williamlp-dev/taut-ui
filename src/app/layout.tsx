import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { fontMono, fontSans } from "@/lib/fonts";
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@/registry/default/ui/toast";

export const metadata: Metadata = {
  description:
    "Taut Ui is a collection of accessible, composable React components built on Base UI with tactile, spring-driven motion. Copy, paste, and own.",
  metadataBase: new URL("https://taut-ui.com"),
  title: "Taut Ui - Accessible, tactile Base UI components",
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
