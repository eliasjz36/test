'use client'

import Results from '@/components/Home/Results'
import TransactionForm from '@/components/Home/TransactionForm'
import useWalletStore from '@/store/wallet'
import { filterAddressByChainId } from '@/utils/filterAddressByChainId'
import {
	EtherspotBatches,
	EtherspotBatch,
	EtherspotTransaction,
	useEtherspotAddresses,
	useEtherspotTransactions,
	EtherspotTransactionKit,
} from '@etherspot/transaction-kit'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { Etherspot } from '@etherspot/react-transaction-buidler'
import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'
import { initWeb3Onboard } from '@/utils/web3onboard'
// import { buildApprovedNamespaces } from '@walletconnect/utils'

export default function Home() {
	const { destinyData, checkIfWalletIsConnected, checkIfWalletIsInstalled } =
		useWalletStore()
	const account = useAccount()
	const [connectedProvider, setConnectedProvider] = useState(false)
	const [web3Onboard, setWeb3Onboard] = useState(null)

	// const etherspotAddresses = useEtherspotAddresses()
	const { estimate, send } = useEtherspotTransactions()

	const [latestEstimationData, setLatestEstimationData] = useState(false)
	const [latestSendData, setLatestSendData] = useState(false)

	const runEstimation = async () => {
		setLatestSendData(false)

		const estimationData = await toast.promise(estimate(), {
			pending: 'Estimating...',
			success: 'Estimation successful!',
			error: 'Estimation failed!',
		})
		console.log('Estimation Data:', estimationData)

		if (JSON.stringify(estimationData).includes('reverted')) {
			alert(
				'Sorry, an estimation error occured. This may happen if:\n\n- The address or amount entered were invalid\n- Your Etherspot Smart Wallet account has no funds\n\nPlease check these points and try again.'
			)

			return
		}

		setLatestEstimationData(estimationData)
	}

	const runSend = async () => {
		if (!latestEstimationData) {
			alert(
				'You must always estimate successfully before sending. This ensures that the transaction cost is up to date and validated.\n\nPlease try to estimate and send again.'
			)

			return
		}

		const sendResult = await toast.promise(send(), {
			pending: 'Sending...',
			success: 'Send successful!',
			error: 'Send failed!',
		})
		console.log('Send Data:', sendResult)

		if (JSON.stringify(sendResult).includes('reverted')) {
			alert(
				'There was a problem trying to send your transaction. This can happen for a variety of reasons, but the most common problems are bad blockchain conditions or an out of date estimate.\n\nPlease try to estimate, then send again.'
			)

			return
		}

		setLatestSendData(sendResult)
	}

	// useEffect(() => {
	// 	// checkIfWalletIsInstalled()
	// 	// checkIfWalletIsConnected()
	// 	console.log('Etherspot Addresses:', etherspotAddresses)
	// }, [etherspotAddresses])

	useEffect(() => {
		const core = new Core({
			projectId: 'f179f4211185feb02307c87d3d8b86ea',
		})

		const init = async () => {
			const web3wallet = await Web3Wallet.init({
				core, // <- pass the shared `core` instance
				metadata: {
					name: 'Demo app',
					description: 'Demo Client as Wallet/Peer',
					url: 'www.walletconnect.com',
					icons: [],
				},
			})

			console.log(web3wallet)

			web3wallet.on('connect', async (error, payload) => {
				if (error) {
					throw error
				}

				const { accounts, chainId } = payload

				console.log(accounts, chainId)

				// ------- namespaces builder util ------------ //
			})

			web3wallet.on('session_proposal', async (sessionProposal) => {
				const { id, params } = sessionProposal

				// ------- namespaces builder util ------------ //
				// const approvedNamespaces = buildApprovedNamespaces({
				// 	proposal: params,
				// 	supportedNamespaces: {
				// 		eip155: {
				// 			chains: ['eip155:1', 'eip155:137'],
				// 			methods: ['eth_sendTransaction', 'personal_sign'],
				// 			events: ['accountsChanged', 'chainChanged'],
				// 			accounts: [
				// 				'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
				// 				'eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
				// 			],
				// 		},
				// 	},
				// })
				// ------- end namespaces builder util ------------ //

				const session = await web3wallet.approveSession({
					id,
					// namespaces: approvedNamespaces,
				})

				console.log(session)
			})
		}

		init()
	}, [account])

	useEffect(() => {
		setWeb3Onboard(initWeb3Onboard)
	}, [])

	if (!web3Onboard) return <div>Loading...</div>

	return (
		<>
			<EtherspotBatches>
				<EtherspotBatch>
					<EtherspotTransaction
						to={destinyData.addressTo}
						value={destinyData.amount}
					>
						<main className='flex flex-col min-h-screen py-2 from-gray-900 via-gray-800 to-gray-900 bg-gradient-to-r'>
							<div className='flex flex-col mt-28 items-center justify-center'>
								<div className='flex flex-col items-center justify-center'>
									<i className='text-4xl font-bold text-white mb-1'>🦄</i>
									<h1 className='text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
										El Reseñas
									</h1>

									<h2 className='text-2xl font-bold text-white mb-14'>
										{/* {filterAddressByChainId(etherspotAddresses, 80001)} */}
									</h2>
								</div>

								<TransactionForm
									runSend={runSend}
									runEstimation={runEstimation}
								/>
								{/* <Results
									etherspotAddresses={etherspotAddresses}
									latestEstimationData={latestEstimationData}
									latestSendData={latestSendData}
								/> */}
							</div>
						</main>
					</EtherspotTransaction>
				</EtherspotBatch>
			</EtherspotBatches>
		</>
	)
}
