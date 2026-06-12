import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { LuSearch } from "react-icons/lu";
import { PiCommandBold } from "react-icons/pi";
import Workspace_Add from "../../components/Workspace/Workspace_Add";
import { getWorkspaces, updateWorkspace } from "../../api/workspace";

import Recent_Bookmarks from "../../components/Recent_Bookmarks/Recent_Bookmarks";
import { createWorkspace } from "../../api/workspace";
// import { updateWorkspace } from "../../api/workspace";
import { deleteWorkspace } from "../../api/workspace";
import CreateBookmark from "../../components/CreateBookmark/CreateBookmark";
import Profile from "../../components/Profile/Profile";
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [showWorkspaceForm, setShowWorkspaceForm] = useState(false);
  const [creatingWorkspace, setCreatingWorkspace] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [bookmarkRefreshKey, setBookmarkRefreshKey] = useState(0);
  const [username, setUsername] = useState("");
  const [editingBookmark, setEditingBookmark] = useState(
    location.state?.editingBookmark || null,
  );
  const workspaceScrollRef = useRef(null);
  const searchInputRef = useRef(null);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredWorkspaces = normalizedQuery
    ? workspaces.filter((workspace) =>
        workspace.name.toLowerCase().includes(normalizedQuery),
      )
    : workspaces;
  const handleUserLoaded = useCallback((user) => {
    setUsername(user.username);
  }, []);
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

  useEffect(() => {
    const bookmark = location.state?.editingBookmark;
    if (!bookmark) return;

    navigate(location.pathname, { replace: true, state: null });
    requestAnimationFrame(() => {
      document
        .getElementById("bookmark-form-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    function focusSearch(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  function handleBookmarkEdit(bookmark) {
    setEditingBookmark(bookmark);
    requestAnimationFrame(() => {
      document
        .getElementById("bookmark-form-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  async function handleCreateWorkspace(event) {
    event.preventDefault();
    const trimmedName = workspaceName.trim();

    if (!trimmedName) {
      setError("Workspace name is required");
      return;
    }

    try {
      setCreatingWorkspace(true);
      setError("");
      const newWorkspace = await createWorkspace(trimmedName);
      setWorkspaces((current) => [...current, newWorkspace]);
      setWorkspaceName("");
      setShowWorkspaceForm(false);

      requestAnimationFrame(() => {
        workspaceScrollRef.current?.scrollTo({
          left: workspaceScrollRef.current.scrollWidth,
          behavior: "smooth",
        });
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setCreatingWorkspace(false);
    }
  }
  async function handleUpdateWorkspace(id, name) {
    const updatedWorkspace = await updateWorkspace(id, name);
    setWorkspaces((current) =>
      current.map((workspace) =>
        workspace.id === id ? updatedWorkspace : workspace,
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
        <Profile
          workspaceCount={workspaces.length}
          bookmarkRefreshKey={bookmarkRefreshKey}
          onUserLoaded={handleUserLoaded}
        />
        <div className="core-dashboard">
          <div className="top-bar">
            <div className="wish-data">
              <div className="main-wish">
                Hey There{username ? `, ${username}👋` : ""}!
              </div>
              <div className="sub-text">
                Here's what happening with your workspaces today.
              </div>
            </div>
            <div className="search-bar">
              {/* <Lusearch size={18} /> */}
              <LuSearch size={18} className="search-icon" />
              <input
                ref={searchInputRef}
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
          <div className="workspace-section">
            <div className="workspace-add-control">
              <div
                className="add_workspace"
                onClick={() => setShowWorkspaceForm(true)}
              >
                <div className="plus-btn">+</div>
                <p>New Workspace</p>
              </div>

              {showWorkspaceForm && (
                <form
                  className="workspace-form"
                  onSubmit={handleCreateWorkspace}
                >
                  <input
                    className="workspace_input"
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="Workspace Name"
                    autoFocus
                    disabled={creatingWorkspace}
                  />
                  <button
                    type="submit"
                    className="workspace-buttons"
                    disabled={creatingWorkspace}
                  >
                    {creatingWorkspace ? "Creating..." : "Create"}
                  </button>
                  <button
                    className="workspace-buttons"
                    type="button"
                    disabled={creatingWorkspace}
                    onClick={() => {
                      setShowWorkspaceForm(false);
                      setWorkspaceName("");
                    }}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>

            <div className="workspace-scroll" ref={workspaceScrollRef}>
              {!loading &&
                filteredWorkspaces.map((workspace) => (
                  <Workspace_Add
                    key={workspace.id}
                    id={workspace.id}
                    title={workspace.name}
                    bookmarks={workspace.bookmark_count}
                    onUpdate={handleUpdateWorkspace}
                    onDelete={handleDeleteWorkspace}
                  />
                ))}
              {!loading &&
                normalizedQuery &&
                filteredWorkspaces.length === 0 && (
                  <p className="no-search-results">No matching workspaces</p>
                )}
            </div>

            {/* <button
              type="button"
              className="more"
              aria-label="Scroll workspaces right"
              onClick={() =>
                workspaceScrollRef.current?.scrollBy({
                  left: 238,
                  behavior: "smooth",
                })
              }
            >
              <FiChevronRight />
            </button> */}
          </div>

          {loading && <p className="loading">Loading workspaces.....</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && workspaces.length === 0 && <p>No workspaces yet.</p>}
          <div className="bookmark-section">
            <Recent_Bookmarks
              refreshKey={bookmarkRefreshKey}
              workspaces={workspaces}
              query={query}
              onBookmarkEdit={handleBookmarkEdit}
              onBookmarkDeleted={(workspaceId) => {
                setBookmarkRefreshKey((current) => current + 1);
                setWorkspaces((current) =>
                  current.map((workspace) =>
                    workspace.id === workspaceId
                      ? {
                          ...workspace,
                          bookmark_count: Math.max(
                            0,
                            workspace.bookmark_count - 1,
                          ),
                        }
                      : workspace,
                  ),
                );
              }}
            />
            <CreateBookmark
              key={editingBookmark?.id || "create"}
              workspaces={workspaces}
              editingBookmark={editingBookmark}
              onCancelEdit={() => setEditingBookmark(null)}
              onUpdated={() => {
                setEditingBookmark(null);
                setBookmarkRefreshKey((current) => current + 1);
              }}
              onCreated={(workspaceId) => {
                setBookmarkRefreshKey((current) => current + 1);
                setWorkspaces((current) =>
                  current.map((workspace) =>
                    workspace.id === workspaceId
                      ? {
                          ...workspace,
                          bookmark_count: workspace.bookmark_count + 1,
                        }
                      : workspace,
                  ),
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
