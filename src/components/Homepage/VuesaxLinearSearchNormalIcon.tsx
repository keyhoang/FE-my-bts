import { memo, SVGProps } from 'react';

const VuesaxLinearSearchNormalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <rect width={48} height={48} rx={24} fill='#FD6D1A' />
    <path
      d='M23.4165 34.4999C29.5377 34.4999 34.4999 29.5377 34.4999 23.4165C34.4999 17.2954 29.5377 12.3332 23.4165 12.3332C17.2954 12.3332 12.3332 17.2954 12.3332 23.4165C12.3332 29.5377 17.2954 34.4999 23.4165 34.4999Z'
      stroke='white'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M35.6665 35.6665L33.3332 33.3332'
      stroke='white'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Memo = memo(VuesaxLinearSearchNormalIcon);
export { Memo as VuesaxLinearSearchNormalIcon };
