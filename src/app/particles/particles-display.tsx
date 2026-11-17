import type * as React from "react";
import { cache, Suspense } from "react";
import { Index } from "@/registry/__index__";
import { Skeleton } from "@/registry/default/ui/skeleton";
import type { RegistryCategory } from "@/registry/registry-categories";
import { ParticleCard } from "./particle-card";
import { ParticleCardContainer } from "./particle-card-container";

type Particle = {
  name: string;
  type?: string;
  categories?: RegistryCategory[];
  registryDependencies?: string[];
  meta?: { className?: string; colSpan?: number };
};

function calculateRelevanceWeight(
  particle: Particle,
  searchTerms: RegistryCategory[],
): number {
  let weight = 0;

  for (const term of searchTerms) {
    const normalizedTerm = term.replace(/\s+/g, "-");

    if (particle.name.startsWith(`p-${normalizedTerm}-`)) {
      weight += 30;
    }

    const deps = particle.registryDependencies ?? [];
    if (
      deps.some(
        (dep) => dep === normalizedTerm || dep === `@taut-ui/${normalizedTerm}`,
      )
    ) {
      weight += 20;
    }

    const categories = particle.categories ?? [];
    if (categories[0] === term) {
      weight += 10;
    }
  }

  return weight;
}

function ParticleCardSkeleton({
  className,
  colSpan,
}: {
  className?: string;
  colSpan?: number;
}): React.ReactElement {
  return (
    <ParticleCardContainer
      className={className}
      colSpan={colSpan}
      footer={
        <>
          <div className="flex flex-1 items-center gap-1.5">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </>
      }
    >
      <Skeleton className="h-8 w-56" />
    </ParticleCardContainer>
  );
}

const getParticles = cache(() => {
  return (Object.values(Index) as Particle[]).filter(
    (item) => item.type === "registry:example",
  );
});

export async function ParticlesDisplay({
  selectedCategories,
}: {
  selectedCategories: RegistryCategory[];
}): Promise<React.ReactElement> {
  const particles = getParticles();

  const filteredParticles = particles
    .filter((particle) => {
      const categories = particle.categories ?? [];
      return selectedCategories.every((value) => categories.includes(value));
    })
    .sort((a, b) => {
      const weightA = calculateRelevanceWeight(a, selectedCategories);
      const weightB = calculateRelevanceWeight(b, selectedCategories);
      return weightB - weightA;
    });

  if (filteredParticles.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No particles found for the selected filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 items-stretch gap-8 pb-12 lg:grid-cols-2 lg:gap-6 xl:gap-8">
      {filteredParticles.map((particle) => {
        const className = particle.meta?.className;
        const colSpan = particle.meta?.colSpan;
        return (
          <Suspense
            fallback={
              <ParticleCardSkeleton className={className} colSpan={colSpan} />
            }
            key={particle.name}
          >
            <ParticleCard
              className={className}
              colSpan={colSpan}
              name={particle.name}
            />
          </Suspense>
        );
      })}
    </div>
  );
}
