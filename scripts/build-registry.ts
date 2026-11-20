import { exec } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  getCategorySortOrder,
  isValidRegistryCategory,
} from "../src/registry/registry-categories";

const ROOT = process.cwd();
const REGISTRY_DIR = path.join(ROOT, "src/registry/default");
const DOCS_COMPONENTS_DIR = path.join(ROOT, "src/content/docs/components");
const INDEX_OUTPUT = path.join(ROOT, "src/registry/__index__.ts");
const REGISTRY_JSON = path.join(ROOT, "registry.json");
const PUBLISH = process.argv.includes("--publish");

type Group = {
  dir: string;
  type: string;
  preview: boolean;
  categories: string[];
};

const GROUPS: Group[] = [
  { dir: "ui", type: "registry:ui", preview: false, categories: ["ui"] },
  { dir: "hooks", type: "registry:hook", preview: false, categories: ["hook"] },
  { dir: "lib", type: "registry:lib", preview: false, categories: ["lib"] },
  {
    dir: "base-ui",
    type: "registry:lib",
    preview: false,
    categories: ["lib"],
  },
  {
    dir: "particles",
    type: "registry:example",
    preview: true,
    categories: ["particle"],
  },
];

type Item = {
  name: string;
  description: string;
  type: string;
  group: Group;
  file: string;
  registryDependencies: string[];
  dependencies: string[];
  categories: string[];
  colSpan?: number;
};

type DocParticleMeta = {
  title: string;
  heading: string;
};

const IGNORED_PACKAGES = new Set(["react", "react-dom", "next"]);

const S = "**:data-[slot=preview]";
const FULL = `${S}:w-full`;
const FIELD_W = `${FULL} ${S}:max-w-64`;
const WIDE_FIELD_W = `${FULL} ${S}:max-w-80`;
const CENTERED = `${FULL} ${S}:flex ${S}:justify-center`;
const TABS_VERTICAL = `${FULL} sm:${S}:max-w-80`;

const GROUP_PREVIEW_CLASS: Record<string, string> = {
  accordion: `${FULL} sm:${S}:max-w-[80%]`,
  alert: FULL,
  autocomplete: FIELD_W,
  card: CENTERED,
  combobox: FIELD_W,
  "context-menu": `${FULL} ${S}:max-w-sm`,
  "date-picker": FIELD_W,
  empty: CENTERED,
  field: FIELD_W,
  fieldset: FIELD_W,
  form: FIELD_W,
  frame: FULL,
  input: FIELD_W,
  "input-group": FIELD_W,
  meter: FIELD_W,
  "number-field": FIELD_W,
  progress: FIELD_W,
  "scroll-area": CENTERED,
  select: FIELD_W,
  separator: CENTERED,
  skeleton: CENTERED,
  slider: FIELD_W,
  table: FULL,
  textarea: FIELD_W,
};

// Exceções por exemplo; `null` remove a classe do grupo.
const PREVIEW_OVERRIDES: Record<string, string | null> = {
  "p-combobox-19": WIDE_FIELD_W,
  "p-combobox-20": WIDE_FIELD_W,
  "p-field-5": WIDE_FIELD_W,
  "p-field-11": null,
  "p-field-13": null,
  "p-form-4": null,
  "p-input-group-17": WIDE_FIELD_W,
  "p-select-21": null,
  "p-slider-17": null,
  "p-slider-18": null,
  "p-slider-19": null,
  "p-slider-20": null,
  "p-tabs-3": TABS_VERTICAL,
  "p-tabs-4": TABS_VERTICAL,
  "p-tabs-11": TABS_VERTICAL,
  "p-textarea-8": WIDE_FIELD_W,
};

const COL_SPAN_OVERRIDES: Record<string, number> = {};

function previewClassName(name: string, group: Group): string | undefined {
  if (group.dir !== "particles") return undefined;
  if (name in PREVIEW_OVERRIDES) return PREVIEW_OVERRIDES[name] ?? undefined;
  const base = name.match(/^p-(.+)-\d+$/)?.[1];
  return base ? GROUP_PREVIEW_CLASS[base] : undefined;
}

