import { Navbar } from "@/components/Shared/NavBar";
import {Onest} from 'next/font/google'
import '@/sass/main.scss';

const onest = Onest({
  weight:['100','300','500','700','900'],
  style:'normal',
  subsets: ['latin']
});



export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <Navbar/> 
        {children}
      </body>
    </html>
  );
}
