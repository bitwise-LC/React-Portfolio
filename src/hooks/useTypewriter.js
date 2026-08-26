import { useState, useRef, useCallback, useEffect } from "react";

const DEFAULT_SPEED_MS = 45; // delay between characters
const DEFAULT_PAUSE_MS = 300; // beat after typing finishes, before onComplete fires

/**
 * Types a string into a controlled value one character at a time, then calls
 * onComplete(text) once fully typed. By default resets back to an empty
 * value afterward (e.g. the terminal's input, ready for the next command) -
 * pass resetOnComplete: false to leave the finished text on screen instead
 * (e.g. a login-screen typing effect).
 *
 * Knows nothing about "commands" or "terminals" - it's a pure typing-effect
 * primitive that could animate any text field.
 */
export default function useTypewriter({
  onComplete,
  speed = DEFAULT_SPEED_MS,
  pauseBeforeComplete = DEFAULT_PAUSE_MS,
  resetOnComplete = true,
} = {}) {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Mirrors `isTyping` so long-lived closures (e.g. a command registry built
  // once via useRef) always read the CURRENT typing state instead of a
  // stale, first-render snapshot.
  const isTypingRef = useRef(false);
  const intervalRef = useRef(null);
  const startTimeoutRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(startTimeoutRef.current);
    clearInterval(intervalRef.current);
  }, []);

  const setTypingState = useCallback((typing) => {
    isTypingRef.current = typing;
    setIsTyping(typing);
  }, []);

  // startDelay lets a caller stagger several typewriters one after another
  // (e.g. a login line, then a password line) without managing its own
  // setTimeout - the hook owns and cleans up that timer just like the
  // interval it already manages.
  const type = useCallback((text, { startDelay = 0 } = {}) => {
    if (isTypingRef.current) return; // ignore overlapping animation requests

    clearTimeout(startTimeoutRef.current);
    startTimeoutRef.current = setTimeout(() => {
      setTypingState(true);
      setValue("");

      let charIndex = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        charIndex += 1;
        setValue(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            onComplete?.(text);
            if (resetOnComplete) {
              setValue("");
            }
            setTypingState(false);
          }, pauseBeforeComplete);
        }
      }, speed);
    }, startDelay);
  }, [onComplete, pauseBeforeComplete, resetOnComplete, setTypingState, speed]);

  return { value, setValue, isTyping, isTypingRef, type };
}