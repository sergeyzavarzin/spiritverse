import { FC } from 'react';
import { Logo } from './Logo';
import { Nav } from './Nav';
import { Account } from './Account';

export const Header: FC = () => {
  return (
    <header className="mt-6 mb-5 flex h-20 items-center justify-between rounded-2xl border-[1px] border-solid border-border px-5">
      <Logo />
      <Nav />
      <Account />
    </header>
  );
};
