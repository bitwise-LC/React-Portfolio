import { useState, useRef, useCallback, useEffect } from "react";

const DEFAULT_SPEED_MS = 60; // delay between characters
const DEFAULT_PAUSE_MS = 300; // beat after typing finishes, before onComplete fires

/**
 * Types a string into a controlled value one character at a time, then calls
 * onComplete(text) once fully typed and resets back to an empty value.
 *
 * Knows nothing about "commands" or "terminals" - it's a pure typing-effect
 * primitive that could animate any text field.
 */
export default function useTypewriter({
  onComplete,
  speed = DEFAULT_SPEED_MS,
  pauseBeforeComplete = DEFAULT_PAUSE_MS,
} = {}) {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Mirrors `isTyping` so long-lived closures (e.g. a command registry built
  // once via useRef) always read the CURRENT typing state instead of a
  // stale, first-render snapshot.
  const isTypingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const setTypingState = useCallback((typing) => {
    isTypingRef.current = typing;
    setIsTyping(typing);
  }, []);

  const type = useCallback((text) => {
    if (isTypingRef.current) return; // ignore overlapping animation requests

    setTypingState(true);
    setValue("");

    let charIndex = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      charIndex += 1;
      setValue(text.slice(0, charIndex));

      if (charIndex >= text.length) {
        clearInterval(timerRef.current);
        setTimeout(() => {
          onComplete?.(text);
          setValue("");
          setTypingState(false);
        }, pauseBeforeComplete);
      }
    }, speed);
  }, [onComplete, pauseBeforeComplete, setTypingState, speed]);

  return { value, setValue, isTyping, isTypingRef, type };
}