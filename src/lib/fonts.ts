import localFont from 'next/font/local';

export const geistSans = localFont({
  src: '../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

export const geistMono = localFont({
  src: '../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2',
  variable: '--font-mono',
  display: 'swap',
  weight: '100 900',
});
