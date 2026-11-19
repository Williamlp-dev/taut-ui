"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button
      render={
        <Link
          href="#as-link"
          onClick={(e) => e.preventDefault()}
          prefetch={false}
        />
      }
      variant="outline"
    >
      Documentation
      <ArrowUpRightIcon />
    </Button>
  );
}
