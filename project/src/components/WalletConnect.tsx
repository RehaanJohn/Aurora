import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Wallet, LogOut, ChevronDown, Check } from 'lucide-react';
import { formatEther } from 'viem';
import { mainnet, polygon, base, arbitrum } from 'wagmi/chains';

const supportedChains = [mainnet, polygon, base, arbitrum];

export const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showNetworks, setShowNetworks] = useState(false);
  const [showWallets, setShowWallets] = useState(false);

  // Get balance for connected wallet
  const { data: balanceData } = useBalance({
    address: address,
  });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getCurrentChain = () => {
    return supportedChains.find(chain => chain.id === chainId) || mainnet;
  };

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    return num.toFixed(4);
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
          <CardContent className="p-4 space-y-3">
            {/* Network Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowNetworks(!showNetworks)}
                className="w-full justify-between px-3 py-2 h-auto hover:bg-white/10 text-white transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="[font-family:'Lato',Helvetica] text-sm">
                    {getCurrentChain().name}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {showNetworks && (
                <Card className="absolute top-full left-0 right-0 mt-2 bg-[#2b2d31] border border-white/20 shadow-2xl z-50">
                  <CardContent className="p-2">
                    {supportedChains.map((chain) => (
                      <Button
                        key={chain.id}
                        variant="ghost"
                        onClick={() => {
                          switchChain({ chainId: chain.id });
                          setShowNetworks(false);
                        }}
                        className="w-full justify-between px-3 py-2 h-auto hover:bg-white/10 text-white"
                      >
                        <span className="[font-family:'Lato',Helvetica] text-sm">{chain.name}</span>
                        {chainId === chain.id && <Check className="w-4 h-4" />}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator className="bg-white/10" />

            {/* Wallet Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-white/60" />
                <span className="[font-family:'Lato',Helvetica] font-mono text-white text-sm">
                  {formatAddress(address)}
                </span>
              </div>

              {balanceData && (
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="[font-family:'Lato',Helvetica] text-white/60 text-xs mb-1">
                    Balance
                  </p>
                  <p className="[font-family:'Lato',Helvetica] font-bold text-white text-lg">
                    {formatBalance(formatEther(balanceData.value))} {balanceData.symbol}
                  </p>
                </div>
              )}
            </div>

            <Separator className="bg-white/10" />

            {/* Disconnect Button */}
            <Button
              variant="ghost"
              onClick={() => disconnect()}
              className="w-full justify-start gap-3 px-3 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="[font-family:'Lato',Helvetica] text-sm">Disconnect</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowWallets(true)}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Wallet className="w-5 h-5 mr-2" />
        <span className="[font-family:'Lato',Helvetica] text-[15px]">
          Connect Wallet
        </span>
      </Button>

      {showWallets && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-[400px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] text-white text-2xl">
                  Connect Wallet
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowWallets(false)}
                  className="h-8 w-8 rounded-full hover:bg-white/10"
                >
                  <span className="text-white text-xl">×</span>
                </Button>
              </div>

              <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-6 text-center">
                Choose how you want to connect. There are several wallet providers.
              </p>

              <div className="space-y-3">
                {connectors.map((connector) => (
                  <Button
                    key={connector.id}
                    onClick={() => {
                      connect({ connector });
                      setShowWallets(false);
                    }}
                    className="w-full h-14 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg flex items-center justify-center gap-3 transition-all duration-300 border border-white/20"
                  >
                    <Wallet className="h-5 w-5" />
                    <span className="[font-family:'Lato',Helvetica]">
                      {connector.name}
                    </span>
                  </Button>
                ))}
              </div>

              <p className="[font-family:'Lato',Helvetica] text-white/40 text-xs text-center mt-6">
                By connecting, you agree to our Terms of Service
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
