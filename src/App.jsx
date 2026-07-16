import { useRef } from "react";
import useMatrix from "./hooks/useMatrix";
import Terminal from "./Pages/terminal";
import Login from "./Pages/login";

function App() {

    const canvasRef = useRef(null);

    useMatrix(canvasRef);

    return (
        <>
            <canvas ref={canvasRef} id="canvas"></canvas>
            <Terminal />
            <section id="index-info">
                <p>IP: 127.0.0.1</p>
            </section>
        </>
    );
}

export default App;