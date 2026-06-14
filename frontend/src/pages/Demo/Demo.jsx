import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Demo.css";
import dashboard_img from "../../assets/dashboard.png";
import confused_icon from "../../assets/confused_duck.png";
import crossImage from "../../assets/cross.png";
import {
  FiArrowRight,
  FiCheck,
  FiMaximize2,
  FiMoreHorizontal,
} from "react-icons/fi";
import { FaFolder } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { SiHuggingface, SiOpenai } from "react-icons/si";
import { PiFilePdfBold } from "react-icons/pi";
import { TbLink } from "react-icons/tb";
import { BsCodeSlash } from "react-icons/bs";
import cloud_img from "../../assets/cloud.png";

const demoWorkspaces = [
  {
    title: "AI Research",
    bookmarks: 18,
    className: "demo-workspace-blue",
  },
  {
    title: "Design Inspiration",
    bookmarks: 12,
    className: "demo-workspace-purple",
  },
  {
    title: "Learning Hub",
    bookmarks: 24,
    className: "demo-workspace-green",
  },
  {
    title: "Startup Ideas",
    bookmarks: 9,
    className: "demo-workspace-peach",
  },
];

const Demo = () => {
  const navigate = useNavigate();
  const workspaceDemoRef = useRef(null);

  const scrollToDemoWorkspaces = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    workspaceDemoRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="demo-bg">
      <section className="demo-hero">
        <div className="hero-info">
          <h1>See MemoryOS in Action</h1>
          <h2>
            Explore how links, papers, videos, and ideas can be organized into a
            personal knowledge system.
          </h2>
          <h2>No signup required.</h2>
          <button type="button" onClick={scrollToDemoWorkspaces}>
            Explore Demo Workspace
            <FiArrowRight className="arrow" />
          </button>
        </div>
        <div className="dash-png">
          <img src={dashboard_img} alt="MemoryOS dashboard preview" />
        </div>
      </section>
      <section className="problem">
        <h1>
          The Problem <span>Vs</span> The Solution
        </h1>
        <h2 className="subtitle">
          We save more information than ever before, yet most of it becomes
          impossible to find when we need it.
        </h2>
        <div className="problem-layout">
          <div className="left sidelayout">
            <img
              src={confused_icon}
              className="confused-icon"
              alt="Confused character"
            />
            <div className="without-memory-content">
              <div className="layout-title">
                <span className="cross-badge">×</span>
                Without MemoryOS
              </div>
              <div className="without-memory-points">
                <div className="without-memory-point">
                  <img src={crossImage} alt="" />
                  <span>You save something valuable.</span>
                </div>
                <div className="without-memory-point">
                  <img src={crossImage} alt="" />
                  <span>A week later, you forget where you saved it.</span>
                </div>
                <div className="without-memory-point">
                  <img src={crossImage} alt="" />
                  <span>A month later, you search for it again.</span>
                </div>
                <div className="without-memory-point">
                  <img src={crossImage} alt="" />
                  <span>A year later, it might as well not exist.</span>
                </div>
              </div>
            </div>
            <div className="inner-layout">
              <div className="innerlayout-title">All Bookmarks</div>
              <div className="folders">
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>AI Research</span>
                </div>
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>Design Inspiration</span>
                </div>
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>Tutorials</span>
                </div>
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>Articles to Read</span>
                </div>
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>Startup Ideas</span>
                </div>
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>Later</span>
                </div>
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>Random Stuff</span>
                </div>
                <div className="folder-item">
                  <FaFolder size={16} className="save-data-icons" />
                  <span>Work</span>
                </div>
                <div className="folder-more">...and 47 more</div>
              </div>
            </div>
          </div>
          <div className="right sidelayout">
            <div className="with-memory-content">
              <div className="layout-title">
                <span className="check-badge">
                  <FiCheck />
                </span>
                With MemoryOS
              </div>
              <div className="with-memory-points">
                <div className="with-memory-point">
                  <span className="point-check">
                    <FiCheck />
                  </span>
                  <span>Every resource has a workspace.</span>
                </div>
                <div className="with-memory-point">
                  <span className="point-check">
                    <FiCheck />
                  </span>
                  <span>Every bookmark has context.</span>
                </div>
                <div className="with-memory-point">
                  <span className="point-check">
                    <FiCheck />
                  </span>
                  <span>Everything remains searchable and organized.</span>
                </div>
                <div className="with-memory-point">
                  <span className="point-check">
                    <FiCheck />
                  </span>
                  <span>Knowledge stays useful forever.</span>
                </div>
              </div>
            </div>
            <div className="inner-layout memory-workspace">
              <div className="memory-workspace-topbar">
                <span className="memory-workspace-logo">MEMORYOS</span>
                <div className="memory-workspace-actions">
                  <FiMoreHorizontal />
                  <FiMaximize2 />
                </div>
              </div>
              <div className="memory-workspace-heading">
                <RiRobot2Line className="workspace-icon" />
                <div>
                  <div className="workspace-name">AI &amp; Technology</div>
                  <div className="workspace-count">5 bookmarks</div>
                </div>
              </div>
              <div className="memory-workspace-divider"></div>
              <div className="bookmark-list">
                <div className="bookmark-row">
                  <SiOpenai />
                  <span>OpenAI</span>
                </div>
                <div className="bookmark-row">
                  <SiHuggingface />
                  <span>Hugging Face</span>
                </div>
                <div className="bookmark-row">
                  <PiFilePdfBold />
                  <span>Attention Is All You Need</span>
                </div>
                <div className="bookmark-row">
                  <TbLink />
                  <span>LangChain Docs</span>
                </div>
                <div className="bookmark-row">
                  <BsCodeSlash />
                  <span>Papers With Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bottom-fade-demo"></div>
      <section
        className="workspace-demo"
        id="demo-workspaces"
        ref={workspaceDemoRef}
      >
        <div className="workspace-demo-heading">
          <span className="workspace-demo-eyebrow">
            YOUR KNOWLEDGE, ORGANIZED
          </span>
          <h2 className="workspacesection-title">Demo Workspaces</h2>
          <p>
            Keep every useful link close, grouped by the projects and ideas that
            matter to you.
          </p>
        </div>
        <div className="demo-workspaces">
          {demoWorkspaces.map((workspace, index) => (
            <article
              className={`demo-workspace-card ${workspace.className}`}
              key={workspace.title}
              style={{ "--card-delay": `${index * 120}ms` }}
            >
              <span className="demo-workspace-handle"></span>
              <button
                className="demo-workspace-options"
                type="button"
                aria-label={`More options for ${workspace.title}`}
              >
                ...
              </button>
              <div className="demo-workspace-title">{workspace.title}</div>
              <div className="demo-workspace-count">
                {workspace.bookmarks} bookmarks
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer>
        <div className="inner-footer">
          <img
            src={cloud_img}
            className="footer-cloud footer-cloud-left"
            alt=""
          />
          <div className="footer-stars" aria-hidden="true">
            <span className="footer-star footer-star-1"></span>
            <span className="footer-star footer-star-2"></span>
            <span className="footer-star footer-star-3"></span>
            <span className="footer-star footer-star-4"></span>
            <span className="footer-star footer-star-5"></span>
          </div>
          <div className="sec-1">Build Your Personal Knowledge Hub</div>
          <div className="sec-2">Stop losing valuable information.</div>
          <div className="sec-3">Start organizing what matters.</div>
          <button
            className="create-button"
            type="button"
            onClick={() => navigate("/auth")}
          >
            Create Free Account
            <FiArrowRight className="create-button-arrow" />
          </button>
          <img
            src={cloud_img}
            className="footer-cloud footer-cloud-right"
            alt=""
          />
        </div>
      </footer>
    </div>
  );
};

export default Demo;
