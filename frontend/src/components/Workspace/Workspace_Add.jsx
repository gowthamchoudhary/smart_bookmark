import React from "react";
import "./Workspace_Add.css";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FaPlus } from "react-icons/fa";

const Workspace_Add = ({ title, bookmarks, image, color }) => {
  return (
    <div className="workspace_node">
     
      <div className={`user_workspace workspace-${color}`}>
        <img src={image} alt="no image" className="workspace-img" />
        <div className="title">{title}</div>
        <div className="bookmarks">{bookmarks} bookmarks</div>
      </div>
    </div>
  );
};

export default Workspace_Add;
