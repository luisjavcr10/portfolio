import { Navbar } from "@/components/NavBar";
import '@/sass/main.scss';

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/> 
        {children}
      </body>
    </html>
  );
}
