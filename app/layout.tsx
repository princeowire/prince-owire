import type { ReactNode } from "react";
import "./globals.css";
import { Oswald, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: "Prince Owire — Frontend Developer",
  description:
    "Prince Owire builds responsive, interactive web experiences with JavaScript, React, and Next.js.",
  metadataBase: new URL("https://princedotdev.vercel.app"),
  openGraph: {
    title: "Prince Owire — Frontend Developer",
    description:
      "Interface engineering, thoughtful motion, and responsive digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${space.variable}`}>
      <body>
        <SmoothScroll >
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
