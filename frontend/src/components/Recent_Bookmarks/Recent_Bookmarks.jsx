import React from "react";
import "./Recent_Bookmarks.css";
import { FiChevronRight } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";
import { LuList } from "react-icons/lu";
import Bookmarks from "./Bookmarks/Bookmarks";

import { SiNotion, SiYoutube, SiGithub, SiYcombinator } from "react-icons/si";
const Recent_Bookmarks = () => {
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
      <Bookmarks
        title="Building a second brain with Para method"
        link="https://www.notion.com/"
        icon={<SiNotion />}
        workspace="Productivity"
        time="2h ago"
        class_Name="notion"
        color="green"
      />
      <Bookmarks
        title="Building a second brain with Para method"
        link="https://www.notion.com/"
        icon={<SiYoutube />}
        workspace="Productivity"
        class_Name="yt"
        time="2h ago"
        color="blue"
      />
      <Bookmarks
        title="Building a second brain with Para method"
        link="https://www.notion.com/"
        icon={<SiGithub />}
        workspace="Productivity"
        class_Name="git"
        time="2h ago"
        color="pink"
      />
      <Bookmarks
        title="Building a second brain with Para method"
        link="https://www.notion.com/"
        class_Name="yc"
        icon={<SiYcombinator />}
        workspace="Productivity"
        time="2h ago"
        color="orange"
      />
    </div>
  );
};

export default Recent_Bookmarks;
