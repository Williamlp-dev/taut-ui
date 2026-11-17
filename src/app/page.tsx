import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { Button } from "@/registry/default/ui/button";
import { getCategoryThumbnail } from "@/components/category-thumbnails";
import { SiteFooter } from "@/components/shared/site-footer";
import { TerminalInstall } from "@/components/terminal-install";
import { PAGES_NEW } from "@/lib/docs";
import { cn } from "@/lib/utils";
import { categories } from "@/config/categories";

const description =
  "Base UI components with tactile spring motion. Typed, copy-paste, and written so your AI agent gets it right the first time.";

export const metadata: Metadata = {
  description,
  title: "Taut Ui — Base UI components for humans and AI agents",
};

const WIDE_INDICES = new Set([0, 11, 12]);

export default function Page(): React.ReactElement {
  return (
    <>
      <section className="container w-full pt-14 pb-12 lg:pt-22 lg:pb-16">
        <h1 className="max-w-4xl font-bold font-heading text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          Components with shape.
        </h1>

        <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Button morph render={<Link href="/docs" />} size="md">
                Get started
              </Button>
              <Button
                morph
                render={<Link href="/docs/components/button" />}
                size="md"
                variant="secondary"
              >
                Browse components
              </Button>
            </div>
          </div>

          <TerminalInstall className="lg:max-w-md" />
        </div>
      </section>

      <section className="container w-full pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryTile
              description={category.description}
              isWide={WIDE_INDICES.has(index)}
              key={category.slug}
              name={category.name}
              slug={category.slug}
              thumbnail={getCategoryThumbnail(category.slug)}
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

interface CategoryTileProps {
  slug: string;
  name: string;
  description?: string;
  isWide?: boolean;
  thumbnail?: React.ReactNode;
}

function CategoryTile({
  slug,
  name,
  description,
  isWide = false,
  thumbnail,
}: CategoryTileProps): React.ReactElement {
  const href = `/docs/components/${slug}`;
  const isNew = PAGES_NEW.includes(href);

  return (
    <article
      className={cn(
        "group/tile relative flex flex-col rounded-3xl border border-border/75 bg-card p-2.5",
        "transition-colors duration-100 ease-out hover:border-border hover:bg-accent/30 motion-reduce:transition-none",
        isWide && "sm:col-span-2",
      )}
    >
      <div className="pointer-events-none relative flex h-46 w-full items-center justify-center overflow-hidden rounded-2xl bg-muted/45 px-6 dark:bg-background/50">
        {isNew && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-2.5 py-0.5 font-medium text-foreground text-xs">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            New
          </span>
        )}

        {thumbnail}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-1 px-2.5 pt-3.5 pb-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading font-semibold text-base text-foreground tracking-tight">
            <Link
              className="outline-none before:absolute before:inset-0 before:rounded-[inherit] focus-visible:before:ring-2 focus-visible:before:ring-ring"
              href={href}
            >
              {name}
            </Link>
          </h3>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground/50 transition-colors duration-100 group-hover/tile:text-foreground"
          />
        </div>
        <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
          {description || "\u00A0"}
        </p>
      </div>
    </article>
  );
}
