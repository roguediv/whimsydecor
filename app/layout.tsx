import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import './mainStyle.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'WhimsyDecor - Home Sweet Hive',
    template: '%s - WhimsyDecor'
  },
  description: 'WhimsyDecor',
  // other: { 'Content-Security-Policy': "default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={montserrat.style}>
        {children}
      </body>
    </html>
  );
}
