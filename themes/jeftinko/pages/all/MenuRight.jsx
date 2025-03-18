import React from "react";

export default function MenuAAA() {
  return (
    <div className="main-menu self-center hidden md:block">
      <ul className="nav flex space-x-275 justify-content-center">
          <li className="nav-item mr-10 py-5 rounded-[8px] [&:nth-child(1)]:bg-[#9B5DE5] [&:nth-child(2)]:bg-[#00F5D4] [&:nth-child(3)]:bg-[#FEE440] [&:nth-child(4)]:bg-[#FE6A3A] [&:nth-child(5)]:bg-[#00BBF9] shadow-[5px_5px_0_0_#00000020]">
            <a className="nav-link cursor-pointer px-20 py-5 text-[#fff]" href="#">
              test
            </a>
          </li>
          <li className="nav-item mr-10 py-5 rounded-[8px] [&:nth-child(1)]:bg-[#9B5DE5] [&:nth-child(2)]:bg-[#00F5D4] [&:nth-child(3)]:bg-[#FEE440] [&:nth-child(4)]:bg-[#FE6A3A] [&:nth-child(5)]:bg-[#00BBF9] shadow-[5px_5px_0_0_#00000020]">
            <a className="nav-link cursor-pointer px-20 py-5 text-[#fff]" href="#">
              test
            </a>
          </li>
      </ul>
    </div>
  );
}

export const layout = {
  areaId: "header",
  sortOrder: 3,
};