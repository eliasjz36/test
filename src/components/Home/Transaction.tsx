"use client";

import Results from "@/components/Home/Results";
import TransactionForm from "@/components/Home/TransactionForm";
import useWalletStore from "@/store/wallet";
import { filterAddressByChainId } from "@/utils/filterAddressByChainId";
import { initWeb3Onboard } from "@/utils/web3onboard";
import {
  EtherspotBatches,
  EtherspotBatch,
  EtherspotTransaction,
  useEtherspotAddresses,
  useEtherspotTransactions,
  IEstimatedBatches,
} from "@etherspot/transaction-kit";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Transaction() {
  const { destinyData } = useWalletStore();
  const [web3Onboard, setWeb3Onboard] = useState(null);
  const etherspotAddresses = useEtherspotAddresses();
  const { estimate, send } = useEtherspotTransactions();

  const [latestEstimationData, setLatestEstimationData] = useState<
    IEstimatedBatches[] | null
  >(null);
  const [latestSendData, setLatestSendData] = useState<any>(null);

  const runEstimation = async () => {
    setLatestSendData(false);

    const estimationData = await toast.promise(estimate(), {
      pending: "Estimating...",
      success: "Estimation successful!",
      error: "Estimation failed!",
    });
    console.log("Estimation Data:", estimationData);

    if (JSON.stringify(estimationData).includes("reverted")) {
      alert(
        "Sorry, an estimation error occured. This may happen if:\n\n- The address or amount entered were invalid\n- Your Etherspot Smart Wallet account has no funds\n\nPlease check these points and try again."
      );

      return;
    }

    setLatestEstimationData(estimationData);
  };

  const runSend = async () => {
    if (!latestEstimationData) {
      alert(
        "You must always estimate successfully before sending. This ensures that the transaction cost is up to date and validated.\n\nPlease try to estimate and send again."
      );

      return;
    }

    const sendResult = await toast.promise(send(), {
      pending: "Sending...",
      success: "Send successful!",
      error: "Send failed!",
    });
    console.log("Send Data:", sendResult);

    if (JSON.stringify(sendResult).includes("reverted")) {
      alert(
        "There was a problem trying to send your transaction. This can happen for a variety of reasons, but the most common problems are bad blockchain conditions or an out of date estimate.\n\nPlease try to estimate, then send again."
      );

      return;
    }

    setLatestSendData(sendResult);
  };

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard as any);
  }, []);

  if (!web3Onboard) return <div>Loading...</div>;

  return (
    <EtherspotBatches>
      <EtherspotBatch chainId={80001}>
        <EtherspotTransaction
          to={destinyData.addressTo}
          value={destinyData.amount}
        >
          <main className="flex flex-col min-h-screen py-2 from-gray-900 via-gray-800 to-gray-900 bg-gradient-to-r">
            <div className="flex flex-col mt-28 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <i className="text-4xl font-bold text-white mb-1">🦄</i>
                <h1 className="text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  El Reseñas
                </h1>

                <h2 className="text-xl font-bold mb-14">
                  Your Etherspot Address:{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    {filterAddressByChainId(etherspotAddresses, 80001)}
                  </span>
                </h2>
              </div>

              <TransactionForm
                runSend={runSend}
                runEstimation={runEstimation}
              />
              <Results
                etherspotAddresses={etherspotAddresses}
                latestEstimationData={latestEstimationData}
                latestSendData={latestSendData}
              />
            </div>
          </main>
        </EtherspotTransaction>
      </EtherspotBatch>
    </EtherspotBatches>
  );
}
