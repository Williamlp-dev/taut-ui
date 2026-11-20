import { Separator } from "@/registry/default/ui/separator";

export default function Particle() {
  return (
    <div className="w-72 space-y-4">
      <div className="space-y-1">
        <h4 className="font-medium text-sm">Taut UI</h4>
        <p className="text-muted-foreground text-sm">
          Beautiful components built with Base UI.
        </p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
    </div>
  );
}
