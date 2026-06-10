import { useState } from "react";
import "./Workspace_Add.css";

const Workspace_Add = ({
  title,
  bookmarks,

  id,
  onUpdate,
  onDelete,
}) => {
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
  return (
    <div className="workspace_node">
      <div className={`user_workspace`}>
        {/* <div className="options">...</div> */}
        <div className="workspace-options">
          <button
            type="button"
            className="options"
            onClick={() => setShowOptions(!showOptions)}
          >
            ...
          </button>

          {showOptions && (
            <div className="options-menu">
              <button
                type="button"
                onClick={() => {
                  setName(title);
                  setIsEditing(true);
                  setShowOptions(false);
                }}
              >
                Update
              </button>

              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={loading}
              autoFocus
            />

            <button type="submit" disabled={loading}>
              Save
            </button>

            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
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
