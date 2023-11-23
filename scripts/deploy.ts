import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);

  // 1. deploy factory
  const Unlock = await ethers.getContractFactory("Unlock");
  const unlock = await upgrades.deployProxy(Unlock, [deployer.address], {
    initializer: "initialize(address)",
  });
  await unlock.waitForDeployment();
  console.log("unlock factory deployed to:", await unlock.getAddress());

  // 2. deploying PublicLock
  const PublicLock = await ethers.getContractFactory("PublicLock");
  const publicLock = await PublicLock.deploy();
  const publicLockAddress = await publicLock.getAddress();
  await publicLock.waitForDeployment();
  console.log("public lock template deployed to:", publicLockAddress);

  // 3. setting template
  const version = await publicLock.publicLockVersion();
  const tx = await unlock.connect(deployer).addLockTemplate(publicLockAddress, version);
  await tx.wait();
  await unlock.connect(deployer).setLockTemplate(publicLockAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
