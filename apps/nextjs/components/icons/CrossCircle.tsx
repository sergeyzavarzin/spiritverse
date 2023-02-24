import { SVGProps } from 'react';

export const CrossCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg width={50} height={50} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle r={25} transform="matrix(-1 0 0 1 25 25)" fill="#000" fillOpacity={0.24} />
    <path
      d="M23.94 26.06a1.5 1.5 0 0 1 0-2.12l9.545-9.547a1.5 1.5 0 1 1 2.122 2.122L27.12 25l8.486 8.485a1.5 1.5 0 1 1-2.122 2.122L23.94 26.06Zm3.06.44h-2v-3h2v3Z"
      fill="#fff"
    />
    <path
      d="M26.06 26.06a1.5 1.5 0 0 0 0-2.12l-9.545-9.547a1.5 1.5 0 1 0-2.122 2.122L22.88 25l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122l9.546-9.546ZM23 26.5h2v-3h-2v3Z"
      fill="#fff"
    />
  </svg>
);
