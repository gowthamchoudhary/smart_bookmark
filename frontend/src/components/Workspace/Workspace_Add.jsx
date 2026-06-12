import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Workspace_Add.css";

const Workspace_Add = ({ title, bookmarks, id, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleUpdate(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Workspace name is required");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await onUpdate(id, name.trim());
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.detail);
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${title}"?`);

    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");
      await onDelete(id);
    } catch (err) {
      setError(err.response?.data?.detail || "Delete failed");
      setLoading(false);
    }
  }

  function openWorkspace() {
    navigate(`/workspace/${id}`);
  }

  return (
    <div className="workspace_node">
      <div className="user_workspace" id={id} onClick={openWorkspace}>
        <div className="workspace-options">
          <button
            type="button"
            className="options"
            onClick={(event) => {
              event.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            ...
          </button>

          {showOptions && (
            <div className="options-menu">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setName(title);
                  setIsEditing(true);
                  setShowOptions(false);
                }}
              >
                Update
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form
            className="workspace-edit-form"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleUpdate}
          >
            <input
              className="workspace-edit-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={loading}
              autoFocus
            />

            <div className="workspace-edit-actions">
              <button className="save-button" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                className="cancel-button"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="title">{title}</div>
        )}

        {error && <p className="workspace-error">{error}</p>}
        <div className="bookmarks">{bookmarks} bookmarks</div>
      </div>
    </div>
  );
};

export default Workspace_Add;
