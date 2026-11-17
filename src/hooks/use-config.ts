import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type InstallationType = "cli" | "manual";

export interface DocsUserConfig {
  packageManager: PackageManager;
  installationType: InstallationType;
}

const docsConfigAtom = atomWithStorage<DocsUserConfig>(
  "taut-ui:config",
  {
    installationType: "cli",
    packageManager: "pnpm",
  },
  undefined,
  { getOnInit: false },
);

export function useConfig() {
  return useAtom(docsConfigAtom);
}
