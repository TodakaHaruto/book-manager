import Link from 'next/link';
import Image from 'next/image';
import "./globals.css";
import {Inconsolata} from 'next/font/google';
import MenuDrawer from '../components/MenuDrawer';


const font = Inconsolata({subsets: ['latin']});

export const metadata = {
  title: "Book Manager",
  description: "読んだ本や読みたい本を管理できるアプリです",
  authors: "Todaka Haruto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={font.className + " bg-gray-600"}>
        <header className='bg-dark-grey w-full fixed top-0'>
          <div  className='flex justify-between'>
            <Link href={'/'}>
            <Image src="/logo.jpg" alt='logo' width={200} height={100} className='pt-1 pl-1'/>
            </Link>
            <MenuDrawer/>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
