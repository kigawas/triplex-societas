import { setBalance } from "@nomicfoundation/hardhat-network-helpers";

async function init() {
  const address = "0x44570C082d4368ee959d72426D2C74605CC8Eb8E";
  await setBalance(address, 1000 * 1e18);
}

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
