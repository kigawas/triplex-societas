import { atom, selector } from "recoil";

import { CONTRACT_CONFIG } from "./config";

export const chainIdState = atom({
  key: "chainIdState",
  default: 0,
});

export const contractSelector = selector({
  key: "contractSelector",
  get: ({ get }) => {
    const chainId = get(chainIdState);

    const chain = chainId in CONTRACT_CONFIG ? CONTRACT_CONFIG[chainId].chain : null;
    const name = chainId in CONTRACT_CONFIG ? CONTRACT_CONFIG[chainId].name : "";
    const unlockAddress =
      chainId in CONTRACT_CONFIG ? CONTRACT_CONFIG[chainId].Unlock : "";
    const publicLockAddress =
      chainId in CONTRACT_CONFIG ? CONTRACT_CONFIG[chainId].PublicLock : "";
    return { name, chain, unlockAddress, publicLockAddress };
  },
});
