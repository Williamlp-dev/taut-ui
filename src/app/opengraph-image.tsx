import { appConfig } from "@/lib/config";
import { OG_IMAGE_SIZE, renderOgCard } from "@/lib/seo";

export const alt = "Taut UI — Accessible, tactile Base UI components";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    badge: "Open Source Registry",
    description: appConfig.description,
    title: "Components with shape.",
  });
}
