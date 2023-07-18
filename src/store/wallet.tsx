import {
	MetaMaskWalletProvider,
	Sdk,
	WalletConnectWalletProvider,
} from 'etherspot'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

type WalletState = {
	connected: boolean
	address: string | null
	balance: number
	transactions: any[]
	destinyData: {
		addressTo: string
		amount: string
	}
}

type WalletActions = {
	handleDestinyData: (e: any, name: string) => void
	getAllTransactions: () => void
	checkIfWalletIsInstalled: () => void
	checkIfWalletIsConnected: () => void
	checkIfTransactionExists: () => void
	connectWallet: () => Promise<void>
	disconnectWallet: () => void
}

type WalletStore = WalletState & WalletActions

const useWalletStore = create<WalletStore>()(
	persist(
		devtools((set, get) => ({
			connected: false,
			address: null,
			balance: 0,
			transactions: [],
			destinyData: {
				addressTo: '0x271Ae6E03257264F0F7cb03506b12A027Ec53B31',
				amount: '0.001',
			},

			handleDestinyData: (value: string, name: string) => {
				set((state) => ({
					...state,
					destinyData: {
						...state.destinyData,
						[name]: value,
					},
				}))
			},

			getAllTransactions: async () => {
				try {
					// Lógica asincrónica para obtener todas las transacciones
					// Por ejemplo, se podría realizar una solicitud HTTP a una API
					const response = await fetch('https://example.com/transactions')
					const data = await response.json()

					// Actualiza el estado del store
					set({ transactions: data })
				} catch (error) {
					console.error('Error al obtener las transacciones:', error)
				}
			},

			checkIfWalletIsInstalled: async () => {
				try {
					if (!MetaMaskWalletProvider.detect()) {
						toast.error('No se ha detectado una wallet', {
							toastId: 'wallet-error',
						})
						return
					}

					const walletConnect = new WalletConnect({
						// bridge: 'https://bridge.walletconnect.org',
						qrcodeModal: QRCodeModal,
					})

					if (!walletConnect.connected) {
						await walletConnect.createSession()
					}

					const walletProvider =
						WalletConnectWalletProvider.connect(walletConnect)

					const sdk = new Sdk(walletProvider)

					console.log(sdk)

					console.info('SDK created')

					// toast.success('Wallet detectada', {
					// 	toastId: 'wallet-success',
					// })
				} catch (error) {
					toast.error('Error al conectar la wallet', {
						toastId: 'wallet-error',
					})
				}
			},

			checkIfWalletIsConnected: async () => {
				try {
					const { ethereum } = window

					const accounts = await ethereum.request({ method: 'eth_accounts' })

					if (accounts.length === 0) {
						toast.warn('No se ha conectado una wallet', {
							toastId: 'wallet-error',
						})
						return
					}

					// toast.success('Wallet conectada', {
					// 	toastId: 'wallet-success',
					// })
				} catch (error) {
					toast.error('Error al conectar la wallet', {
						toastId: 'wallet-error',
					})
				}
			},

			checkIfTransactionExists: () => {
				try {
					throw new Error('Error de prueba')
				} catch (error) {
					toast.error('Error al conectar la wallet', {
						toastId: 'wallet-error',
					})
				}
			},

			connectWallet: async () => {
				try {
					const walletProvider = await MetaMaskWalletProvider.connect()

					const sdk = new Sdk(walletProvider)

					const { address, balance } = await sdk.initialize()

					const data = {
						address,
						balance: balance.toNumber(),
					}

					toast.success('Wallet conectada', {
						toastId: 'wallet-success',
					})

					// Actualiza el estado del store
					set({ connected: true, address: data.address, balance: data.balance })
				} catch (error) {
					toast.error('Error al conectar la wallet', {
						toastId: 'wallet-error',
					})

					console.error('Error al conectar la wallet:', error)
				}
			},

			disconnectWallet: () => {
				// Lógica para desconectarse de la wallet 3.0
				// Por ejemplo, limpiar los datos de la sesión o realizar otras operaciones necesarias

				// Actualiza el estado del store
				set({ connected: false, address: null, balance: 0 })
			},

			sendTransaction: async (to: string, amount: number) => {
				try {
					// Lógica para enviar una transacción a la wallet 3.0
					// Por ejemplo, se podría realizar una solicitud HTTP a una API
					const response = await fetch('https://example.com/send-transaction', {
						method: 'POST',
						body: JSON.stringify({ to, amount }),
					})
					const data = await response.json()

					// Actualiza el estado del store
					set({ balance: data.balance })
				} catch (error) {
					console.error('Error al enviar la transacción:', error)
				}
			},
		})),
		{ name: 'wallet-store' }
	)
)

export default useWalletStore
