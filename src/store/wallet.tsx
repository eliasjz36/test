import {
  MetaMaskWalletProvider,
  Sdk,
  WalletConnectWalletProvider,
} from "etherspot";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

type WalletState = {
  connected: boolean;
  address: string | null;
  balance: number;
  transactions: any[];
  destinyData: {
    addressTo: string;
    amount: string;
  };
  provider: any;
  chainId: any;
};

type WalletActions = {
  handleDestinyData: (e: any, name: string) => void;
  sendTransaction: (to: string, amount: number) => void;
};

type WalletStore = WalletState & WalletActions;

const useWalletStore = create<WalletStore>()(
  persist(
    devtools((set, get) => ({
      connected: false,
      address: null,
      balance: 0,
      transactions: [],
      destinyData: {
        addressTo: "0xd25C7E55af2A7870fa74868377Df4C978011aC54",
        amount: "0.001",
      },
      provider: null,
      chainId: null,

      handleDestinyData: (value: string, name: string) => {
        set((state) => ({
          ...state,
          destinyData: {
            ...state.destinyData,
            [name]: value,
          },
        }));
      },

      sendTransaction: async (to: string, amount: number) => {
        try {
          const response = await fetch("https://example.com/send-transaction", {
            method: "POST",
            body: JSON.stringify({ to, amount }),
          });
          const data = await response.json();

          set({ balance: data.balance });
        } catch (error) {
          console.error("Error al enviar la transacción:", error);
        }
      },
    })),
    { name: "wallet-store" }
  )
);

export default useWalletStore;
