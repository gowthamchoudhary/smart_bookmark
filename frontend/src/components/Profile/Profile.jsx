import { useEffect, useState } from "react";
import "./Profile.css";
import { FaFolder } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { getme } from "../../api/authAPI";
import { getBookmarks } from "../../api/bookmark";
import defaultProfile from "../../assets/profile.png";

const Profile = ({ workspaceCount = 0, onUserLoaded }) => {
  const [user, setUser] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setError("");
        const [userData, bookmarks] = await Promise.all([
          getme(),
          getBookmarks(),
        ]);
        setUser(userData);
        onUserLoaded?.(userData);
        setBookmarkCount(bookmarks.length);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      }
    }

    loadProfile();
  }, [onUserLoaded]);

  if (error) {
    return <div className="profile-page profile-error">{error}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-inner-bg">
        <div className="profile-img">
          <img
            src={user?.profile_picture || defaultProfile}
            alt={user?.username ? `${user.username}'s profile` : "Profile"}
          />
        </div>
        <div className="metadata">
          <div className="username">{user?.username || "Loading..."}</div>
          <div className="bio">{user?.bio || "No bio added yet."}</div>
          <div className="file-data">
            <div className="save-data">
              <FaFolder size={11} className="save-data-icons" />
              {workspaceCount} workspaces
            </div>
            <div className="save-data">
              <FaSave size={11} className="save-data-icons" />
              {bookmarkCount} bookmarks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
