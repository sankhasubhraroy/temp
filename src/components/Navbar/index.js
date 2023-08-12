import React, { useState } from "react";
// import { link } from "react-router-dom";
import BrandLogo from "../../assets/images/brand-logo.png";
import Button from "../Button";
import Hamburger from "../Hamburger";

function Navbar() {
  const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
  ];

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="relative">
      <nav className="DESKTOP-NAVBAR flex items-center justify-between bg-secondary-light px-8">
        <div className="flex justify-center items-center">
          <div onClick={() => setIsNavOpen(!isNavOpen)}>
            <Hamburger crossed={isNavOpen} />
          </div>

          <div className="w-[140px]">
            <a href="/">
              <img src={BrandLogo} alt="WorkWise" />
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center gap-16">
          <ul className="flex items-center justify-center gap-8 font-basic font-medium text-base text-primary-dark max-lg:text-sm max-md:hidden">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
          </ul>

          <Button buttonName="Become a Freelancer" useCase="freelancer-join" />
        </div>
      </nav>

      <nav
        className={`MOBILE-NAVBAR bg-secondary-light py-4 absolute w-full z-[-1] md:z-auto md:hidden transition-all duration-300 ease-in ${
          isNavOpen ? "top-full opacity-100" : "-top-[500px] opacity-0"
        }`}
      >
        <ul className="flex flex-col justify-center items-center gap-4 font-basic font-medium text-base text-primary-dark ">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
