"use client";
import { Astar, Sepolia } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Shibuya } from "../chains";
import { contractSelector } from "../states";

const ThirdWeb = ({ children }: { children: React.ReactNode }) => {
  const { chain } = useRecoilValue(contractSelector);

  return (
    <ThirdwebProvider
      supportedChains={[Astar, Shibuya, Sepolia]}
      activeChain={chain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        walletConnect(),
        coinbaseWallet(),
        localWallet(),
        embeddedWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ThirdWeb>{children}</ThirdWeb>
    </RecoilRoot>
  );
}
