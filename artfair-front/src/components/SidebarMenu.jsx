import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaRegEnvelope,
  FaHeart,
  FaShoppingCart,
  FaPen,
  FaPalette,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
import "./SidebarMenu.css";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const goToProfile = () => {
    closeMenu();
    navigate('/me');
  };

  return (
    <>
      <button className={`menu-button ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        ☰
      </button>

      <div className={`overlay ${isOpen ? "visible" : ""}`} onClick={closeMenu} />

      <nav className={`sidebar-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li onClick={goToProfile}><FaUser /> Profile</li>
          <li><FaRegEnvelope /> Subscriptions</li>
          <li><FaHeart /> Favorites</li>
          <li><FaShoppingCart /> Shop</li>
          <hr />
          <li><FaPen /> Add Article</li>
          <li><FaPalette /> Add Art</li>
          <hr />
          <li><FaCog /> Settings</li>
          <li><FaSignOutAlt /> Logout</li>
        </ul>
      </nav>
    </>
  );
};

export default SidebarMenu;
