import type { MetadataRoute } from "next";
import { appConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: new URL("/sitemap.xml", appConfig.url).toString(),
  };
}
