import PropTypes from "prop-types";
import React, { useState } from "react";
import { menuItems } from "./menu";

export default function Menu({ menu }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const colors = ["#9B5DE5", "#00F5D4", "#FEE440", "#FE6A3A", "#00D2D3"]; // Added extra colors for additional items

  const handleMouseEnter = (index) => {
    setActiveSubmenu(index);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  return (
    <div className="main-menu self-center hidden md:block">
      <ul className="nav flex space-x-275 justify-content-center">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="nav-item mx-4 py-5 rounded-[8px] relative group"
            style={{
              backgroundColor: activeSubmenu === index ? colors[index] : colors[index],
              boxShadow: "5px 5px 0 0 #00000020"
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              className="nav-link cursor-pointer px-8 py-5 text-[#fff] font-bold"
              href={item.url}
            >
              {item.name}
            </a>
            
            {item.submenu && item.submenu.length > 0 && (
              <ul
                className={`absolute left-0 mt-4 w-48 rounded-md shadow-lg z-10 ${activeSubmenu === index ? 'block' : 'hidden'}`}
                style={{ backgroundColor: colors[index] }}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex} className="px-4 hover:bg-black/10">
                    <a
                      href={subItem.url}
                      className="block text-[#fff] py-4 font-bold"
                    >
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Menu.propTypes = {
  menu: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        submenu: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
  }).isRequired,
};

export const layout = {
  areaId: "header",
  sortOrder: 2,
};
