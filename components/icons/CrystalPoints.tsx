import { SVGProps } from 'react';

export const CrystalPoints = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4.786.5h14.429a1.012 1.012 0 0 1 .819.417l3.87 5.323a.506.506 0 0 1-.038.64L12.372 19.338a.504.504 0 0 1-.743 0L.135 6.882a.506.506 0 0 1-.038-.642L3.967.917A1.012 1.012 0 0 1 4.786.5Z"
      fill="url(#crystalPoints)"
    />
    <defs>
      <linearGradient id="crystalPoints" x1={12} y1={0.5} x2={2} y2={21} gradientUnits="userSpaceOnUse">
        <stop stopColor="#0FF" />
        <stop offset={1} stopColor="#00FF94" />
      </linearGradient>
    </defs>
  </svg>
);
