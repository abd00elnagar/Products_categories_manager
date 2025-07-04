import { Inter } from 'next/font/google';
import Providers from './providers';
import './globals.css'
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Unateed',
  description: 'Your trusted e-commerce platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 