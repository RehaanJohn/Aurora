import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { NexusSDK } from '@avail-project/nexus-core';
import type { providers } from 'ethers';

// Nexus SDK configuration for testnet
export const NEXUS_CONFIG = {
  network: 'testnet' as const, // Using testnet for development
  supportedChains: {
    sepolia: 11155111,
    optimismSepolia: 11155420,
    baseSepolia: 84532,
    arbitrumSepolia: 421614,
    polygonAmoy: 80002,
  },
};

// Staking configuration
export const STAKING_CONFIG = {
  minStakeAmount: '10', // Minimum 10 tokens
  supportedTokens: ['USDT', 'USDC', 'ETH'] as const,
  defaultToken: 'USDT' as const,
  defaultTargetChain: 11155111, // Sepolia as default target
};

// Chain name mapping
export const CHAIN_NAMES: Record<number, string> = {
  11155111: 'Sepolia',
  11155420: 'Optimism Sepolia',
  84532: 'Base Sepolia',
  421614: 'Arbitrum Sepolia',
  80002: 'Polygon Amoy',
};

// Initialize Nexus SDK
export function useNexusClient() {
  const { address, isConnected } = useAccount();
  const [sdk, setSdk] = useState<NexusSDK | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      if (!isConnected || !window.ethereum) {
        setSdk(null);
        setIsReady(false);
        return;
      }

      try {
        // Initialize Nexus SDK with testnet configuration
        const nexusSDK = new NexusSDK({ network: NEXUS_CONFIG.network });

        // Initialize with the Web3 provider
        const provider = window.ethereum as any;
        await nexusSDK.initialize(provider);

        setSdk(nexusSDK);
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize Nexus SDK:', error);
        setSdk(null);
        setIsReady(false);
      }
    };

    initializeSDK();
  }, [isConnected]);

  // Wrapper methods for staking operations
  const getUnifiedBalance = async (token: string) => {
    if (!sdk || !address) {
      throw new Error('SDK not initialized or wallet not connected');
    }

    try {
      // Use SDK's unified balance method if available
      // For now, we'll aggregate manually across supported chains
      const balances = await Promise.all(
        Object.entries(NEXUS_CONFIG.supportedChains).map(async ([chainName, chainId]) => {
          try {
            // This would use the actual SDK balance method
            // const balance = await sdk.getBalance(chainId, address, token);
            // For now, returning mock data structure
            return {
              chainId,
              chainName: CHAIN_NAMES[chainId] || chainName,
              balance: '0', // Would be real balance
            };
          } catch (error) {
            console.error(`Failed to get balance for ${chainName}:`, error);
            return {
              chainId,
              chainName: CHAIN_NAMES[chainId] || chainName,
              balance: '0',
            };
          }
        })
      );

      const total = balances.reduce((sum, b) => {
        return sum + parseFloat(b.balance || '0');
      }, 0);

      return {
        total: total.toFixed(2),
        chains: balances,
      };
    } catch (error) {
      console.error('Failed to get unified balance:', error);
      throw error;
    }
  };

  const stakeToJoinServer = async (params: {
    amount: string;
    token: string;
    serverId: string;
    serverName: string;
  }) => {
    if (!sdk || !address) {
      throw new Error('SDK not initialized or wallet not connected');
    }

    try {
      // Use Nexus SDK to bridge tokens as a "stake"
      // This demonstrates cross-chain token transfer
      const result = await sdk.bridge({
        token: params.token as 'USDT' | 'USDC' | 'ETH',
        amount: parseFloat(params.amount),
        chainId: STAKING_CONFIG.defaultTargetChain,
      });

      return {
        intentId: result.hash || `intent_${Date.now()}`,
        status: 'pending' as const,
        hash: result.hash,
        serverId: params.serverId,
        amount: params.amount,
        token: params.token,
      };
    } catch (error) {
      console.error('Failed to stake:', error);
      throw error;
    }
  };

  return {
    sdk,
    isReady,
    address,
    getUnifiedBalance,
    stakeToJoinServer,
  };
}
