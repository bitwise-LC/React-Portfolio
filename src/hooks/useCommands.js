import React, { useRef, useCallback, useEffect } from "react";
import useCommandHistory from "./useCommandHistory";
import useTypewriter from "./useTypewriter";
import { buildCommandRegistry } from "../commands/Registry";
import useAutoScroll from "../hooks/useAutoScroll";


const EMPTY_COMMAND = "";
const CLEAR_COMMAND = "clear";

/**
 * The terminal's "engine": owns command parsing/execution and wires together
 * useCommandHistory (data) + useTypewriter (animation) + the command
 * registry (content). Terminal.jsx just renders whatever this returns.
 */
export default function useTerminalCommands() {
  const { history, appendLine, clearHistory } = useCommandHistory();

  // Built lazily, exactly once - avoids rebuilding the registry (and its JSX
  // factory functions) on every render.
  const commandsRef = useRef(null);

  // Shared "submit" logic - used for both a real Enter keypress and for the
  // typewriter once it finishes animating a command selected from "ls".
  const runCommand = useCallback((rawText) => {
    const trimmed = rawText.trim();

    if (trimmed === EMPTY_COMMAND) {
      appendLine(EMPTY_COMMAND, null);
      return;
    }

    if (trimmed.toLowerCase() === CLEAR_COMMAND) {
      clearHistory();
      return;
    }

    const key = trimmed.toLowerCase();
    const renderOutput = commandsRef.current[key];
    const output = renderOutput
      ? renderOutput()
      : React.createElement(
          "p",
          { className: "pl-2 text-red-400" },
          `command not found: ${trimmed}`
        );

    appendLine(trimmed, output);
  }, [appendLine, clearHistory]);

  const {
    value: input,
    setValue: setInput,
    isTyping,
    isTypingRef,
    type: typeAndRun,
  } = useTypewriter({ onComplete: runCommand });

  if (!commandsRef.current) {
    commandsRef.current = buildCommandRegistry(typeAndRun);
  }

  // Greet the user with the Home section as soon as the terminal mounts -
  // like an OS boot message, not a typed command: no "guest@portfolio:~$"
  // line, just the content itself. It still lives in `history`, so typing
  // "clear" wipes it exactly like any other entry. Runs exactly once.
  const hasAutoRunRef = useRef(false);
  useEffect(() => {
    if (hasAutoRunRef.current) return;
    hasAutoRunRef.current = true;
    const homeOutput = commandsRef.current.home();
    appendLine(EMPTY_COMMAND, homeOutput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = useCallback((e) => {
    // TEMP DEBUG - remove once things work:
    console.log("keydown fired:", e.key, "| isTyping:", isTypingRef.current, "| input:", JSON.stringify(input));
    if (e.key !== "Enter" || isTypingRef.current) return;
    console.log("running command:", JSON.stringify(input));
    runCommand(input);
    setInput("");
    useAutoScroll([history]);
  }, [input, isTypingRef, runCommand, setInput]);

  const handleChange = useCallback(
    (e) => setInput(e.target.value),
    [setInput]
  );

  return { history, input, isTyping, handleKeyDown, handleChange };
}