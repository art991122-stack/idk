import './run.css';
import logo from '../assets/Logo.svg';
import AVA from '../assets/Avatar-icon.svg';
import Phone from '../assets/Phone.svg';
import gPhone from '../assets/Green-phone.svg';
import D from '../assets/Download.svg';
import htmlI from '../assets/html-icon.svg';
import cssI from '../assets/css-icon.svg';
import jsI from '../assets/js-icon.svg';
import gitI from '../assets/git-icon.svg';
import figmaI from '../assets/figma-icon.svg';
import reactI from '../assets/react-icon.svg';
import github_icon from '../assets/GitHub.svg';
import gmail_icon from '../assets/gmail_icon.svg';
import telegram_icon from '../assets/Telegram.svg';
import Pen from '../assets/Pen.svg';
import PenWhite from '../assets/Pen-white.svg';
import Trash from '../assets/Trash.svg';
import TrashDanger from '../assets/Trash-danger.svg';
import { useState, useEffect } from 'react';

function Header({ name }) {
  return (
    <div className="section-header">
      <h2><span className="hash">#</span>{name}</h2>
    </div>
  );
}

function Run() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' });

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('http://localhost:3000/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  function startCreate() {
    setEditingProject(null);
    setFormData({ title: '', description: '', tags: '' });
    setIsModalOpen(true);
  }

  function startEdit(project) {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      tags: project.tags ? project.tags.join(', ') : ''
    });
    setIsModalOpen(true);
  }

  async function handleDelete(id) {
    const originalProjects = [...projects];
    setProjects(projects.filter(p => p.id !== id));
    try {
      await fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error);
      setProjects(originalProjects);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    const formattedData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };
    try {
      if (editingProject) {
        const response = await fetch(`http://localhost:3000/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
        });
        const updated = await response.json();
        setProjects(projects.map(p => p.id === editingProject.id ? updated : p));
      } else {
        const response = await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
        });
        const saved = await response.json();
        setProjects([...projects, saved]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="bg">
        <div className="orb a"></div>
        <div className="orb b"></div>
        <div className="orb c"></div>
      </div>
      <header className="havbar">
        <div className="container">
          <div className="havbar-inner">
            <img src={logo} alt="logo" />
            <button className="nav-toggle" id="menuBtn">☰</button>
            <ul className="nav-links" id="navlinks">
              <li><a href="#about">about</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contacts">Contacts</a></li>
            </ul>
          </div>
        </div>
      </header>
      <main className="container">
        <section id="about" className="hero">
          <div>
            <h1>Hi, I'm <span className="gradient">Artem Khegai</span></h1>
            <p className="role"><span>IT programming</span></p>
            <p>
              Passionate about creating beautiful, functional web experiences. I
              specialize in modern frontend technologies and love bringing designs
              to life through clean, efficient code.
            </p>
          </div>
          <div className="avatar-card">
            <div className="avatar-inner">
              <div className="avatar-placeholder">
                <img src={AVA} alt="AVA" />
              </div>
            </div>
          </div>
        </section>
        <div className="buttons">
          <a className="btn btn-download" href="#" id="downloadCv">
            <img src={D} alt="" /> Download CV
          </a>
          <a className="btn btn-contacts" href="#contacts">
            <img src={Phone} alt="" className="default-phone" />
            <img src={gPhone} alt="" className="green-phone" /> Contact me
          </a>
        </div>
        <section id="skills">
          <Header name="Skills" />
          <div className="ppp">
            <div className="skill-card">
              <img src={htmlI} alt="" className="skill-icon" />
              <div className="skill-name">HTML</div>
              <div className="skill-role">Markup</div>
              <div className="skill-level"><span></span></div>
            </div>
            <div className="skill-card">
              <img src={cssI} alt="" className="skill-icon" />
              <div className="skill-name">CSS</div>
              <div className="skill-role">Styling</div>
              <div className="skill-level"><span></span></div>
            </div>
            <div className="skill-card">
              <img src={jsI} alt="" className="skill-icon" />
              <div className="skill-name">JS</div>
              <div className="skill-role">Logic</div>
              <div className="skill-level"><span></span></div>
            </div>
            <div className="skill-card">
              <img src={reactI} alt="" className="skill-icon" />
              <div className="skill-name">REACT</div>
              <div className="skill-role">Frontend</div>
              <div className="skill-level"><span></span></div>
            </div>
            <div className="skill-card">
              <img src={gitI} alt="" className="skill-icon" />
              <div className="skill-name">GIT</div>
              <div className="skill-role">Versioning</div>
              <div className="skill-level"><span></span></div>
            </div>
            <div className="skill-card">
              <img src={figmaI} alt="" className="skill-icon" />
              <div className="skill-name">FIGMA</div>
              <div className="skill-role">Design</div>
              <div className="skill-level"><span></span></div>
            </div>
          </div>
        </section>
        <section id="experience">
          <Header name="Experience" />
          <div className="timeline">
            <div className="exp-card">
              <div className="exp-top">
                <h3 className="exp-title">Mancho School intensive</h3>
                <span className="exp-date">Jun 2026 – Jul 2026</span>
              </div>
              <p className="exp-role">Frontend developer</p>
              <p className="exp-desc">
                Developed a portfolio website and participated in a hackathon on a free topic.
              </p>
            </div>
          </div>
        </section>
        <section id="projects" className="projects-section">
          <Header name="Projects" />
          <div className="projects-toolbar">
            <button className="btn btn-primary LLL" id="openAddModal" onClick={startCreate}>
              + New project
            </button>
            <div className="projects-list LLL" id="projectsGrid">

              {projects.map(project => (
                <div className="project-card" key={project.id}>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="project-tools">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tool">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="actions">
                    <button className="icon-btn" onClick={() => startEdit(project)}>
                      <img src={Pen} alt="" className="icon-default" />
                      <img src={PenWhite} alt="" className="icon-hover" />
                    </button>
                    <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(project.id)}>
                      <img src={Trash} alt="" className="icon-default" />
                      <img src={TrashDanger} alt="" className="icon-hover" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="project-card add" id="addTitle" onClick={startCreate}>
                <div className="plus">+</div>
                <div className="add-text">Add new project</div>
              </div>

            </div>
          </div>
        </section>  
        <section id="contacts">
          {<Header name="Contacts" />}
          <div className="contact-grid">
            <a className="contact" href="#none">
              <div className="contact-icon">
                <img src={gmail_icon} alt="Email icon" />
              </div>
              <div className="contact-info">
                <div className="gmail">
                  <span className="contact-label">Email </span>
                  <span className="contact-value">art991122@gmail.com</span>
                </div>
              </div>
            </a>
            <a className="contact" href="#none">
              <div className="contact-icon">
                <img src={telegram_icon} alt="Telegram icon" />
              </div>
              <div className="contact-info">
                <div className="Telegram">
                  <span className="contact-label">Telegram </span>
                  <span className="contact-value">@Dmdmwm</span>
                </div>
              </div>
            </a>
            <a className="contact" href="#none">
              <div className="contact-icon">
                <img src={github_icon} alt="GitHub icon" />
              </div>
              <div className="contact-info">
                <div className="GitHub">
                  <span className="contact-label">GitHub </span>
                  <span className="contact-value">art991122-stack</span>
                </div>
              </div>
            </a>
          </div>
        </section>
      </main>

      <div className={`modal-backdrop ${isModalOpen ? 'open' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h3 id="modalTitle">{editingProject ? 'Edit project' : 'New project'}</h3>
          <form onSubmit={handleSave}>
            <div className="field">
              <label htmlFor="p-title">Title</label>
              <input
                id="p-title"
                type="text"
                placeholder="My cool project"
                maxLength={60}
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="p-desc">Short description</label>
              <textarea
                id="p-desc"
                placeholder="What does it do?"
                maxLength={160}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="field">
              <label htmlFor="p-tags">Tags (comma separated)</label>
              <input
                id="p-tags"
                type="text"
                placeholder="HTML, CSS, JavaScript"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" id="cancelBtn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" id="saveBtn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Run;
