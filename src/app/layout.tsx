import { Header } from '@/components/Header';
import './global.scss';

import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
