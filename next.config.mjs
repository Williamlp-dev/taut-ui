import { createMDX } from "fumadocs-mdx/next";

const prefersMarkdown = [
  { type: "header", key: "accept", value: "(.*)text/markdown(.*)" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        // The docs answer with HTML or Markdown depending on `Accept`.
        headers: [{ key: "Vary", value: "Accept" }],
        source: "/docs/:path*",
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { destination: "/llms.mdx", source: "/docs.md" },
        { destination: "/llms.mdx", source: "/docs.mdx" },
        { destination: "/llms.mdx/:path*", source: "/docs/:path*.md" },
        { destination: "/llms.mdx/:path*", source: "/docs/:path*.mdx" },
        { destination: "/llms.mdx", has: prefersMarkdown, source: "/docs" },
        {
          destination: "/llms.mdx/:path*",
          has: prefersMarkdown,
          source: "/docs/:path*",
        },
      ],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
