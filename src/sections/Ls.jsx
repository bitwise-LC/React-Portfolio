import React from "react";

/**
 * Renders one clickable button per available command. `onSelectCommand`
 * plays the typing animation and then submits - clicking a button behaves
 * exactly like typing that command and pressing Enter.
 */
function Ls({ commands, onSelectCommand }) {
  return (
    <div className="ls-navbar">
      {Object.keys(commands)
        .filter((cmd) => cmd !== "ls") // no point listing "ls" inside "ls"
        .map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="ls-item"
            onClick={() => onSelectCommand(cmd)}
          >
            {cmd}
          </button>
        ))}
    </div>
  );
}

export default Ls