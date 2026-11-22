"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  function handleRevoke() {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setOpen(false);
    }, 1200);
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Revoke Sessions
      </AlertDialogTrigger>
      <AlertDialogPopup className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out all devices?</AlertDialogTitle>
          <AlertDialogDescription>
            Every active session except this browser will be signed out
            immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose
            disabled={isPending}
            render={<Button variant="ghost" />}
          >
            Cancel
          </AlertDialogClose>
          <Button
            loading={isPending}
            onClick={handleRevoke}
            variant="destructive"
          >
            Revoke all
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
