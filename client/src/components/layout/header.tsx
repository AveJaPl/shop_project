"use client"

import Link from "next/link";
import UserIcon from "../common/userIcon";
import { useState } from "react";

const Header = () => {
  const [selectedLink, setSelectedLink] = useState("home");
  const linkStyle = "text-lg font-semibold hover:text-indigo-300 transition duration-300";
  const selectedLinkStyle = "text-red-500";
  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  return (
    <header className="p-8 w-full bg-indigo-500 text-white flex justify-between items-center shadow-lg">
      <div className="left flex space-x-4">
        <Link href="/"
            onClick={() => handleLinkClick("home")} 
            className={`${linkStyle} ${selectedLink === "home" ? `${selectedLinkStyle}` : ""}`}
          >
            Home
        </Link>
        <Link href="/about"
            onClick={() => handleLinkClick("about")} 
            className={`${linkStyle} ${selectedLink === "about" ? `${selectedLinkStyle}` : ""}`}
          >
            About
        </Link>
        <Link href="/contact"
            onClick={() => handleLinkClick("contact")} 
            className={`${linkStyle} ${selectedLink === "contact" ? `${selectedLinkStyle}` : ""}`}
          >
            Contact
        </Link>
      </div>
      <div className="right w-1/5 flex justify-around">
        <UserIcon className="h-8 w-8" />
      </div>
    </header>
  );
};

export default Header;
