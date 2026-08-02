import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a sentinel element at the bottom of a scroll
 * container. Scrolls it into view whenever any value in `deps` changes.
 */
export default function useAutoScroll(deps = []) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return bottomRef;
}