import React from "react";

function MainBanner() {
  return (
        <div className="main-banner-home w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)] mx-[-2rem] my-[-2rem]">
          <img src="/desktop-banner.jpg" alt="Main Banner" className="banner-image hidden md:inline " />
          <img src="/mobile-banner.png" alt="Main Banner" className="banner-image inline md:hidden" />
        </div>
  );
}

export default MainBanner;

export const layout = {
  areaId: "content",
  sortOrder: 5,
};
