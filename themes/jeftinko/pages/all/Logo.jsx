import React from "react";

function Logo() {
  return (
    <div>
      <a href="/">
        <img src="/Logo.webp" alt="Logo" className="relative z-10"/>
      </a>
    </div>
  );
}

export default Logo;

export const layout = {
  areaId: "header",
  sortOrder: 1,
};
