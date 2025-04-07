import React from "react";

function FeaturedCategories() {
  const categories = [
    {
      href: "/toys",
      bgColor: "#F5E100",
      imageSrc: "./assets/category-toys.png",
      alt: "Kategorija igračaka",
      title: "Igračke"
    },
    {
      href: "/footwear",
      bgColor: "#00F5A3",
      imageSrc: "/assets/category-footwear.png",
      alt: "Kategorija obuće",
      title: "Obuća"
    },
    {
      href: "/clothing",
      bgColor: "#00F5E5",
      imageSrc: "/assets/category-clothing.png",
      alt: "Kategorija odeće",
      title: "Odeća"
    },
    {
      href: "/formal-wear",
      bgColor: "#F5006E",
      imageSrc: "/assets/category-formal-wear.png",
      alt: "Kategorija svečanog programa",
      title: "Svečani program"
    },
    {
      href: "/babies",
      bgColor: "#D000F5",
      imageSrc: "/assets/category-babies.png",
      alt: "Kategorija svega za bebe",
      title: "Sve za bebe"
    },
    {
      href: "/furniture",
      bgColor: "#00B4F5",
      imageSrc: "/assets/category-furniture.png",
      alt: "Kategorija nameštaja",
      title: "Nameštaj"
    }
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-8 justify-between px-4 lg:px-4 py-5 my-6 bg-[#fff]">
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.href}
          className="category-item rounded-[8px] flex flex-col justify-center items-center aspect-square transition-transform hover:brightness-90 relative p-2"
          style={{ backgroundColor: category.bgColor }}
        >
          <img src={category.imageSrc} alt={category.alt} className="rounded-[8px]" />
          <div className="flex items-center gap-2 mb-2 absolute bottom-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xl font-bold">{category.title}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default FeaturedCategories;

export const layout = {
  areaId: "content",
  sortOrder: 6,
};
