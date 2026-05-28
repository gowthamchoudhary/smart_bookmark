import React from "react";
import "./App.css";
import Landing from "./pages/Landing";
import TopBar from "./components/TopBar";

export const App = () => {
  return (
    <div className="card">
      
      <Landing></Landing>
      <TopBar></TopBar>
      
    </div>
  );
};
export default App;
