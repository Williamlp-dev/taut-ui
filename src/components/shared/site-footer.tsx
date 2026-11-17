import Link from "next/link";
import type * as React from "react";

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="relative mt-8 border-border/64 border-t py-6 text-muted-foreground text-sm">
      <div className="container flex w-full items-center justify-center gap-2 px-4 sm:px-6">
        <p>
          ©{" "}
          <Link className="font-bold font-heading text-foreground" href="/">
            taut ui
          </Link>{" "}
          — built with Base UI and Tailwind CSS v4.
        </p>
      </div>
    </footer>
  );
}
