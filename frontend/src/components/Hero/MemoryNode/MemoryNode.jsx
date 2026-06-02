import React from "react";
import { FaThumbtack } from "react-icons/fa";
import "./MemoryNode.css";
const MemoryNode = ({
  icon,
  title,
  meta,
  reason,
  size = "Medium",
  tone = "blue",
  className = "",
  image = "",
  videoSrc = "",
}) => {
  return (
    <div className={`memory-node memomry-node--${size} ${className}`}>
      
      <div className="memory-node__icon">{icon}</div>
      <div className="memory-node_inner">
        {image && <img src={image} className="memory-node__image" />}
        {videoSrc && (
          <video
            src={videoSrc}
            className="memory-node_video"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        )}
        <h4>{title}</h4>
        <p>{meta}</p>
        <div className={`memory-node__reason reason--${tone}`}>
          <FaThumbtack className="memory-node__pin" />
          <strong>Reason:</strong>
          <br />
          {reason}
        </div>
      </div>
    </div>
  );
};

export default MemoryNode;
