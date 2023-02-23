import React from "react";
import Link from "next/link";
import { clsx } from 'clsx';
import NavItemDrop from './NavItemDrop';

export default function NavItem({
    name,
    href,
    active,
    currPath,
    dropRoutes,
}: NavItemProps) {
    const activeStyles = "border-factgpt-primary text-gray-900";
    const defaultStyles =
        "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
    const navItemStyle = clsx("trans-300 inline-flex items-center cursor-pointer px-1 pt-1 border-b-4 text-lg font-medium h-full", active ? activeStyles : defaultStyles);

    if (dropRoutes)
      return (
        <NavItemDrop
          itemStyle={navItemStyle}
          href={href}
          name={name}
          dropRoutes={dropRoutes}
          currPath={currPath}
        />
      );

  if (href == null) return <div className={navItemStyle}>{name}</div>;

  if (href.includes("http"))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={navItemStyle}>
        {name}
      </a>
    );

  return (
    <Link href={href}>
      <span className={navItemStyle}>{name}</span>
    </Link>
  );
}


type NavItemProps = {
  name: string;
  href: string;
  active: boolean;
  currPath: string;
  dropRoutes?: any;
};
