import { type RefObject, useEffect } from "react";

const DEFAULT_OBSERVER_OPTIONS: MutationObserverInit = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};

export function useMutationObserver(
  targetRef: RefObject<HTMLElement | null>,
  onMutation: MutationCallback,
  options: MutationObserverInit = DEFAULT_OBSERVER_OPTIONS,
): void {
  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const observer = new MutationObserver(onMutation);
    observer.observe(node, options);

    return () => observer.disconnect();
  }, [targetRef, onMutation, options]);
}
