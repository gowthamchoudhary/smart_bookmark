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
          title={link}
        >
          {link}
        </a>
      </div>
      <div className="bookmark-workspace" title={workspace}>
        {workspace}
      </div>
    </div>
  );
};

export default Bookmarks;