function parseImports(content: string) {
  const regex =
    /(?:import|export)\s+(?:type\s+)?(?:[\w*{}\s,]+\s+from\s+)?["']([^"']+)["']/g;
  const registryDeps = new Set<string>();
  const deps = new Set<string>();

  for (let m = regex.exec(content); m !== null; m = regex.exec(content)) {
    const spec = m[1];

    const internal = spec.match(
      /^@\/registry\/default\/(ui|hooks|lib|base-ui)\/([^/]+)/,
    );
    if (internal) {
      const name = internal[2].replace(/\.tsx?$/, "");
      if (!(internal[1] === "lib" && name === "utils")) {
        registryDeps.add(name);
      }
      continue;
    }

    if (spec.startsWith(".") || spec.startsWith("/") || spec.startsWith("@/")) {
      continue;
    }
    if (spec.startsWith("node:")) continue;

    const pkg = spec.startsWith("@")
      ? spec.split("/").slice(0, 2).join("/")
      : spec.split("/")[0];
    if (!IGNORED_PACKAGES.has(pkg)) deps.add(pkg);
  }

  return {
    dependencies: [...deps].sort(),
    registryDependencies: [...registryDeps].sort(),
  };
}

async function collectDocsParticleMeta(): Promise<
  Map<string, DocParticleMeta>
