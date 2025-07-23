import { Hind, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes"; // Add this import
import Header from "@/components/layout/header/Header";

// Font configurations remain the same
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${hind.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Add this script for system preference detection
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.classList.toggle('dark', theme === 'dark');
            } catch (e) {}
          `
        }} /> */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet"/>

      </head>
      <body className={` scrollbar-hide ${inter.className}`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}