import { useState } from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import "./CreateBookmark.css";
import { createBookmark } from "../../api/bookmark";

const CreateBookmark = ({ workspaces, onCreated }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createBookmark(
        Number(workspaceId),
        title.trim(),
        url.trim(),
        note.trim() || null,
      );

      setWorkspaceId("");
      setTitle("");
      setUrl("");
      setNote("");
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create bookmark");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-new-bookmark-main">
      <div className="top-section">
        <HiOutlineBookmark size={31} className="bookmark-ping" />
        Add New Bookmark
      </div>
      <div className="bookmark-input">
        <form onSubmit={handleSubmit}>
          <label>Workspace</label>
          <select
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
            disabled={loading || workspaces.length === 0}
            required
          >
            <option value="">Select a workspace</option>
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bookmark title"
            disabled={loading}
            required
          />
          <label>Url</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={loading}
            required
          />
          <label>Note</label>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Optional note"
            disabled={loading}
          />

          {error && <p className="bookmark-form-error">{error}</p>}

          <button
            type="submit"
            disabled={loading || workspaces.length === 0}
          >
            {loading ? "Creating..." : "Create bookmark"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookmark;