> {
  const map = new Map<string, DocParticleMeta>();
  let entries: string[] = [];
  try {
    entries = (await fs.readdir(DOCS_COMPONENTS_DIR)).filter((f) =>
      f.endsWith(".mdx"),
    );
  } catch {
    return map;
  }

  for (const file of entries) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = await fs.readFile(
      path.join(DOCS_COMPONENTS_DIR, file),
      "utf-8",
    );
    const lines = raw.split(/\r?\n/);
    let title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    let lastHeading = "";

    for (const line of lines) {
      const titleMatch = line.match(/^title:\s*(.+)/);
      if (titleMatch) {
        title = titleMatch[1].trim().replace(/^["']|["']$/g, "");
      }
      const headingMatch = line.match(/^#{2,4}\s+(.+)/);
      if (headingMatch) {
        lastHeading = headingMatch[1].trim().replace(/`/g, "");
      }
      const previewMatch = line.match(/name="(p-[a-z0-9-]+)"/);
      if (previewMatch) {
        map.set(previewMatch[1], {
          heading: lastHeading,
          title,
        });
      }
    }
  }

  return map;
}

function describe(
  name: string,
  group: Group,
  docMeta?: DocParticleMeta,
): string {
  if (group.dir === "particles") {
    if (docMeta) {
      if (!docMeta.heading) {
        return `Basic ${docMeta.title.toLowerCase()}`;
      }
      return `${docMeta.title} — ${docMeta.heading}`;
    }
    const m = name.match(/^p-(.+)-(\d+)$/);
    return m
      ? `${m[1].replace(/-/g, " ")} example ${m[2]}`
      : name.replace(/^p-/, "").replace(/-/g, " ");
  }
  return `${name.replace(/-/g, " ")} (${group.dir})`;
}

function deriveParticleCategories(
  name: string,
  content: string,
  dependencies: string[],
  registryDependencies: string[],
  docMeta?: DocParticleMeta,
): string[] {
  const categories = new Set<string>();

  const base = name.match(/^p-(.+)-\d+$/)?.[1];
  if (base) {
    const baseCategory = base.replace(/-/g, " ");
    if (isValidRegistryCategory(baseCategory)) {
      categories.add(baseCategory);
    }
  }

  for (const dep of registryDependencies) {
    const depCategory = dep.replace(/-/g, " ");
    if (isValidRegistryCategory(depCategory)) {
      categories.add(depCategory);
    }
  }

  const heading = docMeta?.heading ?? "";

  if (/\basync\b/i.test(heading) || /setTimeout|new Promise/.test(content)) {
    categories.add("async");
  }
  if (
    /\bcopy\b/i.test(heading) ||
    registryDependencies.includes("use-copy-to-clipboard")
  ) {
    categories.add("copy");
  }
  if (/\bdisabled\b/i.test(heading)) {
    categories.add("disabled");
  }
  if (/\berror\b|\binvalid\b/i.test(heading)) {
    categories.add("error");
  }
  if (/\bfile\b|\bupload\b/i.test(heading) || /type="file"/.test(content)) {
    categories.add("file");
  }
  if (/\bfilter\b/i.test(heading)) {
    categories.add("filter");
  }
  if (/\binfo\b/i.test(heading)) {
    categories.add("info");
  }
  if (
    /\bloading\b/i.test(heading) ||
    registryDependencies.includes("spinner")
  ) {
    categories.add("loading");
  }
  if (/\bmulti(?:ple|select)?\b/i.test(heading)) {
    categories.add("multiselect");
  }
  if (/\bpassword\b/i.test(heading) || /type="password"/.test(content)) {
    categories.add("password");
  }
  if (/\bsearch\b/i.test(heading)) {
    categories.add("search");
  }
  if (/\bsuccess\b/i.test(heading)) {
    categories.add("success");
  }
  if (
    /\bvalidation\b|\bvalidat|\bzod\b/i.test(heading) ||
    dependencies.includes("zod")
  ) {
    categories.add("validation");
  }
  if (/\bwarning\b/i.test(heading)) {
    categories.add("warning");
  }
  if (dependencies.includes("zod") || /\bzod\b/i.test(heading)) {
    categories.add("zod");
  }

  const valid = [...categories].filter((cat) => isValidRegistryCategory(cat));
  if (valid.length === 0) {
    return ["particle"];
  }

  return valid.sort(
    (a, b) => getCategorySortOrder(a) - getCategorySortOrder(b),
  );
}

async function collectItems(): Promise<Item[]> {
  const items: Item[] = [];
  const seen = new Set<string>();
  const docsMeta = await collectDocsParticleMeta();

  for (const group of GROUPS) {
    const dir = path.join(REGISTRY_DIR, group.dir);
    let entries: string[] = [];
    try {
      entries = (await fs.readdir(dir)).filter((f) => /\.tsx?$/.test(f)).sort();
    } catch {
      continue;
    }

    for (const file of entries) {
      const name = file.replace(/\.tsx?$/, "");
      if (seen.has(name)) {
        console.warn(`⚠️  Nome duplicado ignorado: ${group.dir}/${file}`);
        continue;
      }
      seen.add(name);

      const content = await fs.readFile(path.join(dir, file), "utf-8");
      const { dependencies, registryDependencies } = parseImports(content);
      const docMeta =
        group.dir === "particles" ? docsMeta.get(name) : undefined;
      const categories =
        group.dir === "particles"
          ? deriveParticleCategories(
              name,
              content,
              dependencies,
              registryDependencies,
              docMeta,
            )
          : group.categories;

      items.push({
        categories,
        colSpan:
          group.dir === "particles" ? COL_SPAN_OVERRIDES[name] : undefined,
        dependencies,
        description: describe(name, group, docMeta),
        file: `src/registry/default/${group.dir}/${file}`,
        group,
        name,
        registryDependencies,
        type: group.type,
      });
    }
  }

  return items;
}

async function writeIndex(items: Item[]) {
  const body = items
    .map((item) => {
      const importPath = `@/registry/default/${item.group.dir}/${item.name}`;
      const component = item.group.preview
        ? `React.lazy(async () => {\n      const mod = await import("${importPath}");\n      const key = Object.keys(mod).find((k) => typeof mod[k] === "function");\n      return { default: mod.default ?? mod[key] };\n    })`
        : "null";
      const previewClass = previewClassName(item.name, item.group);
      const metaEntries: string[] = [];
      if (previewClass) {
        metaEntries.push(`className: ${JSON.stringify(previewClass)}`);
      }
      if (item.colSpan) {
        metaEntries.push(`colSpan: ${item.colSpan}`);
      }

      return `  "${item.name}": {\n    name: "${item.name}",\n    description: ${JSON.stringify(item.description)},\n    type: "${item.type}",\n    registryDependencies: ${JSON.stringify(item.registryDependencies)},\n    dependencies: ${JSON.stringify(item.dependencies)},\n    files: [{ path: "${item.file}", type: "${item.type}" }],\n    component: ${component},\n    categories: ${JSON.stringify(item.categories)},${
        metaEntries.length > 0
          ? `\n    meta: { ${metaEntries.join(", ")} },`
          : ""
      }\n  },`;
    })
    .join("\n");

  const content = `// @ts-nocheck\n// Arquivo GERADO por scripts/build-registry.ts — não edite.\n${body.includes("React.") ? `import * as React from "react";\n\n` : ""}export const Index: Record<string, unknown> = {\n${body}\n};\n`;
  await fs.writeFile(INDEX_OUTPUT, content, "utf-8");
}

async function writeRegistryJson(items: Item[]) {
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    homepage: "https://taut-ui.com",
    items: items.map((i) => ({
      categories: i.categories,
      dependencies: i.dependencies,
      description: i.description,
      files: [{ path: i.file, type: i.type }],
      name: i.name,
      registryDependencies: i.registryDependencies,
      type: i.type,
    })),
    name: "taut-ui",
  };
  await fs.writeFile(REGISTRY_JSON, JSON.stringify(registry, null, 2));
}

function shadcnBuild() {
  return new Promise<void>((resolve, reject) => {
    const child = exec(
      "bunx --bun shadcn build registry.json --output public/r",
    );
    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`shadcn build exited ${code}`)),
    );
  });
}

try {
  const items = await collectItems();
  await writeIndex(items);
  console.log(`🗂️  ${items.length} items -> src/registry/__index__.ts`);

  if (PUBLISH) {
    await writeRegistryJson(items);
    console.log("💅 registry.json gerado");
    await shadcnBuild();
    console.log("✅ public/r atualizado");
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
