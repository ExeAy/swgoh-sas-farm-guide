import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "../src/components/theme-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoS Farm Guide",
  description: "Farm guide for members of SaS Revenge of the Schwartz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
