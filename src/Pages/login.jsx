import useTypewriter from "../hooks/useTypewriter";

function Login() {

    const login = "root@LucaNeville";
    const password = "***********";
    const speed = 70;

    const loginText = useTypewriter(login, speed);

    const passwordText = useTypewriter(
        password,
        speed,
        login.length * speed + 400
    );

    return (
        <section id="index-text">

            <h3>
                Login: {loginText}
            </h3>

            <h3>
                Password: {passwordText}
            </h3>

            <button>
                Enter
            </button>

        </section>
    );
}

export default Login;