# triplex-societas

Empower business owners to adopt web3 membership at the new epoch by porting Unlock Protocol onto ASTAR ecosystem.

## Introduction

Membership-based business models are winning its popularity day by day. However, the membership system is still a centralized solution. Unlock Protocol is an open-source, collectively owned, community-governed, peer-to-peer system that creates time-based memberships on EVM blockchains.

Leveraging the power of the blockchain, this solution empowers business owners to issue their own membership contracts. Optimized for autonomy and adaptability, customers can conveniently purchase memberships, minting their unique ERC-721 tokens at will.

## The problem it solves

Business owners can define key parameters such as the expiration of memberships, maximum number of memberships that can be issued, and custom refund policies, amongst other functionalities. This flexibility ensures that businesses of all scales and industries can easily tailor the contract to meet their specific needs.

Additionally, the utility of metadata in ERC-721 tokens enables the recording of structural data adaptable to individualized business requirements. Be it real estate giant Mitsubishi Estate or the automobile powerhouse Mazda Motor Corporation or smart business owners in Tokyo Torch, each business can leverage this feature expand their business models and create new revenue streams regardless of their scale.

## Challenges

I tried to use thirdweb's abstract accounts but they are not compatible with Shibuya or Astar, so users need to have some balance of ASTAR token to pay for the gas fee.

## Core functionalities

Unlock Protocol's smart contracts support two main functions: minting and gating.

### Mint: Create a membership NFT

Memberships can be created in two ways:

- Purchase: Users can purchase an NFT membership for themselves or others. These memberships may be purchased once or renewed on a recurring basis.
- Airdrop: The "manager" of a membership contract can airdrop or grant memberships to users at their discretion.

Once minted, members and managers can extend, cancel, terminate, or even "burn" a membership.

### Gate: Unlock content or features

Because NFTs can be checked and verified quickly, they can be used to gate access to content or features. For example, a membership NFT can be used to unlock a Discord channel, a private forum, or a special feature on a website. NFTs can also be granted or delegated to third-party contracts to implement any customized business logic.

## Technical stack

- Solidity Contract: Unlock Protocol
  - Factory contract (`Unlock.sol`) for creating membership contract factory
  - Template contract (`PublicLock.sol`) for business owners issuing their own token contracts
- Demo Frontend: Next.js/React

### Scripts

- deploy.ts: deploy unlock factory
- create.ts: call factory's method to deploy membership token contract (`createLock`). Expiration, price, and token name are configurable.
- purchase.ts: user can mint NFT for their own addresses or third party addresses (`purchase`)

### Test on local

```bash
> npx hardhat run scripts/deploy.ts --network local
...
> UNLOCK_ADDRESS=0xabc npx hardhat run scripts/create.ts --network local
# [YOUR ADDR]
# create lock tx hash:  [TX HASH]
# create lock address:  [DEPLOYED PUBLIC LOCK ADDRESS]
> PUBLIC_LOCK_ADDRESS=0x123 npx hardhat run scripts/purchase.ts --network local
...
```

## Networks

### Sepolia (Ethereum Testnet)

Factory: [0x6315965c44B8691ac503287617146Cc4B7a889cF](https://sepolia.etherscan.io/address/0x6315965c44b8691ac503287617146cc4b7a889cf)

Template: [0xE5433ceE202576C8EeF72e8832516f7997dcc41B](https://sepolia.etherscan.io/address/0xE5433ceE202576C8EeF72e8832516f7997dcc41B)

### Shibuya (Astar Testnet)

Factory: [0xE77AbD852d17315D9BC20DDf99D3853A14D5334e](https://blockscout.com/shibuya/address/0xE77AbD852d17315D9BC20DDf99D3853A14D5334e)

Template: [0xab5709F5C9Ad4EA1a9F10D5C1F65A373c7977a92](https://blockscout.com/shibuya/address/0xab5709F5C9Ad4EA1a9F10D5C1F65A373c7977a92)

### Astar

Factory: [0xab5709F5C9Ad4EA1a9F10D5C1F65A373c7977a92](https://blockscout.com/astar/address/0xab5709F5C9Ad4EA1a9F10D5C1F65A373c7977a92)

Template: [0x44105277CF67eA17d2a76104e9881FC6532c0517](https://blockscout.com/astar/address/0x44105277CF67eA17d2a76104e9881FC6532c0517)
