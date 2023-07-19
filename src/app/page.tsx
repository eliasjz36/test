"use client";

import { EtherspotTransactionKit } from "@etherspot/transaction-kit";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import Transaction from "@/components/Home/Transaction";
import { WalletProviderLike } from "etherspot";

export default function Home() {
  const [{ wallet }] = useConnectWallet();
  const [{ connectedChain }] = useSetChain();
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (!wallet?.provider) {
      return;
    } else {
      const provider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );

      setProvider(provider);
    }
  }, [wallet]);

  console.log("wallet", provider, "chainId", connectedChain?.id);

  return (
    <>
      {provider?.provider && connectedChain?.id ? (
        <EtherspotTransactionKit
          provider={provider.provider as WalletProviderLike}
          chainId={80001}
        >
          <Transaction />
        </EtherspotTransactionKit>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
          <h1
            className="text-3xl font-bold animate-pulse text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500
					"
          >
            Please connect your wallet 🦄
          </h1>
        </div>
      )}
    </>
  );
}
