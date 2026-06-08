import { useState, useEffect } from "react";
import "./Dashboard.css";

import { LuSearch } from "react-icons/lu";
import { PiCommandBold } from "react-icons/pi";
import Workspace_Add from "../../components/Workspace/Workspace_Add";
import robot from "../../assets/robot.png";
import bulb from "../../assets/bulb.png";
import palete from "../../assets/pallete.png";
import { FiChevronRight } from "react-icons/fi";
import { getWorkspaces, updateWorkspace } from "../../api/workspace";

import Recent_Bookmarks from "../../components/Recent_Bookmarks/Recent_Bookmarks";
import { createWorkspace } from "../../api/workspace";
// import { updateWorkspace } from "../../api/workspace";
import { deleteWorkspace } from "../../api/workspace";
const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [showWorkspaceForm, setShowWorkspaceForm] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  useEffect(() => {
    async function loadWorkspaces() {
      setError("");
      setLoading(true);
      try {
        const data = await getWorkspaces();
        setWorkspaces(data);
      } catch (err) {
        setError(err.message || "Failed to load workspaces");
      } finally {
        setLoading(false);
      }
    }
    loadWorkspaces();
  }, []);
  async function handleCreateWorkspace() {
    try {
      setLoading(true);
      setError("");
      const newWorkspace = await createWorkspace(workspaceName.trim());
      setWorkspaces((current) => [...current, newWorkspace]);
      setWorkspaceName("");
      setShowWorkspaceForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleUpdateWorkspace(id, name) {
    const updateWorkspace = await updateWorkspace(id, name);
    setWorkspaces((current) =>
      current.map((workspace) =>
        workspace.id === id ? updateWorkspace : workspace,
      ),
    );
  }
  async function handleDeleteWorkspace(id) {
    await deleteWorkspace(id);
    setWorkspaces((current) =>
      current.filter((workspace) => workspace.id !== id),
    );
  }

  return (
    <div className="dashboard-bg">
      <div className="inner-bg">
        <div className="dashboard_logo logo">
          Memory<span id="OS_part">OS</span>
        </div>
        <div className="core-dashboard">
          <div className="top-bar">
            <div className="wish-data">
              <div className="main-wish">Hey There!👋</div>
              <div className="sub-text">
                Here's what happening with your workspaces today.
              </div>
            </div>
            <div className="search-bar">
              {/* <Lusearch size={18} /> */}
              <LuSearch size={18} className="search-icon" />
              <input
                type="text"
                placeholder="search memory..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div className="command-icons">
                <PiCommandBold size={14} />
                <span>K</span>
              </div>
            </div>
          </div>
          <div className="workspace-node">
            <div
              className="add_workspace"
              onClick={() => setShowWorkspaceForm(true)}
            >
              <div className="plus-btn">+</div>
              <p>New Workspace</p>
            </div>
            {showWorkspaceForm && (
              <form onSubmit={handleCreateWorkspace}>
                <input
                className="workspace_input"
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Workspace Name"
                />
                <button type="submit" className="workspace-buttons">
                  Create
                </button>
                <button
                  className="workspace-buttons"
                  type="button"
                  onClick={() => {
                    setShowWorkspaceForm(false);
                    setWorkspaceName("");
                  }}
                >
                  Cancel
                </button>
              </form>
            )}
            {loading && <p className="loading">Loading workspaces.....</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && workspaces.length === 0 && (
              <p>No workspaces yet.</p>
            )}
            {!loading &&
              !error &&
              workspaces.map((workspace) => (
                <Workspace_Add
                  key={workspace.id}
                  id={workspace.id}
                  title={workspace.name}
                  bookmarks="0"
                  color="pink"
                  image={robot}
                  onUpdate={handleUpdateWorkspace}
                  onDelete={handleDeleteWorkspace}
                />
              ))}

            <div className="more">
              {" "}
              <FiChevronRight />
            </div>
          </div>
          <Recent_Bookmarks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
