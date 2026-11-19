"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/registry/default/ui/badge";

export default function Particle() {
  return (
    <Badge
      render={
        <Link
          href="#as-link"
          onClick={(e) => e.preventDefault()}
          prefetch={false}
        />
      }
      variant="secondary"
    >
      Release notes
      <ArrowUpRightIcon />
    </Badge>
  );
}
