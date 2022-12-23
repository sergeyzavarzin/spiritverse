import { SVGProps } from 'react';

export const SPRT = (props: SVGProps<SVGSVGElement>) => (
  <svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={11} cy={11} r={11} fill="url(#a)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.862 15.879A10.954 10.954 0 0 0 22 11c0-6.075-4.925-11-11-11S0 4.925 0 11c0 .931.116 1.835.333 2.698a15.618 15.618 0 0 1 9.227-.616L6.455 2l9.316 12.838-2.733-9.772 7.824 10.813Z"
      fill="url(#b)"
    />
    <defs>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-8.59371 18.2188 -18.9011 -8.91555 19.594 3.781)"
      >
        <stop stopColor="#0FF" />
        <stop offset={1} stopColor="#00A3FF" />
      </radialGradient>
      <linearGradient id="a" x1={-8} y1={25} x2={11} y2={13} gradientUnits="userSpaceOnUse">
        <stop stopColor="#0085FF" />
        <stop offset={1} stopColor="#00387A" />
      </linearGradient>
    </defs>
  </svg>
);
