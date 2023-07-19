"use client";

import { useState } from "react";

import { useConnectWallet } from "@web3-onboard/react";

const Navbar = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <nav className="flex w-full items-center justify-between p-4 md:justify-center animate-slide-in bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="flex-initial items-center justify-center md:flex-[0.5]">
        <a href="#" className="flex max-w-fit">
          <h1 className="text-2xl font-bold text-white">CryptoBro</h1>
        </a>
      </div>
      <ul className="flex-initial list-none flex-row items-center justify-between text-white space-x-4">
        <button
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
          className="bg-white py-2 px-4 rounded text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-md"
        >
          {connecting ? "Connecting" : wallet ? "Disconnect" : "Connect"}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
