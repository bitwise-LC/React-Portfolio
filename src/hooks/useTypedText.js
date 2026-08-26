import { useState, useEffect } from "react";

const DEFAULT_SPEED_MS = 50;

/**
 * Types `text` out one character at a time, but only once `enabled` is
 * true - useful for "don't start until the user does something" flows.
 * Starts (or restarts) from scratch whenever `enabled` flips true.
 *
 * Returns { text, isDone } - the progressively-revealed string for direct
 * use in JSX, plus a flag that flips to true once fully typed.
 */
export default function useTypedText(
  text,
  speed = DEFAULT_SPEED_MS,
  { startDelay = 0, enabled = true } = {}
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    if (!enabled) return; // stay blank/idle until enabled

    let charIndex = 0;
    let intervalId;

    const startTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayedText(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(intervalId);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay, enabled]);

  return { text: displayedText, isDone };
}