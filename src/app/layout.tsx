import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ContactPopup from "@/components/ContactPopup";
import CyberScanner from "@/components/CyberScanner";
import BackToHome from "@/components/BackToHome";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Nawod Sanjana | Software Engineer",
  description: "High-performance software engineer specialized in Python, ReactJS, and AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        <CustomCursor />
        <BackToHome />
        <ContactPopup />
        <CyberScanner />
        <Background />
        <Navbar />
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

