"use client";
import { ConnectWallet, useWallet } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { chainIdState, contractSelector } from "../states";

export default function NavBar() {
  const wallet = useWallet();
  const [chainId, setChainId] = useRecoilState(chainIdState);

  useEffect(() => {
    wallet?.getChainId().then((chainId) => setChainId(chainId));
  }, [wallet, chainId, setChainId]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  const { name } = useRecoilValue(contractSelector);

  return (
    <nav className="z-10 px-6 py-4 w-full items-center justify-between font-mono text-sm flex">
      <p>Chain: {name}</p>
      <ConnectWallet theme={"light"} modalSize={"wide"} />
    </nav>
  );
}
