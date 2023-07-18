import useWalletStore from '@/store/wallet'
import { useEtherspotTransactions } from '@etherspot/transaction-kit'
import { useState } from 'react'

const TransactionForm = ({ runSend, runEstimation }) => {
	const { destinyData, handleDestinyData } = useWalletStore()

	return (
		<div className='flex flex-col items-center justify-center'>
			<input
				type='text'
				placeholder='Address'
				className='w-96 p-2 my-2 text-black rounded-md'
				onChange={(e) => handleDestinyData(e.target.value, 'addressTo')}
				value={destinyData.addressTo}
			/>
			<input
				type='text'
				placeholder='Amount'
				className='w-96 p-2 my-2 text-black rounded-md'
				onChange={(e) => handleDestinyData(e.target.value, 'amount')}
				value={destinyData.amount}
			/>

			<div className='flex items-center justify-center space-x-4 w-full'>
				<button
					className='w-full p-2 my-2 text-white rounded-md bg-blue-600 hover:bg-blue-700'
					onClick={runEstimation}
				>
					Estimate
				</button>
				<button
					className='w-full p-2 my-2 text-white rounded-md bg-blue-600 hover:bg-blue-700'
					onClick={runSend}
				>
					Send
				</button>
			</div>
		</div>
	)
}

export default TransactionForm
