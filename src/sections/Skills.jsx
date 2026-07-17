import { useState } from 'react'
import Header from '../components/Header'

const skills = [
    {
        title: "Frontend",
        items: ["├── HTML", "├── CSS", "├── JavaScript", "└── React"]
    },
    {
        title: "Backend",
        items: ["├── PHP", "├── Node.js", "├── MySQL", "└── PDO"]
    },
    {
        title: "Languages",
        items: ["├── C#", "├── Python", "├── JavaScript", "└── PHP"]
    },
    {
        title: "Tools",
        items: ["├── Git", "├── Linux", "└── Apache"]
    }
];

function Skills() {
    const [open, setOpen] = useState(null);

    return (
    <>
        <Header title="Skills"/>

        <section id="skills-section">

            {skills.map((category, index) => (

                <nav
                    className={`skill-box ${open === index ? "open" : ""}`}
                    key={category.title}
                >

                    <button
                        className="skill-header"
                        onClick={() =>
                            setOpen(open === index ? null : index)
                        }
                    >
                        <span>{open === index ? "▾" : "▸"}</span>
                        {category.title}
                    </button>

                    <hr />

                    <div className="skill-content">

                        {category.items.map(skill => (
                            <div className="skill-item" key={skill}>
                                {skill}
                            </div>
                        ))}

                    </div>

                </nav>

            ))}

        </section>
    </>
    )
}

export default Skills