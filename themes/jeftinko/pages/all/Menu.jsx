import PropTypes from "prop-types";
import React from "react";

export default function Menu({ menu: { items } }) {
  return (
    <div className="main-menu self-center hidden md:block">
      <ul className="nav flex space-x-275 justify-content-center">
          <li className="nav-item mr-10 py-5 rounded-[8px] [&:nth-child(1)]:bg-[#9B5DE5] shadow-[5px_5px_0_0_#00000020]">
            <a className="nav-link cursor-pointer px-16 py-5 text-[#fff]" href="/">
              Početna
            </a>
          </li>
          <li className="nav-item mr-10 py-5 rounded-[8px] [&:nth-child(2)]:bg-[#00F5D4] shadow-[5px_5px_0_0_#00000020]">
            <a className="nav-link cursor-pointer px-16 py-5 text-[#fff]" href="/about-us">
              O nama
            </a>
          </li>
          <li className="nav-item mr-10 py-5 rounded-[8px] [&:nth-child(3)]:bg-[#FEE440] shadow-[5px_5px_0_0_#00000020]">
            <a className="nav-link cursor-pointer px-16 py-5 text-[#fff]" href="/contact">
              Kontakt
            </a>
          </li>
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