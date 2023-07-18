export function filterAddressByChainId(etherspotAddresses, chainId) {
	if (!etherspotAddresses) return '?'

	const filtered = etherspotAddresses.filter((a) => a.chainId === chainId)
	if (filtered[0]) {
		return filtered[0].address
	} else {
		return '?'
	}
}
