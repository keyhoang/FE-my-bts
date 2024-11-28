import { memo, SVGProps } from 'react';

const VuesaxLinearFilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M7.2 2.8H24.8C26.2667 2.8 27.4667 4 27.4667 5.46667V8.4C27.4667 9.46667 26.8 10.8 26.1333 11.4667L20.4 16.5333C19.6 17.2 19.0667 18.5333 19.0667 19.6V25.3333C19.0667 26.1333 18.5333 27.2 17.8667 27.6L16 28.8C14.2667 29.8667 11.8667 28.6667 11.8667 26.5333V19.4667C11.8667 18.5333 11.3333 17.3333 10.8 16.6667L5.73333 11.3333C5.06667 10.6667 4.53333 9.46667 4.53333 8.66667V5.6C4.53333 4 5.73333 2.8 7.2 2.8Z'
      stroke='#2C323F'
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14.5733 2.8L8 13.3333'
      stroke='#2C323F'
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Memo = memo(VuesaxLinearFilterIcon);
export { Memo as VuesaxLinearFilterIcon };
