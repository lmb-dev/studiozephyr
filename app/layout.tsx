import type { Metadata } from "next";
import { Give_You_Glory, Allura } from "next/font/google";
import "./globals.css";

import Header from "./layout/header";
import StarBackground from "./layout/starBackground";
import MouseFollower from "./layout/mouseFollower";
import Watermark from "./layout/watermark";


const allura = Allura({
  subsets: ["latin"],
  weight: "400"
});

const glory = Give_You_Glory({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Studio Zephyr",
  description: "Take a look around and enjoy! If you like what you see, feel free to reach out with any enquiries.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/moon.webp" as="image" />
      </head>

      <body className={`${glory.className} ${allura.className} antialiased`}>
        <Header/>
        <StarBackground/>        
        <MouseFollower/>
        <main>{children}</main>
        <Watermark/>
      </body>
    </html>
  );
}
