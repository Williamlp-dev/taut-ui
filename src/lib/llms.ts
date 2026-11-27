import { promises as fs } from "node:fs";
import path from "node:path";
import { Index } from "@/registry/__index__";
import { appConfig } from "@/lib/config";
import { fixImport } from "@/lib/registry";
import { source } from "@/lib/source";

type DocPage = NonNullable<ReturnType<typeof source.getPage>>;
type TreeNode = (typeof source.pageTree)["children"][number];
type RegistryEntry = { files?: Array<string | { path: string }> };

const SITE = appConfig.url;
const RegistryIndex = Index as Record<string, RegistryEntry | undefined>;

export function getMarkdownPath(url: string): string {
  return url === "/docs" ? "/docs.md" : `${url}.md`;
}

async function readRegistrySource(name: string): Promise<string> {
  const firstFile = RegistryIndex[name]?.files?.[0];
  const relativePath =
    typeof firstFile === "string"
      ? firstFile
      : (firstFile?.path ??
        `src/registry/default/${name.startsWith("p-") ? "particles" : "ui"}/${name}.tsx`);

  try {
    const raw = await fs.readFile(
      path.join(/* turbopackIgnore: true */ process.cwd(), relativePath),
      "utf-8",
    );
    return fixImport(raw).trimEnd();
  } catch {
    return "";
  }
}

async function toPlainMarkdown(mdx: string): Promise<string> {
  const tagPattern = /<(ComponentPreview|ComponentSource)\b([^>]*?)\/>/g;
  const matches = [...mdx.matchAll(tagPattern)];
  const blocks = await Promise.all(
    matches.map(async ([, tag, attrs = ""]) => {
      const name = attrs.match(/name="([^"]*)"/)?.[1];
      const title = attrs.match(/title="([^"]*)"/)?.[1];
      const code = name ? await readRegistrySource(name) : "";
      if (!code) return "";
      const info =
        tag === "ComponentSource" && title ? `tsx title="${title}"` : "tsx";
      return `\`\`\`${info}\n${code}\n\`\`\``;
    }),
  );

  let i = 0;
  return mdx
    .replace(tagPattern, () => blocks[i++] ?? "")
    .replace(/<TabsList>[\s\S]*?<\/TabsList>/g, "")
    .replace(
      /<TabsPanel value="([^"]+)">/g,
      (_m, v: string) =>
        `**${v === "cli" ? "CLI" : `${v.charAt(0).toUpperCase()}${v.slice(1)}`}**\n`,
    )
    .replace(/<\/?(?:CodeTabs|TabsPanel|Steps)>/g, "")
    .replace(/<Step>\s*([\s\S]*?)\s*<\/Step>/g, "- $1")
    .replace(/@taut-ui\/([a-z0-9-]+)/g, `${SITE}/r/$1.json`)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function renderPageMarkdown(page: DocPage): Promise<string> {
  const { title, description } = page.data;
  const body = await toPlainMarkdown(await page.data.getText("processed"));

  return `${[
    `# ${title}`,
    description ? `> ${description}` : "",
    `Canonical URL: ${SITE}${page.url}`,
    body,
  ]
    .filter(Boolean)
    .join("\n\n")}\n`;
}

export async function getPageMarkdownBySlug(
  slug?: string[],
): Promise<{ content: string; url: string } | null> {
  const page = source.getPage(slug);
  if (!page) return null;

  return {
    content: await renderPageMarkdown(page),
    url: page.url,
  };
}

function pagesOf(node: TreeNode): DocPage[] {
  if (node.type === "page") {
    const page = source.getNodePage(node);
    return page ? [page] : [];
  }
  if (node.type === "folder") {
    return [
      ...(node.index ? pagesOf(node.index) : []),
      ...node.children.flatMap(pagesOf),
    ];
  }
  return [];
}

const INTRO = `# Taut UI

> ${appConfig.description}

Taut UI is an open-source (MIT) React component library built on Base UI, Tailwind CSS v4 and React 19. Components are distributed as a shadcn-compatible registry: the source is copied into your project and you own it.

## How to use this documentation

- Every documentation page is available as Markdown: append \`.md\` to its URL (for example ${SITE}/docs/components/button.md) or send the HTTP header \`Accept: text/markdown\`. Cite the canonical URL (without \`.md\`) when linking to a page.
- Code examples in the Markdown pages are inlined and use the import paths of a consumer project (\`@/components/ui/...\`).
- Install any item with the shadcn CLI: \`npx shadcn@latest add ${SITE}/r/<name>.json\` (for example \`${SITE}/r/button.json\`).
- Registry index: ${SITE}/r/registry.json
- The complete documentation in a single file: ${SITE}/llms-full.txt`;

export async function getLlmsTxt(): Promise<string> {
  const sections = source.pageTree.children.flatMap((node) => {
    if (node.type !== "folder") return [];
    const pages = pagesOf(node);
    if (pages.length === 0) return [];
    const name = typeof node.name === "string" ? node.name : "Documentation";
    const list = pages
      .map((p) => {
        const link = `[${p.data.title}](${SITE}${getMarkdownPath(p.url)})`;
        return p.data.description
          ? `- ${link}: ${p.data.description}`
          : `- ${link}`;
      })
      .join("\n");
    return [`## ${name}\n\n${list}`];
  });

  const optional = `## Optional

- [Browse particles](${SITE}/particles): Gallery of ready-to-use component examples.
- [GitHub](${appConfig.links.github}): Source code and issue tracker.`;

  return `${[INTRO, ...sections, optional].join("\n\n")}\n`;
}

export async function getLlmsFullTxt(): Promise<string> {
  const pages = await Promise.all(source.getPages().map(renderPageMarkdown));
  return `${INTRO}\n\n---\n\n${pages.join("\n---\n\n")}`;
}
