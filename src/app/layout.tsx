import { Navbar } from "@/components/Shared/NavBar";
import {Footer} from "@/components/Shared/Footer";
import {Onest} from 'next/font/google'
import styles from './layout.module.scss';
import '@/styles/tailwind/tailwind.css';
import '@/sass/main.scss';

const onest = Onest({
  weight:['100','200','300','400','500','600','700','800','900'],
  style:'normal',
  subsets: ['latin']
});

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${onest.className} ${styles.layout}`}>
        <Navbar/> 
        {children}
        <Footer/>
      </body>
    </html>
  );
}
