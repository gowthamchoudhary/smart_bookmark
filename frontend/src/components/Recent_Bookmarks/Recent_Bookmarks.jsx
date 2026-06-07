import React from "react";
import "./Recent_Bookmarks.css";
import { FiChevronRight } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";

const Recent_Bookmarks = () => {
  return (
    <div className="recent_bookmarks">
      <div className="topbar_bookmarks">
        <p>Recent Bookmarks</p>
        <div className="dropDown">
          Recently Added{" "}
          <span>
            <FiChevronRight />
          </span>
        </div>
        <div className="options">
          <FiMoreVertical />
        </div>
      </div>
    </div>
  );
};

export default Recent_Bookmarks;
