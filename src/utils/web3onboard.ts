import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

const INFURA_KEY = "";

const ethereumRopsten = {
  id: "0x3",
  token: "rETH",
  label: "Ethereum Ropsten",
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};
const polygonMumbai = {
  id: "0x13881",
  token: "MATIC",
  label: "Polygon - Mumbai",
  rpcUrl: "https://matic-mumbai.chainstacklabs.com",
};

const chains = [ethereumRopsten, polygonMumbai];

const wallets = [injectedModule()];

export const initWeb3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: "<svg>App Icon</svg>",
    description: "A demo of Web3-Onboard.",
  },
  theme: "dark",
});