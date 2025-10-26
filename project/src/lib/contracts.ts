import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { parseUnits, type Address } from 'viem';

// Contract addresses (will be updated after deployment)
export const CONTRACT_ADDRESSES = {
  // For now using placeholder addresses - replace after deployment
  stakingContract: '0x0000000000000000000000000000000000000000' as Address,
  mockUSDT: '0x0000000000000000000000000000000000000000' as Address,
  registryContract: '0x0000000000000000000000000000000000000000' as Address,
} as const;

// Staking configuration
export const STAKING_CONFIG = {
  minStakeAmount: '1', // Minimum stake amount in USDT
  decimals: 6, // USDT has 6 decimals
} as const;

// ERC20 ABI (for token approval and balance checks)
export const ERC20_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "faucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// CommunityStaking ABI
export const STAKING_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "serverId", "type": "string" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "stakeToJoin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" },
      { "internalType": "string", "name": "serverId", "type": "string" }
    ],
    "name": "checkMembership",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "serverId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "Staked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "serverId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "MembershipGranted",
    "type": "event"
  }
] as const;

// Hook to check token balance
export function useTokenBalance() {
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESSES.mockUSDT,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  return {
    balance: balance ? balance.toString() : '0',
    formattedBalance: balance ? (Number(balance) / 1e6).toFixed(2) : '0.00',
  };
}

// Hook to approve token spending
export function useApproveToken() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  const approve = async (amount: string) => {
    const amountInWei = parseUnits(amount, 6); // USDT has 6 decimals

    const hash = await writeContractAsync({
      address: CONTRACT_ADDRESSES.mockUSDT,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [CONTRACT_ADDRESSES.stakingContract, amountInWei],
    });

    return hash;
  };

  return { approve, hash, isPending };
}

// Hook to stake tokens
export function useStakeToJoin() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  const stake = async (serverId: string, amount: string) => {
    const amountInWei = parseUnits(amount, 6); // USDT has 6 decimals

    const hash = await writeContractAsync({
      address: CONTRACT_ADDRESSES.stakingContract,
      abi: STAKING_ABI,
      functionName: 'stakeToJoin',
      args: [serverId, amountInWei],
    });

    return hash;
  };

  return { stake, hash, isPending };
}

// Hook to check membership
export function useCheckMembership(serverId: string) {
  const { address } = useAccount();

  const { data: isMember } = useReadContract({
    address: CONTRACT_ADDRESSES.stakingContract,
    abi: STAKING_ABI,
    functionName: 'checkMembership',
    args: address && serverId ? [address, serverId] : undefined,
  });

  return { isMember: !!isMember };
}

// Hook to mint test tokens (for testing only)
export function useMintTestTokens() {
  const { writeContractAsync, isPending } = useWriteContract();

  const mintTokens = async (amount: string = '100') => {
    const amountInWei = parseUnits(amount, 6);

    const hash = await writeContractAsync({
      address: CONTRACT_ADDRESSES.mockUSDT,
      abi: ERC20_ABI,
      functionName: 'faucet',
      args: [amountInWei],
    });

    return hash;
  };

  return { mintTokens, isPending };
}

// Helper to wait for transaction confirmation
export function useWaitForTransaction(hash: `0x${string}` | undefined) {
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  return { isConfirming: isLoading, isConfirmed: isSuccess, isError };
}

// Helper to get Etherscan link
export function getEtherscanLink(hash: string, chainId: number = 11155111): string {
  const baseUrls: Record<number, string> = {
    1: 'https://etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    84532: 'https://sepolia.basescan.org',
  };

  const baseUrl = baseUrls[chainId] || 'https://sepolia.etherscan.io';
  return `${baseUrl}/tx/${hash}`;
}

// Helper to shorten hash for display
export function shortenHash(hash: string, chars: number = 6): string {
  if (!hash) return '';
  return `${hash.substring(0, chars + 2)}...${hash.substring(hash.length - chars)}`;
}
