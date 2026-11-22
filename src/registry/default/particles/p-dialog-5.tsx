import { FileTextIcon } from "lucide-react";
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
import { ScrollArea } from "@/registry/default/ui/scroll-area";

export default function Particle() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        <FileTextIcon className="size-4" />
        View Terms of Service
      </DialogTrigger>
      <DialogPopup className="sm:max-w-lg" showCloseButton>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read these terms and conditions carefully before using our
            services.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="overflow-hidden p-0">
          <ScrollArea className="h-72 px-6" scrollFade>
            <div className="space-y-4 py-3 text-xs leading-relaxed">
              <section className="space-y-1.5">
                <h4 className="font-semibold text-foreground text-sm">
                  1. Acceptance of Terms
                </h4>
                <p>
                  By accessing or using our platform, you agree to be bound by
                  these Terms. If you disagree with any part of the terms, you
                  may not access the service.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-foreground text-sm">
                  2. User Accounts & Security
                </h4>
                <p>
                  When you create an account with us, you must provide accurate
                  and complete information. You are responsible for safeguarding
                  the password that you use to access the service and for any
                  activities or actions under your password.
                </p>
                <p>
                  You agree not to disclose your password to any third party.
                  You must notify us immediately upon becoming aware of any
                  breach of security or unauthorized use of your account.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-foreground text-sm">
                  3. Intellectual Property
                </h4>
                <p>
                  The Service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  our organization and its licensors. Our trademarks may not be
                  used in connection with any product or service without prior
                  written consent.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-foreground text-sm">
                  4. Termination
                </h4>
                <p>
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-foreground text-sm">
                  5. Limitation of Liability
                </h4>
                <p>
                  In no event shall the company, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential, or punitive
                  damages.
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Decline</DialogClose>
          <DialogClose render={<Button />}>I Accept</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
