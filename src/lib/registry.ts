import { promises as fs } from "node:fs";
import path from "node:path";
import { Index } from "@/registry/__index__";

type RegistryFile = {
  path: string;
  type?: string;
  target?: string;
  content?: string;
};

type RegistryItem = {
  name?: string;
  categories?: string[];
  component?: unknown;
  dependencies?: string[];
  description?: string;
  files?: Array<string | RegistryFile>;
  registryDependencies?: string[];
  type?: string;
  [key: string]: unknown;
};

const RegistryIndex = Index as Record<string, RegistryItem | undefined>;

export function getRegistryComponent(name: string) {
  return RegistryIndex[name]?.component;
}

export async function getRegistryItem(name: string) {
  const item: RegistryItem | undefined =
    RegistryIndex[name] ??
    (name.startsWith("p-")
      ? {
          categories: ["particle"],
          component: null,
          dependencies: [],
          description: name,
          files: [
            {
              path: `src/registry/default/particles/${name}.tsx`,
              type: "registry:example",
            },
          ],
          name,
          registryDependencies: [],
          type: "registry:example",
        }
      : {
          categories: ["ui"],
          component: null,
          dependencies: [],
          description: name,
          files: [
            {
              path: `src/registry/default/ui/${name}.tsx`,
              type: "registry:ui",
            },
          ],
          name,
          registryDependencies: [],
          type: "registry:ui",
        });

  if (!item) {
    return null;
  }

  if (Array.isArray(item.files)) {
    item.files = item.files.map((file) =>
      typeof file === "string" ? { path: file } : file,
    );
  }

  const files: RegistryFile[] = (item.files ?? []).map((file) =>
    typeof file === "string" ? { path: file } : file,
  );
  const processedFiles: RegistryFile[] = [];

  for (const file of files) {
    const content = await getFileContent(file);
    const relativePath = path.relative(process.cwd(), file.path);

    processedFiles.push({
      ...file,
      content,
      path: relativePath,
    });
  }

  const finalFiles = fixFilePaths(processedFiles);

  return {
    ...item,
    files: finalFiles,
  };
}

async function getFileContent(file: RegistryFile) {
  const filePath = path.isAbsolute(file.path)
    ? file.path
    : path.join(
        /* turbopackIgnore: true */ process.cwd(),
        "src",
        file.path.replace(/^src[\\/]/, ""),
      );
  const raw = await fs.readFile(filePath, "utf-8");

  return fixImport(raw);
}

function getFileTarget(file: RegistryFile) {
  let target = file.target;

  if (!target || target === "") {
    const fileName = file.path.split("/").pop();
    if (
      file.type === "registry:block" ||
      file.type === "registry:component" ||
      file.type === "registry:example"
    ) {
      target = `components/${fileName}`;
    }

    if (file.type === "registry:ui") {
      target = `components/ui/${fileName}`;
    }

    if (file.type === "registry:hook") {
      target = `hooks/${fileName}`;
    }

    if (file.type === "registry:lib") {
      target = file.path.includes("base-ui/")
        ? `base-ui/${fileName}`
        : `lib/${fileName}`;
    }
  }

  return target ?? "";
}

function fixFilePaths(files: RegistryFile[]) {
  if (!files) {
    return [];
  }

  const firstFilePath = files[0]?.path;
  if (!firstFilePath) {
    return [];
  }
  const firstFilePathDir = path.dirname(firstFilePath);

  return files.map((file) => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file),
    };
  });
}

export function fixImport(content: string) {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g;

  const replacement = (
    match: string,
    _path: string,
    type: string,
    component: string,
  ) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`;
    }
    if (type.endsWith("ui")) {
      return `@/components/ui/${component}`;
    }
    if (type.endsWith("hooks")) {
      return `@/hooks/${component}`;
    }
    if (type.endsWith("lib")) {
      return `@/lib/${component}`;
    }

    return match;
  };

  return content.replace(regex, replacement);
}

export type FileTree = {
  name: string;
  path?: string;
  children?: FileTree[];
};

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>,
) {
  const root: FileTree[] = [];

  for (const file of files) {
    const path = file.target ?? file.path;
    const parts = path.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        if (isFile) {
          existingNode.path = path;
        } else if (existingNode.children) {
          currentLevel = existingNode.children;
        }
      } else if (part) {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { children: [], name: part };

        currentLevel.push(newNode);

        if (!isFile && newNode.children) {
          currentLevel = newNode.children;
        }
      }
    }
  }

  return root;
}
