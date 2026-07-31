import { useState, useRef, useEffect } from "react";

function useCommands() {
    
          const commands = useRef(buildCommandRegistry()).current;
     
      // `history` holds every line that has ALREADY been submitted.
      // Each entry is: { id, command, output }
      // Because we only ever *append* to this array (or wipe it on "clear"),
      // nothing that's already in history can be mutated after the fact.
      const [history, setHistory] = useState([]);
     
      // `input` is the ONLY editable piece of state - the current, not-yet-submitted line.
      const [input, setInput] = useState("");
     
      const bottomRef = useRef(null);
      const inputRef = useRef(null);
     
      // Auto-scroll to the newest line whenever history changes.
      useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: "end" });
      }, [history]);
     
      // Keep focus on the input no matter where the user clicks inside the terminal,
      // so it always feels like a real terminal window.
      const focusInput = () => inputRef.current?.focus();
     
      function handleKeyDown(e) {
        if (e.key !== "Enter") return;
     
        const trimmed = input.trim();
     
        // Pressing Enter on an empty line just drops to a new line,
        // exactly like a real shell - it does NOT get added as a "command" entry,
        // but we still want a visual blank line, so we push an empty-output entry.
        if (trimmed === "") {
          setHistory((prev) => [
            ...prev,
            { id: crypto.randomUUID(), command: "", output: null },
          ]);
          setInput("");
          return;
        }
     
        // "clear" wipes the whole terminal instead of appending anything.
        if (trimmed.toLowerCase() === "clear") {
          setHistory([]);
          setInput("");
          return;
        }
     
        // Look up the command. Unknown commands get an inline error output.
        const key = trimmed.toLowerCase();
        const renderOutput = commands[key];
        const output = renderOutput
          ? renderOutput()
          : (
            <p className="pl-2 text-red-400">
              command not found: {trimmed}
            </p>
          );
     
        // Freeze this line into history. Because this is a *new* object appended
        // to the array (not an edit of an existing one), previously rendered
        // lines are never touched again.
        setHistory((prev) => [
          ...prev,
          { id: crypto.randomUUID(), command: trimmed, output },
        ]);
        setInput("");
      }
}