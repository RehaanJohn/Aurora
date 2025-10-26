import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  X,
  Wallet,
  TrendingUp,
  CheckCircle,
  Loader2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import {
  useTokenBalance,
  useApproveToken,
  useStakeToJoin,
  useWaitForTransaction,
  getEtherscanLink,
  shortenHash,
  STAKING_CONFIG,
} from "../lib/contracts";

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  serverName: string;
  serverId: string;
}

type StakingStatus =
  | "input"
  | "approving"
  | "approved"
  | "staking"
  | "confirming"
  | "success"
  | "error";

export const StakingModal: React.FC<StakingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  serverName,
  serverId,
}) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const [stakeAmount, setStakeAmount] = useState("10");
  const [status, setStatus] = useState<StakingStatus>("input");
  const [approveHash, setApproveHash] = useState<`0x${string}` | null>(null);
  const [stakeHash, setStakeHash] = useState<`0x${string}` | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const { formattedBalance } = useTokenBalance();
  const { approve } = useApproveToken();
  const { stake } = useStakeToJoin();

  const { isConfirmed: isApproved } = useWaitForTransaction(
    approveHash || undefined
  );
  const { isConfirmed: isStakeConfirmed } = useWaitForTransaction(
    stakeHash || undefined
  );

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus("input");
      setStakeAmount("10");
      setApproveHash(null);
      setStakeHash(null);
      setErrorMessage("");
      setCopied(false);
    }
  }, [isOpen]);

  // Handle approve confirmation
  useEffect(() => {
    if (isApproved && status === "approving") {
      setStatus("approved");
      // Automatically proceed to staking
      handleStakeTransaction();
    }
  }, [isApproved, status]);

  // Handle stake confirmation
  useEffect(() => {
    if (isStakeConfirmed && status === "confirming") {
      setStatus("success");
    }
  }, [isStakeConfirmed, status]);

  const handleStake = async () => {
    if (!isConnected || !address) {
      setErrorMessage("Please connect your wallet");
      return;
    }

    // Check if on Sepolia
    if (chainId !== 11155111) {
      try {
        await switchChain({ chainId: 11155111 });
      } catch (error) {
        setErrorMessage("Please switch to Sepolia testnet");
        return;
      }
    }

    if (parseFloat(stakeAmount) < parseFloat(STAKING_CONFIG.minStakeAmount)) {
      setErrorMessage(`Minimum stake is ${STAKING_CONFIG.minStakeAmount} USDT`);
      return;
    }

    try {
      setStatus("approving");
      setErrorMessage("");

      // Step 1: Approve token spending
      const hash = await approve(stakeAmount);
      setApproveHash(hash);

      // Wait for confirmation happens in useEffect
    } catch (error: any) {
      console.error("Approval failed:", error);
      setErrorMessage(error.message || "Transaction failed. Please try again.");
      setStatus("error");
    }
  };

  const handleStakeTransaction = async () => {
    try {
      setStatus("staking");

      // Step 2: Stake tokens
      const hash = await stake(serverId, stakeAmount);
      setStakeHash(hash);
      setStatus("confirming");

      // Confirmation happens in useEffect
    } catch (error: any) {
      console.error("Staking failed:", error);
      setErrorMessage(error.message || "Staking failed. Please try again.");
      setStatus("error");
    }
  };

  const handleCopyHash = () => {
    if (stakeHash) {
      navigator.clipboard.writeText(stakeHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setStatus("input");
    setStakeAmount("10");
    setApproveHash(null);
    setStakeHash(null);
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-[500px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] text-white text-2xl">
              Stake to Join
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 rounded-full hover:bg-white/10"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>

          <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-6">
            Join <span className="text-white font-semibold">{serverName}</span>{" "}
            server by staking tokens on Sepolia testnet
          </p>

          {/* Input State */}
          {status === "input" && (
            <>
              {/* Balance Display */}
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="[font-family:'Lato',Helvetica] text-white/60 text-sm">
                    Your USDT Balance
                  </span>
                  <span className="[font-family:'Lato',Helvetica] text-white text-lg font-bold">
                    {formattedBalance} USDT
                  </span>
                </div>
                <div className="text-xs text-white/40">
                  Connected to{" "}
                  {chainId === 11155111 ? "Sepolia" : `Chain ${chainId}`}
                </div>
              </div>

              {/* Stake Amount Input */}
              <div className="mb-6">
                <label className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-2 block">
                  Stake Amount (min: {STAKING_CONFIG.minStakeAmount} USDT)
                </label>
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  min={STAKING_CONFIG.minStakeAmount}
                  className="h-12 bg-white/5 border-white/20 text-white text-lg [font-family:'Lato',Helvetica] placeholder:text-white/30"
                  placeholder="Enter amount"
                />
              </div>

              {/* Info Box */}
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="[font-family:'Lato',Helvetica] text-blue-300 text-sm font-semibold mb-1">
                      On-Chain Staking
                    </p>
                    <p className="[font-family:'Lato',Helvetica] text-blue-200/70 text-xs">
                      Your stake will be locked on Sepolia testnet. You'll
                      receive a transaction hash that can be verified on
                      Etherscan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="[font-family:'Lato',Helvetica] text-red-300 text-sm">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 h-12 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStake}
                  disabled={
                    !isConnected ||
                    parseFloat(stakeAmount) <
                      parseFloat(STAKING_CONFIG.minStakeAmount)
                  }
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Stake & Join Server
                </Button>
              </div>
            </>
          )}

          {/* Approving State */}
          {status === "approving" && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
              <p className="[font-family:'Lato',Helvetica] text-white text-lg mb-2">
                Approving USDT...
              </p>
              <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-4">
                Please confirm the approval in your wallet
              </p>
              {approveHash && (
                <p className="[font-family:'monospace'] text-white/40 text-xs">
                  {shortenHash(approveHash)}
                </p>
              )}
            </div>
          )}

          {/* Staking State */}
          {(status === "approved" || status === "staking") && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="[font-family:'Lato',Helvetica] text-white text-lg mb-2">
                Staking Tokens...
              </p>
              <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm">
                Please confirm the staking transaction in your wallet
              </p>
            </div>
          )}

          {/* Confirming State */}
          {status === "confirming" && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
              <p className="[font-family:'Lato',Helvetica] text-white text-lg mb-2">
                Confirming Transaction...
              </p>
              <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-4">
                Waiting for block confirmation
              </p>
              {stakeHash && (
                <div className="mt-4">
                  <p className="[font-family:'monospace'] text-white/60 text-xs mb-2">
                    {shortenHash(stakeHash)}
                  </p>
                  <a
                    href={getEtherscanLink(stakeHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    <span>View on Etherscan</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="[font-family:'Lato',Helvetica] text-white text-xl font-bold mb-2">
                Successfully Joined!
              </p>
              <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-6">
                You've staked {stakeAmount} USDT and joined {serverName}
              </p>

              {/* Transaction Hash Display */}
              {stakeHash && (
                <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="[font-family:'Lato',Helvetica] text-white/60 text-sm">
                      Transaction Hash
                    </span>
                    <button
                      onClick={handleCopyHash}
                      className="flex items-center gap-1 text-white/60 hover:text-white text-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="[font-family:'monospace'] text-white text-sm break-all mb-3">
                    {stakeHash}
                  </p>
                  <a
                    href={getEtherscanLink(stakeHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    <span>View on Etherscan</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              <Button
                onClick={() => {
                  if (onSuccess) {
                    onSuccess();
                  }
                  handleClose();
                }}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center py-8">
              <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="[font-family:'Lato',Helvetica] text-white text-xl font-bold mb-2">
                Transaction Failed
              </p>
              <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-2">
                {errorMessage || "Something went wrong. Please try again."}
              </p>
              {(approveHash || stakeHash) && (
                <p className="[font-family:'monospace'] text-white/40 text-xs mb-6">
                  {shortenHash((stakeHash || approveHash)!)}
                </p>
              )}
              <Button
                onClick={() => {
                  setStatus("input");
                  setErrorMessage("");
                }}
                className="w-full h-12 bg-white/10 hover:bg-white/20 text-white font-semibold"
              >
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
