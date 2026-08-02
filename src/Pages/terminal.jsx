import React, { useRef } from "react";
import useTerminalCommands from "../hooks/useCommands";
import useAutoScroll from "../hooks/useAutoScroll";

/**
 * Purely presentational: all command parsing, history, and typing-animation
 * logic lives in useTerminalCommands. This component just renders it.
 */
function Terminal() {
  const { history, input, isTyping, handleKeyDown, handleChange } = useTerminalCommands();
  const bottomRef = useAutoScroll([history]);
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current?.focus();

  return (
    <div onClick={focusInput} className="terminal border">
      {/* Already-submitted lines: static, non-interactive, never re-edited */}
      {history.map(({ id, command, output }) => (
        <div key={id}>
          {command !== "" && (
            <div className="submitted">
              <span>guest@portfolio:~$</span>{" "}
              <span>{command}</span>
            </div>
          )}
          {output}
        </div>
      ))}

      {/* The one live, editable line - always the newest line on screen */}
      <div className="editable">
        <span>guest@portfolio:~$</span>
        <input
          className="command-input"
          ref={inputRef}
          autoFocus
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={isTyping}
          spellCheck={false}
        />
        {isTyping && <span className="cursor-blink" aria-hidden="true" />}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

export default Terminal