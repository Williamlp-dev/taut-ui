"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import type * as React from "react";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): React.ReactElement {
  return (
    <RootProvider
      theme={{
        attribute: "class",
        defaultTheme: "system",
        disableTransitionOnChange: false,
        enableSystem: true,
        themes: ["light", "dark", "system"],
      }}
      {...props}
    >
      {children}
    </RootProvider>
  );
}
