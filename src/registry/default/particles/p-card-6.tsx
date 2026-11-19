import { Button } from "@/registry/default/ui/button";
import {
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFramePanel,
  CardFrameTitle,
} from "@/registry/default/ui/card";

export default function Particle() {
  return (
    <CardFrame className="w-96">
      <CardFrameHeader>
        <CardFrameTitle>Notifications</CardFrameTitle>
        <CardFrameDescription>
          Choose how you want to be notified.
        </CardFrameDescription>
        <CardFrameAction>
          <Button size="xs" variant="outline">
            Reset
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <CardFramePanel>
        <p className="text-muted-foreground text-sm">
          Receive product updates, weekly digests, and security alerts directly
          in your inbox.
        </p>
      </CardFramePanel>
      <CardFrameFooter>
        <span className="text-muted-foreground text-xs">
          Last updated just now
        </span>
        <Button size="xs">Save</Button>
      </CardFrameFooter>
    </CardFrame>
  );
}
