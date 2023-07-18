'use client'

import { Navbar } from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { EtherspotTransactionKit } from '@etherspot/transaction-kit'
import { ethers, providers } from 'ethers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<EtherspotTransactionKit>
					<Providers>
						<ToastContainer
							position='top-right'
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
					</Providers>
				</EtherspotTransactionKit>
			</body>
		</html>
	)
}
