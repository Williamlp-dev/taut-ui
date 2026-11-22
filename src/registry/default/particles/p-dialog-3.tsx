"use client";

import { KeyIcon, ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  const [nestedOpen, setNestedOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Project Settings
      </DialogTrigger>
      <DialogPopup className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
          <DialogDescription>
            Manage team access, security policies, and API keys.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div className="space-y-0.5">
              <p className="font-medium text-foreground text-sm">
                API Credentials
              </p>
              <p className="text-muted-foreground text-xs">
                Active keys used in production environments.
              </p>
            </div>
            <Button
              onClick={() => setNestedOpen(true)}
              size="sm"
              variant="secondary"
            >
              <KeyIcon className="size-3.5" />
              Generate
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div className="space-y-0.5">
              <p className="font-medium text-foreground text-sm">
                Two-Factor Auth
              </p>
              <p className="text-muted-foreground text-xs">
                Enforce 2FA for all organization members.
              </p>
            </div>
            <ShieldCheckIcon className="size-5 text-primary" />
          </div>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button />}>Close</DialogClose>
        </DialogFooter>

        {/* Nested Dialog */}
        <Dialog onOpenChange={setNestedOpen} open={nestedOpen}>
          <DialogPopup className="sm:max-w-sm" showCloseButton>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Provide a name for your API key. It will only be visible once.
              </DialogDescription>
            </DialogHeader>
            <DialogPanel className="space-y-3">
              <Field>
                <FieldLabel>Key Name</FieldLabel>
                <Input
                  defaultValue="Production Service Key"
                  placeholder="e.g. CI/CD"
                />
              </Field>
            </DialogPanel>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost" />}>
                Cancel
              </DialogClose>
              <Button onClick={() => setNestedOpen(false)}>Create Key</Button>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      </DialogPopup>
    </Dialog>
  );
}
