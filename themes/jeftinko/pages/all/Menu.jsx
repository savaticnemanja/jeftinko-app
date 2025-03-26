import PropTypes from "prop-types";
import React from "react";

export default function Menu({ menu: { items } }) {
  const colors = ['#9B5DE5', '#00F5D4', '#FEE440', '#FE6A3A', '#00BBF9'];

  return (
    <div className="main-menu self-center hidden md:block">
      <ul className="nav flex space-x-275 justify-content-center">
        {items.map((item, index) => (
          <li
            key={item.url}
            className="nav-item mr-10 py-5 rounded-[8px] shadow-[5px_5px_0_0_#00000020]"
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <a className="nav-link cursor-pointer px-16 py-5 text-[#fff]" href={item.url}>
              {item.name}
            </a>
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
      })
    ).isRequired,
  }).isRequired,
};

export const layout = {
  areaId: "header",
  sortOrder: 2,
};

export const query = `
  query {
    menu {
      items {
        name
        url
      }
    }
}`;