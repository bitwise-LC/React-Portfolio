import useTypedText from "../hooks/useTypedText";

function Login() {

    const login = "root@LucaNeville";
    const password = "***********";
    const speed = 70;

    const loginText = useTypedText(login, speed);

    const passwordText = useTypedText(
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