import { useState } from "react";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="sidebar-menu">
          <ul>
            <li>Профиль</li>
            <li>Настройки</li>
            <li>Избранное</li>
            <li>Выход</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
