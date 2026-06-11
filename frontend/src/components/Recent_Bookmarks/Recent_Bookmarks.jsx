import { useEffect, useState } from "react";
import "./Recent_Bookmarks.css";
import Bookmarks from "./Bookmarks/Bookmarks";
import { getBookmarks } from "../../api/bookmark";
import bookmark_icon from "../../assets/bookmark.png";

const Recent_Bookmarks = ({ refreshKey = 0 }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      {error && <div className="error">{error}</div>}
      {!loading &&
        !error &&
        bookmarks.map((bookmark) => (
          <Bookmarks
            key={bookmark.id}
            title={bookmark.title}
            link={bookmark.url}
          />
        ))}
    </div>
  );
};

export default Recent_Bookmarks;
