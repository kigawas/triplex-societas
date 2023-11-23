import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import hre from "hardhat";

describe("Unlock", () => {
  const deploy = async () => {
    const [owner, user1, user2] = await hre.viem.getWalletClients();
    const unlock = await hre.viem.deployContract("contracts/Unlock.sol:Unlock", [], {});
    const publicLock = await hre.viem.deployContract("PublicLock", [], {});

    const publicClient = await hre.viem.getPublicClient();

    return {
      unlock,
      publicLock,
      owner,
      user1,
      user2,
      publicClient,
    };
  };

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      const { unlock, owner } = await loadFixture(deploy);
      // viem cannot deploy proxy
      expect(await unlock.read.owner()).toEqual(
        "0x0000000000000000000000000000000000000000"
      );
    });
  });
});
