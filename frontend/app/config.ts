import { Astar, Sepolia } from "@thirdweb-dev/chains";
import { Shibuya } from "./chains";

type Config = {
  chain: any;
  name: string;
  Unlock: string;
  PublicLock: string;
};

export const CONTRACT_CONFIG: Record<number, Config> = {
  [11155111]: {
    chain: Sepolia,
    name: "Sepolia",
    Unlock: "0x6315965c44B8691ac503287617146Cc4B7a889cF",
    PublicLock: "0xE5433ceE202576C8EeF72e8832516f7997dcc41B",
  },
  [81]: {
    chain: Shibuya,
    name: "Shibuya",
    Unlock: "0xE77AbD852d17315D9BC20DDf99D3853A14D5334e",
    PublicLock: "0xab5709F5C9Ad4EA1a9F10D5C1F65A373c7977a92",
  },
  [592]: {
    chain: Astar,
    name: "Astar",
    Unlock: "0xab5709F5C9Ad4EA1a9F10D5C1F65A373c7977a92",
    PublicLock: "0x44105277CF67eA17d2a76104e9881FC6532c0517",
  },
};
