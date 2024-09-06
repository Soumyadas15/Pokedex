import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Navbar } from "@/components/ui/Navbar";
import { ColorModeProvider } from "@/providers/ColorModeProvider";
import { Toaster } from "react-hot-toast";
import { Header } from '@/components/home/Header';

export default function PartsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full transition-colors duration-300 dark:bg-[#333333]`}>
        <AppRouterCacheProvider>
          <ColorModeProvider>
            <Navbar/>
            <Toaster/>
            <Header/>
            {children}
          </ColorModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
