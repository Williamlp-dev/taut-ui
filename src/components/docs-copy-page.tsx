"use client";

import { Check, Copy } from "lucide-react";
import type * as React from "react";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";

export interface DocsCopyPageProps {
  page?: string;
}

export function DocsCopyPage({
  page,
}: DocsCopyPageProps): React.ReactElement | null {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  if (!page) return null;

  return (
    <Button
      className="gap-1.5"
      onClick={() => copyToClipboard(page)}
      size="xs"
      variant="tonal"
    >
      {isCopied ? (
        <Check className="size-3.5 text-success" />
      ) : (
        <Copy className="size-3.5 opacity-75" />
      )}
      <span>Copy page</span>
    </Button>
  );
}
