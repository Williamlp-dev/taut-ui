import * as React from "react";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { GitHubLinkClient } from "@/components/shared/github-link-client";

const REPO_API_URL = "https://api.github.com/repos/taut-ui/taut-ui";

function formatCompactCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toLocaleString();
}

export async function StarsCount(): Promise<React.ReactElement | null> {
  try {
    const response = await fetch(REPO_API_URL, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as { stargazers_count?: unknown };
    const count = payload.stargazers_count;

    if (typeof count !== "number" || count < 0) return null;

    return (
      <span className="text-muted-foreground text-xs tabular-nums">
        {formatCompactCount(count)}
      </span>
    );
  } catch {
    return null;
  }
}

export function GitHubLink(): React.ReactElement {
  return (
    <GitHubLinkClient
      stars={
        <React.Suspense fallback={<Skeleton className="h-3.5 w-6" />}>
          <StarsCount />
        </React.Suspense>
      }
    />
  );
}
