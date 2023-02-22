import React from "react";
import {
  faAngleDown,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";

import Link from "next/link";
import { clsx } from "clsx";

export default function NavItemDrop({
  name,
  href,
  dropRoutes,
  itemStyle,
  currPath,
}: NavItemDropProps) {
  return (
    <Popover className="h-full relative">
      <Popover.Button className={clsx(itemStyle, "h-full")}>
        {name}{" "}
        <FontAwesomeIcon
          className="-mr-1 ml-1 h-4 w-4 inline-block"
          icon={faAngleDown}
        />
      </Popover.Button>

      <Popover.Panel className="-mt-1 right-0 w-52 absolute z-10 bg-white shadow">
        <div className="flex flex-col">
          {dropRoutes.map((r: any) => {
            return (
              <DropdownItem
                key={r.href}
                href={r.href}
                name={r.name}
                active={r.href.split("?")[0] == currPath.split("?")[0]}
              />
            );
          })}
        </div>
      </Popover.Panel>
    </Popover>
  );
}

function DropdownItem({ href, name, active }: any) {
  const activeStyles = "bg-gray-100 border-factgpt-primary text-gray-900";
  const defaultStyles =
    "border-transparent w-full text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 pr-10";
  const navItemStyle = `trans-300 block px-4 py-2 text-lg border-l-4 text-base font-medium ${
    active ? activeStyles : defaultStyles
  }`;

  if (href.includes("http"))
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(navItemStyle, "pr-7")}
      >
        {name}{" "}
        <FontAwesomeIcon
          className="-mr-1 ml-1 h-4 w-4 inline-block -mt-1"
          icon={faArrowUpRightFromSquare}
        />
      </a>
    );

  return (
    <Link href={href}>
      <span className={navItemStyle} role="menuitem">
        {name}
      </span>
    </Link>
  );
}

type NavItemDropProps = {
  name: string;
  href: string;
  dropRoutes: any[];
  itemStyle: string;
  currPath: string;
};
