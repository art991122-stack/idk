import './run.css';
import logo from '../assets/Logo.svg';
import AVA from '../assets/Avatar-icon.svg';
import Phone from '../assets/Phone.svg';
import gPhone from '../assets/Green-Phone.svg';
import D from '../assets/Download.svg';
import cssI from '../assets/icons/css-icon.svg';
import htmlI from '../assets/icons/html-icon.svg';
import figmaI from '../assets/icons/figma-icon.svg';
import gitI from '../assets/icons/git-icon.svg';
import jsI from '../assets/icons/js-icon.svg';
import reactI from '../assets/icons/react-icon.svg';
import github_icon from '../assets/GitHub.svg';
import gmail_icon from '../assets/gmail_icon.svg';
import telegram_icon from '../assets/Telegram.svg';

import { useState, useEffect } from 'react';

function RenderHeader({ name }) {
  return (
    <div className='section-header'>
      <h2><span className='hash'>#</span>{name}</h2>
    </div>
  );
}

function test() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', tags: '' });

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
    setFormData({ title: '', desc: '', tags: '' });
    setIsModalOpen(true);
  }

  function startEdit(project) {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      desc: project.desc || '',
      tags: project.tags || ''
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingProject(null);
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    const fieldName = id.replace('p-', ''); 
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  }

  async function handleSave() {
    if (!formData.title.trim() || !formData.desc.trim()) {
      return;
    }

    try {
      if (editingProject) {
        const response = await fetch(`http://localhost:3000/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updated = await response.json();
        setProjects(projects.map(p => p.id === editingProject.id ? updated : p));
      } else {
        const response = await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const saved = await response.json();
        setProjects([...projects, saved]);
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    const originalProjects = [...projects];
    setProjects(projects.filter(p => p.id !== id));

    try {
      await fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error);
      setProjects(originalProjects);
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
            <img src={gPhone} alt="" className="green-phone" />
            Contact me
          </a>
        </div>

        <section id="skills">
          <RenderHeader name="Skills" />
          <div className="ppp">
            <div className="skill-card"><img src={htmlI} alt="" className="skill-icon" /><div className="skill-name">HTML</div><div className="skill-role">Markup</div><div className="skill-level"><span></span></div></div>
            <div className="skill-card"><img src={cssI} alt="" className="skill-icon" /><div className="skill-name">CSS</div><div className="skill-role">Styling</div><div className="skill-level"><span></span></div></div>
            <div className="skill-card"><img src={jsI} alt="" className="skill-icon" /><div className="skill-name">JS</div><div className="skill-role">Logic</div><div className="skill-level"><span></span></div></div>
            <div className="skill-card"><img src={reactI} alt="" className="skill-icon" /><div className="skill-name">REACT</div><div className="skill-role">Frontend</div><div className="skill-level"><span></span></div></div>
            <div className="skill-card"><img src={gitI} alt="" className="skill-icon" /><div className="skill-name">GIT</div><div className="skill-role">Versioning</div><div className="skill-level"><span></span></div></div>
            <div className="skill-card"><img src={figmaI} alt="" className="skill-icon" /><div className="skill-name">FIGMA</div><div className="skill-role">Design</div><div className="skill-level"><span></span></div></div>
          </div>
        </section>

        <section id="experience">
          <RenderHeader name="Experience" />
          <div className="timeline">
            <div className="exp-card">
              <div className="exp-top">
                <h3 className="exp-title">Mancho School intensive</h3>
                <span className="exp-date">Jun 2026 – Jul 2026</span>
              </div>
              <p className="exp-role">Frontend developer</p>
              <p className="exp-desc">Developed a portfolio website and participated in a hackathon on a free topic.</p>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <RenderHeader name="Projects" />
          <div className="projects-toolbar">
            <button className="btn btn-primary LLL" id="openAddModal" onClick={startCreate}>
              + New project
            </button>
            <div className="projects-list LLL" id="projectsGrid">
              
              {projects.map(project => (
                <div key={project.id} className="project-card" onClick={() => startEdit(project)}>
                  <div className="project-card-content">
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-desc">{project.desc}</p>
                    {project.tags && (
                      <div className="project-tags">
                        {project.tags.split(',').map((tag, i) => (
                          <span key={i} className="tag">{tag.trim()}</span>
                        ))}
                      </div>
                    )}
                    <button className="btn-delete" onClick={(e) => handleDelete(project.id, e)}>✕</button>
                  </div>
                </div>
              ))}

              <div className="project-card" onClick={startCreate}>
                <div className="project-card add" id="addTitle">
                  <div className="plus">+</div>
                  <div className="add-text">Add new project</div>
                </div>
              </div>

            </div>
          </div>
        </section>
        <section id="contacts">
          <RenderHeader name="Contacts" />
          <div className="contact-grid">
            <a className="contact" href="mailto:art991122@gmail.com">
              <div className="contact-icon"><img src={gmail_icon} alt="Email icon" /></div>
              <div className="contact-info">
                <div className="gmail">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">art991122@gmail.com</span>
                </div>
              </div>
            </a>
            <a className="contact" href="https://t.me" target="_blank" rel="noreferrer">
              <div className="contact-icon"><img src={telegram_icon} alt="Telegram icon" /></div>
              <div className="contact-info">
                <div className="Telegram">
                  <span className="contact-label">Telegram</span>
                  <span className="contact-value">@Dmdmwm</span>
                </div>
              </div>
            </a>
            <a className="contact" href="https://github.com" target="_blank" rel="noreferrer">
              <div className="contact-icon"><img src={github_icon} alt="GitHub icon" /></div>
              <div className="contact-info">
                <div className="GitHub">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">art991122-stack</span>
                </div>
              </div>
            </a>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-backdrop open" id="modal">
          <div className="modal">
            <h3 id="modalTitle">{editingProject ? 'Edit project' : 'New project'}</h3>

            <div className="field">
              <label htmlFor="p-title">Title</label>
              <input 
                id="p-title" 
                type="text" 
                placeholder="My cool project" 
                maxLength={60} 
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="p-desc">Short description</label>
              <textarea 
                id="p-desc" 
                placeholder="What does it do?" 
                maxLength={160}
                value={formData.desc}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="field">
              <label htmlFor="p-tags">Tags (comma separated)</label>
              <input 
                id="p-tags" 
                type="text" 
                placeholder="HTML, CSS, JavaScript" 
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" id="cancelBtn" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" id="saveBtn" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default test;
