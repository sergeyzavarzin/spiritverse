"use client";

import { FC } from "react";
import { AccountStats } from "./AccountStats";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

export const Header: FC = () => {
  return (
    <header className="border-border mb-5 flex h-20 items-center justify-between rounded-2xl border border-solid px-5">
      <Logo />
      <Nav />
      <AccountStats />
    </header>
  );
};
