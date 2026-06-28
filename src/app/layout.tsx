import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gabriel Barclay | Traditional & Digital Art",
  description: "Contemporary portfolio of traditional and digital art and illustration by Gabriel Barclay. Explore the vibrant works.",
  keywords: ["traditional art", "digital art", "contemporary artist", "art portfolio", "illustration", "Gabriel Barclay"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-void ${cormorant.variable} ${inter.variable}`}>
      <body className={`${inter.className} antialiased bg-void selection:bg-amberGold/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
