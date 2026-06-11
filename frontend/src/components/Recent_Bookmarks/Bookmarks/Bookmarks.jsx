import { BsThreeDots } from "react-icons/bs";
import "./Bookmarks.css";
const Bookmarks = ({
  icon,
  title,
  link,
  workspace,
  time,
  color,
  class_Name,
}) => {
  return (
    <div className="bookmark">
      <div className={`bookmark-icon ${class_Name}`}>{icon}</div>
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
      <div className={`workspace workspace-${color}`}>{workspace}</div>
      <div className="time">{time}</div>
      <div className="option">
        <BsThreeDots />
      </div>
    </div>
  );
};

export default Bookmarks;
