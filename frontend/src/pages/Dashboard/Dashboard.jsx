import { useState } from "react";
import "./Dashboard.css";

import { LuSearch } from "react-icons/lu";
import { PiCommandBold } from "react-icons/pi";
import Workspace_Add from "../../components/Workspace/Workspace_Add";
import robot from "../../assets/robot.png";
import bulb from "../../assets/bulb.png";
import palete from "../../assets/pallete.png";
import { FiChevronRight } from "react-icons/fi";

import Recent_Bookmarks from "../../components/Recent_Bookmarks/Recent_Bookmarks";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="dashboard-bg">
      <div className="inner-bg">
        <div className="dashboard_logo logo">
          Memory<span id="OS_part">OS</span>
        </div>
        <div className="core-dashboard">
          <div className="top-bar">
            <div className="wish-data">
              <div className="main-wish">Hey There!👋</div>
              <div className="sub-text">
                Here's what happening with your workspaces today.
              </div>
            </div>
            <div className="search-bar">
              {/* <Lusearch size={18} /> */}
              <LuSearch size={18} className="search-icon" />
              <input
                type="text"
                placeholder="search memory..."
                value={query}
                onChange={(e) => setQuesry(e.target.value)}
              />

              <div className="command-icons">
                <PiCommandBold size={14} />
                <span>K</span>
              </div>
            </div>
          </div>
          <div className="workspace-node">
            <div className="add_workspace">
              <div className="plus-btn">+</div>
              <p>New Workspace</p>
            </div>

            <Workspace_Add
              title="AI Reasearch"
              bookmarks="55 "
              color="pink"
              image={robot}
            />
            <Workspace_Add
              title="Design Ideas"
              bookmarks="104 "
              color="blue"
              image={palete}
            />
            <Workspace_Add
              title="Startup Ideas"
              bookmarks="64 "
              color="yellow"
              image={bulb}
            />
            <div className="more">
              {" "}
              <FiChevronRight />
            </div>
          </div>
          <Recent_Bookmarks/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
