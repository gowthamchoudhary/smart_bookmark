import "./Demo.css";
import dashboard_img from "../../assets/dashboard.png";
import { FiArrowRight } from "react-icons/fi";
const Demo = () => {
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
          <button>
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
          The Problem <span>Vs</span> Solution
        </h1>
        <div className="problem-layout">
          <div className="left">
            500+ browser bookmarks <br />
            20+ open tabs <br />
            Saved posts everywhere <br /> Nothing is organized
          </div>
          <div className="right">
            Everything organized into workspaces <br />
            Search instantly <br />
            Store notes <br />
            Group related resources
          </div>
        </div>
      </section>
      <section className="workspace-demo">
        <div className="workspacesection-title">Demo Workspace</div>
        <div className="demo-workspaces"></div>
      </section>
      <footer>
        <div className="sec-1">Build Your Personal Knowledge Hub</div>
        <div className="sec-2">Stop losing valuable information.</div>
        <div className="sec-3">Start organizing what matters.</div>
        <button className="create-button">Create Free Account</button>
      </footer>
    </div>
  );
};

export default Demo;
