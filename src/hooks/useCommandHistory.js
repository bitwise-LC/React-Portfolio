import { useState, useCallback } from "react";

/**
 * Owns the list of already-submitted terminal lines.
 * Entries are only ever appended or wiped wholesale - never edited in place -
 * which is what keeps past lines immutable once they've been entered.
 */
export default function useCommandHistory() {
  const [history, setHistory] = useState([]);

  const appendLine = useCallback((command, output = null) => {
    setHistory((prev) => [
      ...prev,
      { id: crypto.randomUUID(), command, output },
    ]);
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, appendLine, clearHistory };
}