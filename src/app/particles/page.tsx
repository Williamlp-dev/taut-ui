import type { Metadata } from "next";
import type * as React from "react";
import { Suspense } from "react";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/shared/page-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { Index } from "@/registry/__index__";
import { isValidRegistryCategory } from "@/registry/registry-categories";
import { ParticlesDisplay } from "./particles-display";
import SearchContainer from "./search-container";

const particleCount = (Object.values(Index) as Array<{ type?: string }>).filter(
  (item) => item.type === "registry:example",
).length;

const description = `Discover ${particleCount} ready-to-use particles, the building blocks of your design system. Filter by category to find the perfect component for your project.`;

export const metadata: Metadata = {
  description,
  title: "Browse Particles - taut ui",
};

async function ParticlesDisplayServer({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string }>;
}): Promise<React.ReactElement | null> {
  const params = await searchParams;
  const rawCategories = params.tags?.split(",").filter(Boolean) || [];

  const validCategories = rawCategories.filter((category) =>
    isValidRegistryCategory(category),
  );
  const invalidCategories = rawCategories.filter(
    (category) => !isValidRegistryCategory(category),
  );

  if (invalidCategories.length > 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No particles found for the selected filters
        </p>
      </div>
    );
  }

  if (validCategories.length === 0) return null;

  return <ParticlesDisplay selectedCategories={validCategories} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string }>;
}): React.ReactElement {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col">
      <div className="container w-full flex-1">
        <PageHeader className="*:pb-8!">
          <PageHeaderHeading>Browse Particles</PageHeaderHeading>
          <PageHeaderDescription className="max-w-2xl">
            {description}
          </PageHeaderDescription>
        </PageHeader>
        <Suspense>
          <SearchContainer />
        </Suspense>
        <Suspense>
          <ParticlesDisplayServer searchParams={searchParams} />
        </Suspense>
      </div>
      <SiteFooter />
    </div>
  );
}
