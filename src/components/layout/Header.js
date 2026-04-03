import "./Header.scss";

import LogoImg from "../../assets/images/logo.png";
import { VscSearch, VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const notiRef = useRef(null);

  // 🔥 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="header-logo" onClick={() => navigate("/")}>
        <img src={LogoImg} alt="로고" />
        <h1>Aura</h1>
      </div>

      <div className="header-right">
        <button className="icon-btn" onClick={() => navigate("/search")}>
          <VscSearch />
        </button>

        <div className="noti-wrap" ref={notiRef}>
          <button className="icon-btn" onClick={() => setIsOpen(!isOpen)}>
            <VscBell />
            <span className="badge">3</span>
          </button>
          {isOpen && (
            <div className="noti-dropdown">
              <p className="title">Notifications</p>

              <div className="noti-item">🎧 New track added</div>
              <div className="noti-item">❤️ You liked a song</div>
              <div className="noti-item">🔥 Trending playlist updated</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
