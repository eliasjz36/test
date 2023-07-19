"use client";

import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Web3OnboardProvider } from "@web3-onboard/react";
import { initWeb3Onboard } from "@/utils/web3onboard";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3OnboardProvider web3Onboard={initWeb3Onboard}>
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            limit={1}
          />
          <Navbar />
          {children}
        </Web3OnboardProvider>
      </body>
    </html>
  );
}
