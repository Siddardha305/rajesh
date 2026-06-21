import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Rajesh Vasukuri | Graphic Designer & Visual Storyteller",
  description: "Portfolio of Rajesh Vasukuri, a professional Graphic Designer with 4+ years of experience specializing in high-performance YouTube thumbnails, social media creatives, posters, and branding. Based in Andhra Pradesh, India.",
  keywords: ["Rajesh Vasukuri", "Graphic Designer", "Thumbnail Designer", "Photoshop Expert", "Illustrator", "Youtube Thumbnails", "Poster Design", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
