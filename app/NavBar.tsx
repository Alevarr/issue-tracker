"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { text: "Dashboard", href: "/" },
    { text: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            // className="text-zinc-500 hover:text-zinc-800 transition-colors"
            className={classnames({
              "text-zinc-900": currentPath === link.href,
              "text-zinc-500": currentPath !== link.href,
              "transition-colors hover:text-zinc-800": true,
            })}
            key={link.href}
          >
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
