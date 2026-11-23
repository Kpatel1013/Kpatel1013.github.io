import { useEffect, useState } from "react"
import { about, coursework, experience, profile, projects, skills } from "./content.js"
import "./index.css"

const featuredProjects = projects.filter((project) => project.featured)

function ExternalLink({ href, className, children }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light" || saved === "dark") return saved

    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (systemIsDark) return "dark"
    return "light"
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  function toggleTheme() {
    if (theme === "dark") setTheme("light")
    else setTheme("dark")
  }

  return [theme, toggleTheme]
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [openId, setOpenId] = useState(null)
  const [photoOk, setPhotoOk] = useState(true)
  const openProject = projects.find((project) => project.id === openId)

  // Fade each block in once it scrolls onto the screen.
  useEffect(() => {
    const blocks = document.querySelectorAll(".reveal")
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show")
      })
    })

    blocks.forEach((block) => observer.observe(block))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (openProject) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [openProject])

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
              <ExternalLink className="btn" href={profile.resume}>
                Resume
              </ExternalLink>
              <ExternalLink className="btn" href={profile.linkedin}>
                LinkedIn
              </ExternalLink>
              <ExternalLink className="btn" href={profile.github}>
                GitHub
              </ExternalLink>
            </div>
          </div>
          <figure className="portrait">
            {photoOk ? (
              <img src="/headshot.jpg" alt="Keshav Patel" onError={() => setPhotoOk(false)} />
            ) : (
              <div className="monogram">KP</div>
            )}
            <figcaption>Computer science · robotics · retrieval</figcaption>
          </figure>
        </section>

        <section className="featured" id="featured">
          <p className="section-label reveal">Start here</p>
          <div className="feature-grid">
            {featuredProjects.map((project) => (
              <button key={project.id} type="button" className="feature reveal" onClick={() => setOpenId(project.id)}>
                <span>{project.kicker}</span>
                <strong>{project.title}</strong>
                <em>{project.blurb}</em>
              </button>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <p className="section-label reveal">About</p>
          <div className="about-grid">
            <div>
              {about.map((paragraph) => (
                <p className="reveal" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <aside className="reveal">
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
          <p className="section-label reveal">Projects</p>
          <h2 className="reveal">What I have shipped</h2>
          <div className="cards">
            {projects.map((project) => (
              <article key={project.id} className="card reveal">
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
                  {project.href ? <ExternalLink href={project.href}>GitHub</ExternalLink> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience" id="experience">
          <p className="section-label reveal">Experience</p>
          <div className="job reveal">
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
              <li className="reveal" key={point}>
                {point}
              </li>
            ))}
          </ul>
          <ExternalLink className="text-link reveal" href={experience.href}>
            Cone Crusaders code
          </ExternalLink>
          <div className="skills">
            {skills.map((group) => (
              <p className="reveal" key={group.label}>
                <strong>{group.label}.</strong> {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="section-label reveal">Contact</p>
          <h2 className="reveal">If the work fits, write me.</h2>
          <div className="contact-row reveal">
            <ExternalLink href={`mailto:${profile.email}`}>{profile.email}</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.resume}>Resume PDF</ExternalLink>
          </div>
          <p className="fine reveal">
            {profile.location} · {profile.phone}
          </p>
        </section>
      </main>

      {openProject ? <ProjectPanel project={openProject} onClose={() => setOpenId(null)} /> : null}
    </>
  )
}

function ProjectPanel({ project, onClose }) {
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [onClose])

  return (
    <div className="scrim" onClick={onClose}>
      <article className="panel" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="close" onClick={onClose}>
          Close
        </button>
        <p className="eyebrow">{project.kicker}</p>
        <h2>{project.title}</h2>
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
          {project.href ? <ExternalLink href={project.href}>Open the repository</ExternalLink> : null}
          <ExternalLink href={`mailto:${profile.email}`}>Email me about this</ExternalLink>
        </div>
      </article>
    </div>
  )
}
