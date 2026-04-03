import { VscHome, VscBookmark, VscAccount } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

import "./BottomNav.scss";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <VscHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/library" className="nav-item">
        <VscBookmark />
        <span>Library</span>
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        <VscAccount />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
