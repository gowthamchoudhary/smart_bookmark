import React from "react";
import TopBar from "../TopBar/TopBar";

import "./Hero.css";
import {
  FaXTwitter,
  FaGithub,
  FaYoutube,
  FaReddit,
  FaInstagram,
} from "react-icons/fa6";
import { FaThumbtack } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
const Hero = () => {
  return (
    <div className="hero">
      <TopBar></TopBar>
      <div className="hero_nodes">
        <div className="memory_node node_1">
          <div className="node_1_inner">
            <div className="node_icon">
              <FaReddit className="platform-icon reddit" />
            </div>
            <div className="meta_data">
              <h4>How I organize my second brain</h4>
              <p className="node_meta">r/PM . 3mo ago</p>
            </div>
            <div className="node_reason">
              <FaThumbtack size={14} className="pin_icon" />
              <div className="reason_content">
                Reason:
                <br />
                Great framework for tagging system
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="center_content">
        <div className="center_main_text">
          Stop Losing <br />
          Valuable Links <br /> <span>Papers, and Ideas</span>
        </div>
        <div className="sub_main_content">
          Organize research papers, articles, videos, and resources into smart
          workspaces <br /> Search instantly, stay focused, and build your
          personal knowledge hub.
        </div>
        <button className="main_content_btn">Get Started</button>
        <div className="platforms">
          <FaXTwitter className="platform-icon x" />
          <FaReddit className="platform-icon reddit" />
          <FaInstagram className="platform-icon instagram" />
          <img
            src="/icons/gmail-svgrepo-com.svg"
            className="platform-icon gmail"
            alt=""
          />
          <FaYoutube className="platform-icon youtube" />
          <FaGithub className="platform-icon github" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
