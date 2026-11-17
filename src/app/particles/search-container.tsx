"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type * as React from "react";
import { useCallback, useMemo, useTransition } from "react";
import { Index } from "@/registry/__index__";
import { getCategorySortOrder } from "@/registry/registry-categories";
import SearchField, { type CategoryOption } from "./search-field";

interface RegistryItem {
  type?: string;
  categories?: string[];
}

const particles = (Object.values(Index) as RegistryItem[]).filter(
  (item) => item.type === "registry:example",
);

const categoryCounts = new Map<string, number>();
for (const particle of particles) {
  for (const category of particle.categories ?? []) {
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
  }
}

const searchItems: CategoryOption[] = Array.from(categoryCounts.entries())
  .sort(([a], [b]) => getCategorySortOrder(a) - getCategorySortOrder(b))
  .map(([category, count]) => ({
    count,
    label: category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    value: category,
  }));

export default function SearchContainer(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const selectedItems = useMemo(() => {
    const tags = searchParams?.get("tags")?.split(",").filter(Boolean) || [];
    return tags
      .map((tag) => searchItems.find((item) => item.value === tag))
      .filter((item): item is CategoryOption => !!item);
  }, [searchParams]);

  const updateSelectedItems = useCallback(
    (items: CategoryOption[]) => {
      startTransition(() => {
        const tags =
          items.length > 0 ? items.map((item) => item.value).join(",") : "";
        const newUrl = tags
          ? `${pathname}?tags=${encodeURIComponent(tags)}`
          : pathname;
        router.push(newUrl, { scroll: false });
      });
    },
    [router, pathname],
  );

  return (
    <div className="mb-8 md:mb-12 lg:mb-16">
      <SearchField
        items={searchItems}
        onItemsChange={updateSelectedItems}
        selectedItems={selectedItems}
      />
    </div>
  );
}
