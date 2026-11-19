import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useSyncExternalStore } from "react";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type InstallationType = "cli" | "manual";

export interface DocsUserConfig {
  packageManager: PackageManager;
  installationType: InstallationType;
}

type SetDocsConfig = (
  update: DocsUserConfig | ((prev: DocsUserConfig) => DocsUserConfig),
) => void;

const defaultConfig: DocsUserConfig = {
  installationType: "cli",
  packageManager: "pnpm",
};

const docsConfigAtom = atomWithStorage<DocsUserConfig>(
  "taut-ui:config",
  defaultConfig,
  undefined,
  { getOnInit: false },
);

const subscribe = (): (() => void) => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

/**
 * Returns the persisted docs config. While hydrating it always returns the
 * default value so the first client render matches the server HTML, even if
 * the atom was already mounted (and read from storage) by another component.
 */
export function useConfig(): [DocsUserConfig, SetDocsConfig] {
  const [config, setConfig] = useAtom(docsConfigAtom);
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return [hydrated ? config : defaultConfig, setConfig];
}
