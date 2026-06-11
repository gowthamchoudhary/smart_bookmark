import React from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import "./CreateBookmark.css";
const CreateBookmark = () => {
  return (
    <div className="add-new-bookmark-main">
      <div className="top-section">
        <HiOutlineBookmark size={31} className="bookmark-ping" />
        Add New Bookmark
      </div>
    </div>
  );
};

export default CreateBookmark;
