import React from "react";

function MainBanner() {
  return (
        <div className="main-banner-home">
          <img src="/desktop-banner.jpg" alt="Main Banner" className="banner-image hidden md:inline" />
          <img src="/mobile-banner.png" alt="Main Banner" className="banner-image inline md:hidden" />
        </div>
  );
}

export default MainBanner;

export const layout = {
  areaId: "content",
  sortOrder: 5,
};
