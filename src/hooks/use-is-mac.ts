import { useEffect, useState } from "react";

export function useIsMac(): boolean {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/MAC|IPHONE|IPAD|IPOD/i.test(navigator.platform));
  }, []);

  return isMac;
}
