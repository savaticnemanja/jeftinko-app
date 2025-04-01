import React from "react";

function FeaturedCategories() {
  return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-24 justify-between mb-10">
            <a href="/toys" className="category-item shadow-[5px_5px_0px_0px_rgba(0,0,0,0.125)] rounded-[8px]">
              <img src="./assets/category-toys.png" alt="Toys Category" className="rounded-[8px]"/>
            </a>
            <a href="/babies" className="category-item shadow-[5px_5px_0px_0px_rgba(0,0,0,0.125)] rounded-[8px]">
              <img src="/assets/category-all-for-babies.png" alt="All for Babies Category" className="rounded-[8px]" />
            </a>
            <a href="/footwear" className="category-item shadow-[5px_5px_0px_0px_rgba(0,0,0,0.125)] rounded-[8px]">
              <img src="/assets/category-footwear.png" alt="Footwear Category" className="rounded-[8px]" />
            </a>
            <a href="/formal-wear" className="category-item shadow-[5px_5px_0px_0px_rgba(0,0,0,0.125)] rounded-[8px]">
              <img src="/assets/category-formal-wear.png" alt="Formal Wear Category" className="rounded-[8px]"/>
            </a>
          </div>
  );
}

export default FeaturedCategories;

export const layout = {
  areaId: "content",
  sortOrder: 5,
};
