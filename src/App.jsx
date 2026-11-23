import { useEffect, useState } from "react"
import { about, coursework, experience, profile, projects, skills } from "./content.js"
import "./index.css"

const featured = projects.filter((p) => p.kicker.startsWith("Featured"))

function Out({ href, className, children }) {
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
    const nodes = [...document.querySelectorAll(".reveal")]
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      nodes.forEach((node) => {
        node.style.opacity = "1"
        node.style.transform = "none"
      })
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const height = window.innerHeight
      const start = height * 0.98
      const end = height * 0.58
      const maxScroll = document.documentElement.scrollHeight - height
      const atEnd = maxScroll - window.scrollY < 12
      nodes.forEach((node) => {
        const top = node.getBoundingClientRect().top
        let progress = (start - top) / (start - end)
        if (atEnd && top < height) progress = 1
        progress = Math.min(1, Math.max(0, progress))
        node.style.opacity = progress.toFixed(3)
        node.style.transform = `translateY(${((1 - progress) * 36).toFixed(1)}px)`
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

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
              <Out className="btn" href={profile.resume}>
                Resume
              </Out>
              <Out className="btn" href={profile.linkedin}>
                LinkedIn
              </Out>
              <Out className="btn" href={profile.github}>
                GitHub
              </Out>
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
          <p className="section-label reveal">Start here</p>
          <div className="feature-grid">
            {featured.map((project) => (
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
                <p className="reveal" key={paragraph.slice(0, 24)}>{paragraph}</p>
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
                  {project.href ? (
                    <Out href={project.href}>GitHub</Out>
                  ) : null}
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
              <li className="reveal" key={point}>{point}</li>
            ))}
          </ul>
          <Out className="text-link reveal" href={experience.href}>
            Cone Crusaders code
          </Out>
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
            <Out href={`mailto:${profile.email}`}>{profile.email}</Out>
            <Out href={profile.linkedin}>LinkedIn</Out>
            <Out href={profile.github}>GitHub</Out>
            <Out href={profile.resume}>Resume PDF</Out>
          </div>
          <p className="fine reveal">
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
          {project.href ? <Out href={project.href}>Open the repository</Out> : null}
          <Out href={`mailto:${profile.email}`}>Email me about this</Out>
        </div>
      </article>
    </div>
  )
}
