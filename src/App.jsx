import { useRef, useState } from "react";
import useMatrix from "./hooks/useMatrix";
import Terminal from "./Pages/terminal";
import Login from "./Pages/login";

function App() {
    const [screen, setScreen] = useState("login");

    const canvasRef = useRef(null);

    useMatrix(canvasRef);

    return (
        <>
            <canvas ref={canvasRef} id="canvas"></canvas>

            {screen === "login" && (
                <Login onEnter={() => setScreen("terminal")} />
            )}
            {screen === "terminal" && (
                <Terminal onLogout={() => setScreen("login")} />
            )}

            <section id="index-info">
                <p>IP: 127.0.0.1</p>
            </section>
        </>
    );
}

export default App;