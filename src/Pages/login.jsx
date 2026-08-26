import { useState, useEffect } from "react";
import useTypedText from "../hooks/useTypedText";

const SPEED_MS = 70;
const PAUSE_BETWEEN_LINES_MS = 400;
const PAUSE_BEFORE_ENTER_MS = 500;

/**
 * Login screen: fields stay blank until the user clicks "Enter". That click
 * kicks off the login line typing, then the password line (staggered after
 * it), and once both finish, automatically calls onEnter - the parent
 * decides what that means (e.g. switching to the terminal).
 */
function Login({ onEnter }) {

    const login = "root@LucaNeville";
    const password = "***********";

    const [started, setStarted] = useState(false);

    const { text: loginText, isDone: loginDone } = useTypedText(
        login,
        SPEED_MS,
        { enabled: started }
    );

    const { text: passwordText, isDone: passwordDone } = useTypedText(
        password,
        SPEED_MS,
        {
            enabled: started,
            startDelay: login.length * SPEED_MS + PAUSE_BETWEEN_LINES_MS,
        }
    );

    const bothDone = started && loginDone && passwordDone;

    // Once both lines finish, wait a short beat so the user can actually
    // see the completed screen, then hand off to the parent.
    useEffect(() => {
        if (!bothDone) return;

        const timeoutId = setTimeout(() => {
            onEnter?.();
        }, PAUSE_BEFORE_ENTER_MS);

        return () => clearTimeout(timeoutId);
    }, [bothDone, onEnter]);

    const handleEnterClick = () => {
        if (started) return; // ignore repeat clicks once already running
        setStarted(true);
    };

    return (
        <section id="index-text">

            <h3>
                Login: {loginText}
            </h3>

            <h3>
                Password: {passwordText}
            </h3>

            <button
                type="button"
                disabled={started}
                onClick={handleEnterClick}
            >
                Enter
            </button>

        </section>
    );
}

export default Login;