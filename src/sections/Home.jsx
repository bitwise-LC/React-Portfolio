import helloWorld from '../assets/helloWorld.txt?raw'

function Home() {
    return (
        <pre>{helloWorld + `
Hello world! My name is Luca.
Welcome to my terminal portfolio website!

Type "logout" to go back.
Type "help" to see available commands/sections.
Type "ls" to browse automatically through pages.
        `}</pre>
    )
}

export default Home