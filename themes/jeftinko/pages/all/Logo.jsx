import React from "react";

function Logo() {
  return (
    <div>
        <a href="/">
          <img src="/logo.svg" alt="Logo" className="header-logo"/>
        </a>
    </div>
  );
}

export default Logo;

export const layout = {
  areaId: "header",
  sortOrder: 1,
};
