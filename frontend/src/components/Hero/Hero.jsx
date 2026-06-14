import { useState } from "react";
import TopBar from "../TopBar/TopBar";
import MemoryNode from "./MemoryNode/MemoryNode";
import "./Hero.css";
import restaurantImage from "../../assets/restaurants.jpg";
import pdf from "../../assets/pdf.png";
import yt_clip from "../../assets/videos/yt_lecture_clip.mp4";
import { useNavigate } from "react-router-dom";
import {
  FaXTwitter,
  FaYoutube,
  FaReddit,
  FaInstagram,
} from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa6";
import Toothless from "./toothless_inti/Toothless";
const Hero = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("getStarted");
  const isDemo = active === "demo";

  const handleMainAction = () => {
    navigate(isDemo ? "/demo" : "/auth");
  };

  return (
    <div className="hero">
      <TopBar active={active} onChange={setActive} />
      <Toothless></Toothless>
      <div className="star star1 "></div>
      <div className="star star2"></div>
      <div className="star star3"></div>
      <div className="star star4"></div>
      <div className="star star5"></div>
      <div className="star star6"></div>
      <div className="star star7"></div>
      <div className="star star8"></div>
      <div className="hero_nodes">
        <svg className="connection-layer" viewBox="0 0 1600 900">
          <path
            className="connection-path"
            d="M 190 220 C 330 260, 290 390, 100 440"
          />
          <path
            className="connection-path"
            d="M -70 220 C 60 120, 60 230, 50 660"
          />
          <path
            className="connection-path"
            d="M 120 450 C 500 500, 450 710, 600 830"
          />
          <path
            className="connection-path"
            d="M 690 766
    C 766 650 566 650 766 650, "
          />

          <path
            className="connection-path"
            d="M 1500 210 C 1180 260, 1210 420, 1100 800"
          />

          <path
            className="connection-path"
            d="M 180 610 C 360 560, 480 700, 740 620"
          />
          <path
            className="connection-path"
            d="
    M 1260 680
    C 1120 620,
      1000 560,
     850,590
  "
          />
          <path
            className="connection-path"
            d="
    M 1500 620
    C 1350 560,
      1250 320,850 590
  "
          />
        </svg>
        <MemoryNode
          className="node-1"
          size="medium"
          tone="blue"
          icon={<FaReddit className="reddit" />}
          title="How I organize my second brain"
          meta="r/PM · 3mo ago"
          reason="Great framework for tagging system"
        />

        <MemoryNode
          className="node-2"
          size="small"
          tone="blue"
          icon={<FaXTwitter className="x" />}
          title="AI Agents are the next big shift."
          meta="12:30 PM · 2d ago"
          reason="Great thread about architecture"
        />
        <MemoryNode
          className="node-3"
          size="small"
          tone="pink"
          icon={<FaInstagram className="instagram" />}
          title="Versatile cuisines."
          meta="12:30 PM · 2d ago"
          reason="Planning to celebrate my birthday here"
          image={restaurantImage}
        />
        <MemoryNode
          className="node-4 has-plain-icon"
          size="small"
          tone="pink"
          icon={<img src={pdf} className="pdf icon-plain" alt="" />}
          title="Attention Is All You Need."
          meta="(Research Papers)"
          reason="Important for LLM understand"
        />
        <MemoryNode
          className="node-5"
          size="small"
          tone="pink"
          icon={
            <img src="/icons/gmail-svgrepo-com.svg" className="gmail" alt="" />
          }
          title="Important Newsletter -AI tools weekly"
          meta="Jun 1,2024"
          reason="Good list of tools to try"
        />
        <MemoryNode
          className="node-6"
          size="small"
          tone="yellow"
          icon={<FaLightbulb className="note" />}
          title="Unread product update."
          meta="Gmail Â· 1d ago"
          reason="Follow up on launch checklist"
        />
        <MemoryNode
          className="node-7 youtube-node"
          size="large"
          tone="green"
          videoSrc={yt_clip}
          icon={
            <div className="curve_icon">
              <FaYoutube className="youtube " />
            </div>
          }
          title="Unread product update."
          meta="Gmail Â· 1d ago"
          reason="Follow up on launch checklist"
        />
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
        <button className="main_content_btn" onClick={handleMainAction}>
          {isDemo ? "Demo" : "Get Started"} <FiArrowRight className="arrow" />
        </button>
        {/* <div className="platforms">
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
        </div> */}
      </div>
      <div className="bottom-fade"></div>      
    </div>
  );
};

export default Hero;
