import React, {useState} from "react";
import {menuItems} from "./menu";
import "./MobileMenu.scss";

export default function MobileMenu() {
  const [show, setShow] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleSubmenu = (indexes) => {
    setActiveIndexes((prevIndexes) => {
      const indexKey = indexes.join('-');
      const exists = prevIndexes.some(item => item === indexKey);
      
      if (exists) {
        return prevIndexes.filter(item => item !== indexKey);
      } else {
        return [...prevIndexes, indexKey];
      }
    });
  };

  const renderMenuItems = (items, parentIndexes = []) => {
    return items.map((item, index) => {
      const currentIndexes = [...parentIndexes, index];
      const indexKey = currentIndexes.join('-');
      const isActive = activeIndexes.includes(indexKey);

      return (
        <li key={indexKey} className="nav-item">
          <span onClick={() => toggleSubmenu(currentIndexes)}>
            <a
              className="nav-link"
              href={item.url}
              onClick={(e) => {
                if (item.submenu) {
                  e.preventDefault();
                } else {
                  setShow(false);
                }
              }}>
              {item.name}
            </a>
            {item.submenu && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 inline-block transform ${
                  isActive ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </span>
          {isActive && item.submenu && (
            <ul className="submenu">
              {renderMenuItems(item.submenu, currentIndexes)}
            </ul>
          )}
        </li>
      );
    });
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
          {renderMenuItems(menuItems)}
        </ul>
      )}
    </div>
  );
}

export const layout = {
  areaId: "icon-wrapper",
  sortOrder: 50,
};