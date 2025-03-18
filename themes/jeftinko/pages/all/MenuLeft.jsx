import PropTypes from "prop-types";
import React from "react";

export default function MenuLeft({ menu: { items } }) {
  return (
    <div className="main-menu self-center hidden md:block">
      <ul className="nav flex space-x-275 justify-content-center">
        {items.map((i, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="nav-item mr-10 py-5 rounded-[8px] [&:nth-child(1)]:bg-[#9B5DE5] [&:nth-child(2)]:bg-[#00F5D4] [&:nth-child(3)]:bg-[#FEE440] [&:nth-child(4)]:bg-[#FE6A3A] [&:nth-child(5)]:bg-[#00BBF9] shadow-[5px_5px_0_0_#00000020]" key={index}>
            <a className="nav-link cursor-pointer px-20 py-5 text-[#fff]" href={i.url}>
              {i.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

MenuLeft.propTypes = {
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
  sortOrder: 1,
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
