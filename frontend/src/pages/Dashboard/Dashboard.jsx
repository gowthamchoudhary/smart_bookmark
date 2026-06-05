import { useState } from "react";
import "./Dashboard.css";

import { LuSearch } from "react-icons/lu";
import { PiCommandBold } from "react-icons/pi";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="dashboard-bg">
      <div className="inner-bg">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
