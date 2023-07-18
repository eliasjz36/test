'use client'

import * as React from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { Web3Modal } from '@web3modal/react'
import { w3mProvider, w3mConnectors, EthereumClient } from '@web3modal/ethereum'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'f179f4211185feb02307c87d3d8b86ea'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, chains }),
	publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => setMounted(true), [])
	return (
		<>
			<WagmiConfig config={wagmiConfig}>
				<RainbowKitProvider chains={chains}>
					{mounted && children}
				</RainbowKitProvider>
			</WagmiConfig>

			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</>
	)
}
