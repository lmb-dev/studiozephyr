import type { Metadata } from "next";
import { unstable_ViewTransition as ViewTransition } from 'react'
import { Cormorant_Garamond, Tangerine } from "next/font/google";
import "./globals.css";

import Header from "./layout/header";
import StarBackground from "./layout/starBackground";
import MouseFollower from "./layout/mouseFollower";
import Watermark from "./layout/watermark";


const tangerine = Tangerine  ({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--tangerine",
});

const cG = Cormorant_Garamond ({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Studio Zephyr",
  description: "Take a look around and enjoy! If you like what you see, feel free to reach out with any enquiries.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
      <html lang="en">
        <body className={`${cG.className} ${tangerine.variable} antialiased`}>
          <Header/>
          <MouseFollower/>
          <StarBackground/>                      
          <ViewTransition name="page-content"> 
            <main>{children}</main>
          </ViewTransition>
          <Watermark/>
        </body>
      </html>

  );
}
