import PropTypes from "prop-types";
import React from "react";
import Area from "@components/common/Area";
import LoadingBar from "@components/common/LoadingBar";
import "../../css/global.scss";
import "./Layout.scss";
import "./tailwind.scss";

export default function Layout({ menu: { items } }) {
  return (
    <>
      <LoadingBar />
      <div className="header">
        <div className="social-wrapper flex items-center">
          <div className="w-[1280px] mx-auto justify-end flex space-x-4 pr-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" fill="#FFB704">
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512" fill="#FFB704">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="page-width flex justify-between items-center h-[94px] px-4">
          <Area
            id="header"
            noOuter
            coreComponents={[
              {
                component: { default: Area },
                props: {
                  id: "icon-wrapper",
                  className: "icon-wrapper flex justify-between space-x-5 text-[#ffffff]",
                },
                sortOrder: 4,
              },
            ]}
          />
        </div>
      </div>
      <main className="content">
      <div className="main-banner-home"/>
        <div className="page-width">
          <div className="bg-[#F8FCFF] px-[22px] lg:px-[55px]">
            <Area id="content" className="" noOuter />
          </div>
        </div>
      </main>
      <div className="footer">
        <div className="page-width px-[22px] lg:px-[55px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-24 py-8">
            <div className="flex flex-col space-y-5">
              <a href="/">
                <img src="/Logo.png" alt="eve" className="z-10"/>
              </a>
            </div>
            <div className="flex flex-col space-y-5">
              <h3 className="text-white font-semibold mb-2">Kategorije</h3>
              {items.map((i, index) => (
              // eslint-disable-next-line react/no-array-index-key
                <a className="text-white hover:text-[#FFB704]" href={i.url}>
              {i.name}
              </a>
              ))}
            </div>
            <div className="flex flex-col space-y-5">
              <h3 className="text-white font-semibold mb-2">O nama</h3>
              <a href="#" className="text-white hover:text-[#FFB704]">Kontakt</a>
              <a href="#" className="text-white hover:text-[#FFB704]">Politika privatnosti</a>
              <a href="#" className="text-white hover:text-[#FFB704]">Pravila korišćenja</a>
            </div>
            <div className="flex flex-col space-y-5">
              <h3 className="text-white font-semibold mb-2">Kontakt</h3>
              <a href="mailto:test@test.com" className="text-white hover:text-[#FFB704]">kontakt@jeftinko.rs</a>
              <a href="tel:+381651234567" className="text-white hover:text-[#FFB704]">+381 65 1234567</a>
              <div className="flex space-x-4 pr-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" fill="#FFB704">
                    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512" fill="#FFB704">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="self-center">
          <div className="copyright text-center text-textSubdued">
            <span>Copyright © 2025 Jeftinko. Developed by <a className="text-[#FFB704] cursor-pointer" href="https://nemanjas.dev">nemanjas.dev</a></span>
          </div>
        </div>
      </div>
    </>
  );
}

Layout.propTypes = {
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
  areaId: "body",
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
