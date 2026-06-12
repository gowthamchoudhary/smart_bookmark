import { useEffect, useState } from "react";
import "./Profile.css";
import { FaFolder } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FiEdit2, FiSave, FiTrash2, FiX } from "react-icons/fi";
import { getme, logoutUser, updateBio } from "../../api/authAPI";
import { getBookmarks } from "../../api/bookmark";
import defaultProfile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

const Profile = ({
  workspaceCount = 0,
  bookmarkRefreshKey = 0,
  onUserLoaded,
}) => {
  const [user, setUser] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState("");
  const [savingBio, setSavingBio] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      try {
        setError("");
        const [userData, bookmarks] = await Promise.all([
          getme(),
          getBookmarks(),
        ]);
        setUser(userData);
        setBio(userData.bio || "");
        onUserLoaded?.(userData);
        setBookmarkCount(bookmarks.length);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      }
    }

    loadProfile();
  }, [bookmarkRefreshKey, onUserLoaded]);

  if (error) {
    return <div className="profile-page profile-error">{error}</div>;
  }

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await logoutUser();
    } finally {
      navigate("/auth", { replace: true });
    }
  }

  async function handleBioSave(event) {
    event.preventDefault();
    try {
      setSavingBio(true);
      setError("");
      const data = await updateBio(bio.trim() || null);
      setUser((current) => ({ ...current, bio: data.bio }));
      setBio(data.bio || "");
      setIsEditingBio(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingBio(false);
    }
  }

  async function handleBioRemove() {
    try {
      setSavingBio(true);
      setError("");
      const data = await updateBio(null);
      setUser((current) => ({ ...current, bio: data.bio }));
      setBio("");
      setIsEditingBio(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingBio(false);
    }
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
          {isEditingBio ? (
            <form className="bio-edit-form" onSubmit={handleBioSave}>
              <div className="bio-icon-actions">
                <button
                  type="submit"
                  title="Save bio"
                  aria-label="Save bio"
                  disabled={savingBio}
                >
                  <FiSave />
                </button>
                <button
                  type="button"
                  title="Cancel"
                  aria-label="Cancel bio edit"
                  onClick={() => {
                    setBio(user?.bio || "");
                    setIsEditingBio(false);
                  }}
                >
                  <FiX />
                </button>
                {user?.bio && (
                  <button
                    type="button"
                    title="Remove bio"
                    aria-label="Remove bio"
                    onClick={handleBioRemove}
                    disabled={savingBio}
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                maxLength={300}
                rows={3}
                placeholder="Write your bio"
              />
            </form>
          ) : (
            <div className="bio">
              <span>{user?.bio || "No bio added yet."}</span>
              <button
                type="button"
                className="bio-edit-icon"
                title="Edit bio"
                aria-label="Edit bio"
                onClick={() => setIsEditingBio(true)}
              >
                <FiEdit2 />
              </button>
            </div>
          )}
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
      <button
        type="button"
        className="profile-logout"
        onClick={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Profile;
