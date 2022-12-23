import { SVGProps } from 'react';

export const Energy = (props: SVGProps<SVGSVGElement>) => (
  <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={32} height={32} rx={16} fill="#E7C758" />
    <path
      d="M14.994 8.381c-.319 0-.467.305-.575.638l-2.99 9.232h2.769l-2.233 6.892 7.916-8.51c.442-.476.746-1.36.097-1.36H17.99l2.026-6.254c.108-.333-.256-.638-.575-.638h-4.447Z"
      fill="#8D751F"
    />
  </svg>
);
