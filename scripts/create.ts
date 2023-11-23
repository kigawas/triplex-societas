import { EventLog } from "ethers";
import { ethers } from "hardhat";

const UINT256_MAX =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);
  const Unlock = await ethers.getContractFactory("Unlock");
  const unlock = Unlock.attach(
    process.env.UNLOCK_ADDRESS || "" // The deployed factory address
  );
  const tx = await unlock.createLock(
    "2592000", // expiration duration, seconds
    "0x0000000000000000000000000000000000000000", // zero address means native token, e.g ETH
    0, // price
    UINT256_MAX, // max number of keys
    "Just A Test", // lock name
    "0x123456789012345678901122" // salt
  );
  console.log("create lock tx hash:", tx.hash);
  const receipt = await tx.wait();
  const event = receipt.logs.find((log: EventLog) => log.fragment?.name === "NewLock");
  const [msgSender, lockAddress] = event?.args;
  // msgSender == deployer.address
  console.log("create lock address:", lockAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
