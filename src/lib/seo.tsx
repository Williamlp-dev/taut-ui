import type { Metadata } from "next";
import { ImageResponse } from "next/og";
import type * as React from "react";
import { MARK_PATH } from "@/components/shared/logo";
import { appConfig } from "@/lib/config";

export const OG_IMAGE_SIZE = {
  height: 630,
  width: 1200,
};

export function getDocsOgPath(slugs: string[]): string {
  return slugs.length > 0 ? `/og/docs/${slugs.join("/")}` : "/og/docs";
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  markdownPath?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  type = "website",
  markdownPath,
}: PageMetadataOptions): Pick<
  Metadata,
  "alternates" | "description" | "openGraph" | "twitter"
> {
  return {
    alternates: {
      canonical: path,
      ...(markdownPath ? { types: { "text/markdown": markdownPath } } : {}),
    },
    description,
    openGraph: {
      description,
      images: [{ alt: title, url: image, ...OG_IMAGE_SIZE }],
      locale: "en_US",
      siteName: "Taut UI",
      title,
      type,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title,
    },
  };
}

function JsonLdScript({
  data,
}: {
  data: Record<string, unknown>;
}): React.ReactElement {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}

export function SiteJsonLd({
  description,
}: {
  description: string;
}): React.ReactElement {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            description,
            name: "Taut UI",
            url: appConfig.url,
          },
          {
            "@type": "SoftwareSourceCode",
            codeRepository: appConfig.links.github,
            description,
            license: "https://opensource.org/licenses/MIT",
            name: "Taut UI",
            programmingLanguage: "TypeScript",
            url: appConfig.url,
          },
        ],
      }}
    />
  );
}

export function DocJsonLd({
  title,
  description,
  url,
  slugs,
}: {
  title: string;
  description: string;
  url: string;
  slugs: string[];
}): React.ReactElement {
  const pageUrl = new URL(url, appConfig.url).toString();
  const imageUrl = new URL(getDocsOgPath(slugs), appConfig.url).toString();

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "TechArticle",
            description,
            headline: title,
            image: imageUrl,
            mainEntityOfPage: pageUrl,
            publisher: {
              "@type": "Organization",
              name: "Taut UI",
              url: appConfig.url,
            },
            url: pageUrl,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                item: appConfig.url,
                name: "Home",
                position: 1,
              },
              {
                "@type": "ListItem",
                item: new URL("/docs", appConfig.url).toString(),
                name: "Docs",
                position: 2,
              },
              ...(slugs.length > 0
                ? [
                    {
                      "@type": "ListItem",
                      item: pageUrl,
                      name: title,
                      position: 3,
                    },
                  ]
                : []),
            ],
          },
        ],
      }}
    />
  );
}

export function renderOgCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        background:
          "radial-gradient(circle at 88% 12%, rgba(168, 199, 250, 0.18), transparent 45%), #15171c",
        color: "#e6e7ec",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "64px 72px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "18px" }}>
          <svg
            aria-hidden="true"
            fill="none"
            height="46"
            viewBox="0 0 527 556"
            width="44"
          >
            <path
              clipRule="evenodd"
              d={MARK_PATH}
              fill="#f4f4f1"
              fillRule="evenodd"
            />
          </svg>
          <span
            style={{
              color: "#f4f4f1",
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            taut ui
          </span>
        </div>

        {badge ? (
          <div
            style={{
              background: "rgba(168, 199, 250, 0.12)",
              border: "1px solid rgba(168, 199, 250, 0.28)",
              borderRadius: "9999px",
              color: "#b8d0fa",
              display: "flex",
              fontSize: "20px",
              fontWeight: 500,
              padding: "10px 22px",
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "960px",
        }}
      >
        <div
          style={{
            color: "#f4f4f1",
            display: "flex",
            fontSize: title.length > 28 ? "58px" : "70px",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#a7acb8",
            display: "flex",
            fontSize: "28px",
            lineHeight: 1.4,
            maxWidth: "880px",
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#8b91a0",
          display: "flex",
          fontSize: "22px",
          justifyContent: "space-between",
          paddingTop: "24px",
          width: "100%",
        }}
      >
        <span>Base UI · Tailwind CSS v4 · React 19</span>
        <span style={{ color: "#e6e7ec", fontWeight: 600 }}>taut-ui.com</span>
      </div>
    </div>,
    OG_IMAGE_SIZE,
  );
}
