import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Room } from "./Room";


const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"]

});

export const metadata: Metadata = {
  title: "WebFlow",
  description: "A minimalist WebFlow  App using fabric.js and Liveblocks for realtime Collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${workSans.className} bg-primary-grey-200`}>
        <Room>
          {children}
        </Room>
      </body>
    </html>
    </ClerkProvider>
  );
}
