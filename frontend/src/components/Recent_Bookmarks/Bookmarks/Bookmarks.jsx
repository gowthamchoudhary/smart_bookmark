import { BsThreeDots } from "react-icons/bs";
import "./Bookmarks.css";
const Bookmarks = ({ title, link, workspace }) => {
  return (
    <div className="bookmark">
      <div className="bookmark-metadata">
        <div className="title">{title}</div>
        <a
          href={link}
          className="bookmark-url"
          target="_blank"
          rel="noreferrer"
        >
          {link}
        </a>
      </div>
      <div className={`workspace workspace`}>{workspace}</div>
    </div>
  );
};

export default Bookmarks;
