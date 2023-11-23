import { Chain } from "@thirdweb-dev/chains";

export const Shibuya = {
  chain: "Shibuya",
  chainId: 81,
  rpc: ["https://evm.shibuya.astar.network", "https://shibuya.public.blastapi.io"],
  explorers: [
    {
      name: "blockscout",
      url: "https://blockscout.com/shibuya",
      standard: "EIP3091",
      icon: {
        url: "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
        width: 551,
        height: 540,
        format: "png",
      },
    },
  ],
  faucets: ["https://portal.astar.network/shibuya-testnet/assets"],
  features: [],
  icon: {
    url: "ipfs://Qmdvmx3p6gXBCLUMU1qivscaTNkT6h3URdhUTZCHLwKudg",
    width: 1000,
    height: 1000,
    format: "png",
  },
  infoURL: "https://blockscout.com/shibuya",
  name: "Shibuya",
  nativeCurrency: {
    name: "Shibuya",
    symbol: "SBY",
    decimals: 18,
  },
  networkId: 81,
  redFlags: [],
  shortName: "sby",
  slug: "shibuya",
  testnet: true,
  title: "Astar Testnet Shibuya",
} as const satisfies Chain;
