"use client";

import { useState } from "react";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import NavbarItem from "./NavbarItem";
import { useConnectWallet } from "@web3-onboard/react";

const Navbar = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between p-4 md:justify-center animate-slide-in bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="flex-initial items-center justify-center md:flex-[0.5]">
        <a href="#" className="flex max-w-fit">
          <h1 className="text-2xl font-bold text-white">CryptoBro</h1>
        </a>
      </div>
      <ul className="hidden flex-initial list-none flex-row items-center justify-between text-white md:flex space-x-4">
        <button
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
          className="bg-white py-2 px-4 rounded text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-md"
        >
          {connecting ? "Connecting" : wallet ? "Disconnect" : "Connect"}
        </button>
      </ul>
      <div className="relative flex">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="cursor-pointer text-white md:hidden"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="cursor-pointer text-white md:hidden"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="blue-glassmorphism fixed -top-0 -right-2 z-10 flex h-screen w-[70vw] animate-slide-in list-none
            flex-col items-end justify-start rounded-md p-3 text-white shadow-2xl md:hidden"
          >
            <li className="my-2 w-full text-xl">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
