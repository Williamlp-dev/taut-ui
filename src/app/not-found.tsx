import { ArrowLeftIcon, CompassIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type * as React from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export const metadata: Metadata = {
  description:
    "The page you're looking for doesn't exist or may have been moved.",
  title: "Page Not Found",
};

export default function NotFound(): React.ReactElement {
  return (
    <div className="container flex min-h-[calc(100vh-var(--header-height))] w-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CompassIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>Page Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/" />} size="sm">
            <ArrowLeftIcon aria-hidden="true" />
            Back to Home
          </Button>
          <Button render={<Link href="/docs" />} size="sm" variant="secondary">
            Browse Docs
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
