import React from "react";
import { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Investment Portfolio Dashboard",
  description: "A dashboard designed to keep track of all your investments",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
