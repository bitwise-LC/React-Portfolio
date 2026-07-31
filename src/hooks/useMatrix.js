import { useEffect } from "react";

function useMatrix(canvasRef, color = "#ff7b00") {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const numbers = "01"/*abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*/;
        const matrix = numbers.split("");
        const fontSize = 20;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        function drawMatrixRain() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.font = fontSize + "px monospace";
            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (
                    drops[i] * fontSize > canvas.height &&
                    Math.random() > 0.975
                ) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            setTimeout(() => {
                requestAnimationFrame(drawMatrixRain);
            }, 40);
        }
        drawMatrixRain();
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }, []);
}

export default useMatrix