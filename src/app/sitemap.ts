import type { MetadataRoute } from "next";
import { appConfig } from "@/lib/config";
import { source } from "@/lib/source";

// Google ignores `priority` and `changefreq`, and a made-up `lastmod` hurts
// more than it helps, so only the canonical URLs are listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/particles", ...source.getPages().map((page) => page.url)].map(
    (path) => ({ url: new URL(path, appConfig.url).toString() }),
  );
}
