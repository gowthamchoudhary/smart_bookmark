import { useState } from "react";
import "./Bookmarks.css";
import { deleteBookmark } from "../../../api/bookmark";

const Bookmarks = ({
  id,
  workspaceId,
  title,
  link,
  note,
  workspace,
  onEdit,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!window.confirm(`Delete "${title}"?`)) return;

    try {
      setLoading(true);
      setError("");
      await deleteBookmark(workspaceId, id);
      onDeleted?.(id, workspaceId);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
      setLoading(false);
    }
  }

  return (
    <div className="bookmark">
      <div className="bookmark-metadata">
        <div className="title">{title}</div>
        <a
          href={link}
          className="bookmark-url"
          target="_blank"
          rel="noreferrer"
          title={link}
        >
          {link}
        </a>
      </div>
      <div className="bookmark-workspace" title={workspace}>
        {workspace}
      </div>
      <div className="bookmark-actions">
        <button
          type="button"
          onClick={() =>
            onEdit?.({
              id,
              workspace_id: workspaceId,
              title,
              url: link,
              note,
            })
          }
        >
          Edit
        </button>
        <button type="button" onClick={handleDelete} disabled={loading}>
          Delete
        </button>
      </div>
      {error && <span className="bookmark-action-error">{error}</span>}
    </div>
  );
};

export default Bookmarks;
