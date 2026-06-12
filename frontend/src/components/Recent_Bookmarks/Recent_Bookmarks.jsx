import { useEffect, useState } from "react";
import "./Recent_Bookmarks.css";
import Bookmarks from "./Bookmarks/Bookmarks";
import { getBookmarks } from "../../api/bookmark";
import bookmark_icon from "../../assets/bookmark.png";

const Recent_Bookmarks = ({
  refreshKey = 0,
  workspaces = [],
  query = "",
  onBookmarkEdit,
  onBookmarkDeleted,
}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    if (!normalizedQuery) return true;

    const workspaceName =
      workspaces.find(
        (workspace) => workspace.id === bookmark.workspace_id,
      )?.name || "";

    return [bookmark.title, bookmark.url, bookmark.note, workspaceName].some(
      (value) => value?.toLowerCase().includes(normalizedQuery),
    );
  });

  useEffect(() => {
    async function loadBookmarks() {
      setLoading(true);
      setError("");
      try {
        const data = await getBookmarks();
        setBookmarks(data);
      } catch (err) {
        setError(err.message || "Failed to load bookmarks");
      } finally {
        setLoading(false);
      }
    }
    loadBookmarks();
  }, [refreshKey]);

  return (
    <div className="recent_bookmarks">
      <div className="topbar_bookmarks">
        <p>Recent Bookmarks</p>
      </div>
      {loading && !error && (
        <div className="loading-status">Loading the Bookmarks</div>
      )}
      {!loading && !error && bookmarks.length === 0 && (
        <div className="no-bookmarks">
          <img src={bookmark_icon} alt="" />
          No bookmarks created
        </div>
      )}
      {!loading &&
        !error &&
        bookmarks.length > 0 &&
        filteredBookmarks.length === 0 && (
          <div className="bookmark-search-empty">
            No bookmarks match “{query.trim()}”
          </div>
        )}
      {error && <div className="error">{error}</div>}
      {!loading &&
        !error &&
        filteredBookmarks.slice(0, 10).map((bookmark) => (
          <Bookmarks
            key={bookmark.id}
            id={bookmark.id}
            workspaceId={bookmark.workspace_id}
            title={bookmark.title}
            link={bookmark.url}
            note={bookmark.note}
            workspace={
              workspaces.find(
                (workspace) => workspace.id === bookmark.workspace_id,
              )?.name || "Unknown workspace"
            }
            onEdit={onBookmarkEdit}
            onDeleted={(bookmarkId, workspaceId) => {
              setBookmarks((current) =>
                current.filter((item) => item.id !== bookmarkId),
              );
              onBookmarkDeleted?.(workspaceId);
            }}
          />
        ))}
    </div>
  );
};

export default Recent_Bookmarks;
