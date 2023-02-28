"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const nav = [
  {
    pathname: "/",
    label: "Задания",
  },
  {
    pathname: "/marketplace",
    label: "Магазин",
  },
  {
    pathname: "/news",
    label: "Новости",
  },
];

export const Nav: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {nav.map((link) => (
        <Link
          key={link.pathname}
          href={{ pathname: link.pathname }}
          className={cn(
            "px-7 py-5",
            pathname === link.pathname && "bg-gray rounded-2xl",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
