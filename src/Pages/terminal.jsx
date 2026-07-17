import Home from '../sections/Home'
import Help from '../sections/Help'
import About from '../sections/About'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Contact from '../sections/Contact'

function Terminal() {
    return (
        <main className="terminal border">
            <div id="terminal-output">
                <Home />
                <Help />
                <About />
                <Projects />
                <Skills />
                <Experience />
                <Contact />
            </div>
        </main>
    )
}

export default Terminal