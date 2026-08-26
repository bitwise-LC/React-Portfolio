import { useState, useEffect } from "react";

const DEFAULT_SPEED_MS = 50;

/**
 * Types `text` out automatically, starting after `startDelay` ms, and
 * returns the progressively-revealed string for direct use in JSX.
 *
 * Unlike useTypewriter (which is a manually-triggered animation used by the
 * terminal's command engine), this one is a passive display effect: give it
 * text, get back a string that grows over time.
 */
function useTypedText(text, speed = DEFAULT_SPEED_MS, startDelay = 0) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    let charIndex = 0;
    let intervalId;

    const startTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayedText(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return displayedText;
}

export default useTypedText