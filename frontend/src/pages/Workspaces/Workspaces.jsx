import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkspaceById } from "../../api/workspace";
import { getWorkspaceBookmarks } from "../../api/bookmark";
import Bookmarks from "../../components/Recent_Bookmarks/Bookmarks/Bookmarks";
import "./Workspaces.css";

const Workspaces = () => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkspace() {
      try {
        setLoading(true);
        setError("");

        const [workspaceData, bookmarkData] = await Promise.all([
          getWorkspaceById(workspaceId),
          getWorkspaceBookmarks(workspaceId, page, 10),
        ]);

        setWorkspace(workspaceData);
        setBookmarks(bookmarkData.items);
        setPages(bookmarkData.pages);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to load workspace");
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [workspaceId, page]);

  if (loading) return <p>Loading workspace...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="workspace-page">
      <h1>{workspace?.name}</h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarks in this workspace.</p>
      ) : (
        <div className="workspace-bookmarks">
          {bookmarks.map((bookmark) => (
            <Bookmarks
              key={bookmark.id}
              title={bookmark.title}
              link={bookmark.url}
              workspace={workspace?.name}
            />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="workspace-pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button
            type="button"
            disabled={page === pages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Workspaces;
