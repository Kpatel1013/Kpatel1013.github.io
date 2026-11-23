import { useEffect, useState } from "react"
import { about, coursework, experience, profile, projects, skills } from "./content.js"
import "./index.css"

const featured = projects.filter((p) => p.kicker.startsWith("Featured"))

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light" || saved === "dark") return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))]
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [openId, setOpenId] = useState(null)
  const open = projects.find((p) => p.id === openId) ?? null


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top">
          Keshav Patel
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button type="button" className="theme" onClick={toggleTheme} aria-label="Toggle color theme">
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Chicago · UIC computer science · May 2028</p>
            <h1>{profile.name}</h1>
            <p className="headline">{profile.headline}</p>
            <div className="actions">
              <a className="btn solid" href="#work">
                See the work
              </a>
              <a className="btn" href={profile.resume}>
                Resume
              </a>
              <a className="btn" href={profile.linkedin}>
                LinkedIn
              </a>
              <a className="btn" href={profile.github}>
                GitHub
              </a>
            </div>
          </div>
          <figure className="portrait">
            <img
              src="/headshot.jpg"
              alt="Keshav Patel"
              onError={(event) => {
                event.currentTarget.style.display = "none"
                event.currentTarget.nextElementSibling.hidden = false
              }}
            />
            <div className="monogram" hidden>
              KP
            </div>
            <figcaption>Computer science · robotics · retrieval</figcaption>
          </figure>
        </section>

        <section className="featured" id="featured">
          <p className="section-label">Start here</p>
          <div className="feature-grid">
            {featured.map((project) => (
              <button key={project.id} type="button" className="feature" onClick={() => setOpenId(project.id)}>
                <span>{project.kicker}</span>
                <strong>{project.title}</strong>
                <em>{project.blurb}</em>
              </button>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <p className="section-label">About</p>
          <div className="about-grid">
            <div>
              {about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <aside>
              <h2>Education</h2>
              <p>
                <strong>{profile.degree}</strong>
                <br />
                {profile.school}
                <br />
                {profile.grad}
              </p>
              <h3>Relevant coursework</h3>
              <ul>
                {coursework.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="work" id="work">
          <p className="section-label">Projects</p>
          <h2>What I have shipped</h2>
          <div className="cards">
            {projects.map((project) => (
              <article key={project.id} className="card">
                <header>
                  <span>{project.dates}</span>
                  <h3>{project.title}</h3>
                  <p>{project.blurb}</p>
                </header>
                <ul className="tags">
                  {project.stack.slice(0, 4).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="card-links">
                  <button type="button" onClick={() => setOpenId(project.id)}>
                    Read the story
                  </button>
                  {project.href ? (
                    <a href={project.href}>GitHub</a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience" id="experience">
          <p className="section-label">Experience</p>
          <div className="job">
            <div>
              <h2>{experience.role}</h2>
              <p>
                {experience.org} · {experience.place}
              </p>
            </div>
            <span>{experience.dates}</span>
          </div>
          <ul className="points">
            {experience.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <a className="text-link" href={experience.href}>
            Cone Crusaders code
          </a>
          <div className="skills">
            {skills.map((group) => (
              <p key={group.label}>
                <strong>{group.label}.</strong> {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="section-label">Contact</p>
          <h2>If the work fits, write me.</h2>
          <div className="contact-row">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.github}>GitHub</a>
            <a href={profile.resume}>Resume PDF</a>
          </div>
          <p className="fine">
            {profile.location} · {profile.phone}
          </p>
        </section>
      </main>

      {open ? <ProjectPanel project={open} onClose={() => setOpenId(null)} /> : null}
    </>
  )
}

function ProjectPanel({ project, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div className="scrim" onClick={onClose} role="presentation">
      <article className="panel" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="project-title">
        <button type="button" className="close" onClick={onClose}>
          Close
        </button>
        <p className="eyebrow">{project.kicker}</p>
        <h2 id="project-title">{project.title}</h2>
        <p className="dates">{project.dates}</p>
        <p className="lede">{project.overview}</p>
        <h3>How it works</h3>
        <ol>
          {project.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h3>What came of it</h3>
        <p>{project.outcome}</p>
        <h3>A decision worth knowing</h3>
        <p>{project.reflection}</p>
        <ul className="tags">
          {project.stack.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="panel-links">
          {project.href ? <a href={project.href}>Open the repository</a> : null}
          <a href={`mailto:${profile.email}`}>Email me about this</a>
        </div>
      </article>
    </div>
  )
}
