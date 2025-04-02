import React, {useState} from "react";
import {menuItems} from "./menu";
import "./MobileMenu.scss";

export default function MobileMenu() {
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="main-menu-mobile self-center">
      <a
        className="menu-icon"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </a>
      {show && (
        <ul className="nav justify-content-center">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a
                className="nav-link"
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu(index);
                }}>
                {item.name}
              </a>
              {activeIndex === index && item.submenu && (
                <ul className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="submenu-item">
                      <a href={subItem.url}>{subItem.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const layout = {
  areaId: "icon-wrapper",
  sortOrder: 50,
};