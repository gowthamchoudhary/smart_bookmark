import { useState } from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import "./CreateBookmark.css";
import { createBookmark, updateBookmark } from "../../api/bookmark";

const CreateBookmark = ({
  workspaces,
  editingBookmark,
  onCreated,
  onUpdated,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState(editingBookmark?.title || "");
  const [url, setUrl] = useState(editingBookmark?.url || "");
  const [note, setNote] = useState(editingBookmark?.note || "");
  const [workspaceId, setWorkspaceId] = useState(
    editingBookmark ? String(editingBookmark.workspace_id) : "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (editingBookmark) {
        const updated = await updateBookmark(
          editingBookmark.workspace_id,
          editingBookmark.id,
          title.trim(),
          note.trim() || null,
        );
        onUpdated?.(updated);
        return;
      }

      const selectedWorkspaceId = Number(workspaceId);

      await createBookmark(
        selectedWorkspaceId,
        title.trim(),
        url.trim(),
        note.trim() || null,
      );

      setWorkspaceId("");
      setTitle("");
      setUrl("");
      setNote("");
      onCreated?.(selectedWorkspaceId);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create bookmark");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-new-bookmark-main" id="bookmark-form-panel">
      <div className="top-section">
        <HiOutlineBookmark size={31} className="bookmark-ping" />
        {editingBookmark ? "Update Bookmark" : "Add New Bookmark"}
      </div>
      <div className="bookmark-input">
        <form onSubmit={handleSubmit}>
          {!editingBookmark && (
            <>
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
            </>
          )}
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bookmark title"
            disabled={loading}
            required
          />
          {!editingBookmark && (
            <>
              <label>Url</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={loading}
                required
              />
            </>
          )}
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
            disabled={
              loading || (!editingBookmark && workspaces.length === 0)
            }
          >
            {loading
              ? editingBookmark
                ? "Updating..."
                : "Creating..."
              : editingBookmark
                ? "Update bookmark"
                : "Create bookmark"}
          </button>
          {editingBookmark && (
            <button
              type="button"
              className="cancel-bookmark-edit"
              onClick={onCancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateBookmark;
