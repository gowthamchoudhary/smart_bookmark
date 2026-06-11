import { useEffect, useState } from "react";
import "./Recent_Bookmarks.css";
import { FiChevronRight } from "react-icons/fi";
import { LuList } from "react-icons/lu";
import Bookmarks from "./Bookmarks/Bookmarks";
import { getBookmarks } from "../../api/bookmark";

const Recent_Bookmarks = () => {
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
  }, []);

  return (
    <div className="recent_bookmarks">
      <div className="topbar_bookmarks">
        <p>Recent Bookmarks</p>
        <div className="right_topbar">
          <div className="dropDown">
            Recently Added{" "}
            <span>
              <FiChevronRight />
            </span>
          </div>
          <div className="options">
            <div>
              <LuList />
            </div>
          </div>
        </div>
      </div>
      {loading && !error && (
        <div className="loading-status">Loading the Bookmarks</div>
      )}
      {!loading && !error && bookmarks.length === 0 && (
        <div className="no-bookmarks">No bookmarks created</div>
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
