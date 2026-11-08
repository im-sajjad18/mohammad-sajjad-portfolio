import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, AtSign, Github, Instagram, Linkedin, Menu, X, Mail, MoveUpRight, Sparkles } from 'lucide-react';
import { site } from './config/site';
import './styles.css';

const ease = [0.22, 1, 0.36, 1];
const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

function Header({ motionOn, setMotionOn }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const links = [['Work', '#work'], ['About', '#about'], ['Skills', '#skills'], ['Contact', '#contact']];
  return <header className="header">
    <a className="wordmark" href="#top" aria-label="Mohammad Sajjad home">MS<span>.</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
    <div className="header-actions">
      <button className="motion-toggle" onClick={() => setMotionOn(!motionOn)} aria-pressed={motionOn}><span className={motionOn ? 'toggle-dot on' : 'toggle-dot'} /> Motion {motionOn ? 'On' : 'Off'}</button>
      <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><div>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16}/></a>)}</div></motion.nav>}</AnimatePresence>
  </header>;
}

function App() {
  const prefersReduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(!prefersReduced);
  const [activeProject, setActiveProject] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const variants = motionOn ? reveal : { hidden: { opacity: 1 }, visible: { opacity: 1 } };
  return <div id="top" className={motionOn ? 'site motion-enabled' : 'site motion-disabled'}>
    <div className="grain" aria-hidden="true" />
    <div className="top-progress" style={{ transform: `scaleX(${scrolled ? 1 : 0.08})` }} />
    <Header motionOn={motionOn} setMotionOn={setMotionOn}/>
    <main>
      <section className="hero section-shell">
        <div className="hero-meta"><span><i className="status-dot"/> OPEN TO OPPORTUNITIES</span><span>{site.location}</span></div>
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={variants}>
          <p className="eyebrow">{site.role}</p>
          <h1>BUILDING IDEAS<br/>INTO <em>DIGITAL</em><br/>EXPERIENCES<span className="red-period">.</span></h1>
          <div className="hero-bottom">
            <p className="hero-intro">{site.intro}</p>
            <div className="hero-buttons"><a className="button button-primary" href="#work">Explore my work <MoveUpRight size={17}/></a><a className="button button-quiet" href="#contact">Get in touch <ArrowUpRight size={16}/></a></div>
          </div>
        </motion.div>
        <div className="hero-visual" aria-label="Portrait placeholder">
          <div className="portrait-frame"><img src={site.portrait} alt="Portrait of Mohammad Sajjad" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><div className="portrait-placeholder"><span className="portrait-monogram">MS<span>.</span></span><span className="portrait-caption">YOUR PORTRAIT<br/>WILL APPEAR HERE</span></div></div>
          <div className="visual-index">01 <span> / PERSONAL PORTFOLIO</span></div>
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        </div>
        <a className="scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
        <div className="hero-side-note">DESIGNING · LEARNING · BUILDING</div>
      </section>

      <section className="work-section section-shell" id="work">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-number">01 /</span> SELECTED WORK</p><h2>A LITTLE OF<br/><em>WHAT I DO.</em></h2></div><p className="section-aside">A growing collection of things I create, explore, and learn from.</p></div>
        <motion.button className="project-card" onClick={() => setActiveProject(true)} whileHover={motionOn ? { y: -5 } : {}} transition={{ duration: 0.3 }}>
          <div className="project-art"><div className="art-topline"><span>PERSONAL PROJECT / 01</span><span>CREATIVE EXPRESSION</span></div><div className="poetry-art"><span className="poetry-small">WORDS THAT FEEL LIKE</span><span className="poetry-big">FEELINGS<span>.</span></span><span className="poetry-script">Sajjad.words</span></div><div className="art-bottomline"><span>HINDI · URDU · POETRY</span><span>EST. PERSONAL CREATIVE PROJECT</span></div><div className="art-cross art-cross-a"/><div className="art-cross art-cross-b"/></div>
          <div className="project-info"><div><p className="project-category">{site.project.category}</p><h3>{site.project.title}</h3><p>{site.project.summary}</p></div><span className="project-arrow"><ArrowUpRight/></span></div>
        </motion.button>
        <div className="work-footnote"><span>01 PROJECT FEATURED</span><span>MORE WORK WILL BE ADDED AS IT’S BUILT.</span></div>
      </section>

      <section className="about-section section-shell" id="about">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-number">02 /</span> A LITTLE ABOUT ME</p><h2>CURIOUS BY<br/><em>NATURE.</em></h2></div><span className="about-stamp"><Sparkles size={17}/> ALWAYS<br/>LEARNING</span></div>
        <div className="about-grid"><p className="about-lead">I’m interested in how thoughtful technology can turn a simple idea into something useful, expressive, and real.</p><div className="about-detail"><p>{site.about}</p><a className="text-link" href="#contact">Let’s connect <ArrowUpRight size={15}/></a></div></div>
        <div className="education-card"><div className="education-label">EDUCATION</div><div><h3>{site.education.degree}</h3><p>{site.education.specialization}</p><span>{site.education.institution} · {site.education.location}</span></div><div className="education-date"><strong>{site.education.period}</strong><span>{site.education.cgpa}</span></div></div>
      </section>

      <section className="skills-section section-shell" id="skills">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-number">03 /</span> MY TOOLKIT</p><h2>LEARNING.<br/><em>BUILDING.</em></h2></div><p className="section-aside">Foundations I’m developing and tools I use along the way.</p></div>
        <div className="skills-layout"><div className="skill-group"><p className="skill-label">TECHNICAL SKILLS</p><div className="skill-list">{site.skills.map((skill, i) => <div className="skill-row" key={skill}><span className="skill-index">0{i + 1}</span><span>{skill}</span><ArrowUpRight size={16}/></div>)}</div></div><div className="skill-group tools-group"><p className="skill-label">TOOLS I USE</p><div className="tool-chips">{site.tools.map(tool => <span key={tool}>{tool}</span>)}</div><div className="learning-note"><span className="status-dot"/> CURRENTLY LEARNING, EXPERIMENTING & IMPROVING.</div></div></div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <p className="eyebrow"><span className="section-number">04 /</span> HAVE AN IDEA?</p><h2>LET’S MAKE<br/><em>IT HAPPEN.</em></h2>
        <div className="contact-bottom"><p>I’m open to learning opportunities, collaborations, and conversations about technology and creative ideas.</p><a className="email-link" href={`mailto:${site.email}`}><span>{site.email}</span><ArrowUpRight/></a></div>
        <div className="social-links"><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LINKEDIN <ArrowUpRight size={13}/></a><a href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={16}/> INSTAGRAM <ArrowUpRight size={13}/></a><a href={`mailto:${site.email}`}><Mail size={16}/> EMAIL <ArrowUpRight size={13}/></a></div>
      </section>
    </main>
    <footer className="footer section-shell"><a className="wordmark" href="#top">MS<span>.</span></a><span>© {new Date().getFullYear()} MOHAMMAD SAJJAD</span><a href="#top">BACK TO TOP ↑</a></footer>

    <AnimatePresence>{activeProject && <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && setActiveProject(false)}><motion.div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}><button className="dialog-close" onClick={() => setActiveProject(false)} aria-label="Close project details"><X/></button><p className="eyebrow">{site.project.category}</p><h3 id="dialog-title">{site.project.title}</h3><p>{site.project.description}</p><div className="dialog-meta"><span>ROLE <strong>{site.project.role}</strong></span><span>PLATFORM <strong>{site.project.platform}</strong></span></div><a className="button button-primary" href={site.project.url} target="_blank" rel="noreferrer">View Instagram project <ArrowUpRight size={16}/></a><p className="dialog-note">Project details are based on the information currently supplied. Additional metrics and outcomes have not been claimed.</p></motion.div></motion.div>}</AnimatePresence>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
