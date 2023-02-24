'use client';

import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

const nav = [
  {
    pathname: '/',
    label: 'Сражения',
  },
  {
    pathname: '/tasks',
    label: 'Задания',
  },
  {
    pathname: '/marketplace',
    label: 'Магазин',
  },
  {
    pathname: '/news',
    label: 'Новости',
  },
];

export const Nav: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {nav.map((link) => (
        <Link
          key={link.pathname}
          href={link.pathname}
          className={cn('px-7 py-5', pathname === link.pathname && 'rounded-2xl bg-gray')}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
