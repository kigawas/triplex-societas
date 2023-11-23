import { TransactionReceipt } from "ethers";
import { ethers } from "hardhat";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

async function init() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);
  const PublicLock = await ethers.getContractFactory("PublicLock");
  const publicLock = PublicLock.attach(process.env.PUBLIC_LOCK_ADDRESS || "");

  const tx = await publicLock.purchase(
    [0], // ignored if native token
    [deployer.address], // recipients
    [ZERO_ADDRESS], // referrers, optional
    [ZERO_ADDRESS], // key managers, if zero, the owner is the key manager
    ["0x1234"] // any bytes data
  );
  const receipt: TransactionReceipt = await tx.wait();
  console.log("purchase tx hash:", receipt.hash);
}

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
