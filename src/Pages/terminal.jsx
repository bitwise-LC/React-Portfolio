import React, { useRef } from "react";
import useTerminalCommands from "../hooks/useCommands";

/**
 * Purely presentational: all command parsing, history, and typing-animation
 * logic lives in useTerminalCommands. This component just renders it.
 */
function Terminal() {
  const { history, input, isTyping, handleKeyDown, handleChange } = useTerminalCommands();
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="terminal border">
      {/* Already-submitted lines: static, non-interactive, never re-edited */}
      {history.map(({ id, command, output }) => (
        <div key={id}>
          {command !== "" && (
            <div className="submitted">
              <span>[Luca@linux ~]$</span>{" "}
              <span>{command}</span>
            </div>
          )}
          {output}
        </div>
      ))}

      {/* The one live, editable line - always the newest line on screen */}
      <div className="editable">
        <span>[Luca@linux ~]$</span>
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
      <div/>
    </div>
  );
}

export default Terminal