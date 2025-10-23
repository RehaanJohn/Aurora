import { http, createConfig } from 'wagmi';
import { mainnet, polygon, base, arbitrum } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect Project ID (optional, for WalletConnect support)
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

export const config = createConfig({
  chains: [mainnet, polygon, base, arbitrum],
  connectors: [
    injected(), // MetaMask, Coinbase Wallet, etc.
    walletConnect({ projectId }), // WalletConnect
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
});
