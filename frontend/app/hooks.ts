import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useRecoilValue } from "recoil";
import { PUBLIC_LOCK_ABI, UNLOCK_ABI } from "./abi";
import { contractSelector } from "./states";

const useUnlock = () => {
  const { unlockAddress } = useRecoilValue(contractSelector);
  const { data: contract } = useContract(unlockAddress, UNLOCK_ABI);

  return {
    contract,
  };
};

export const useUnlockWrite = (method: string) => {
  const { contract } = useUnlock();
  const { mutateAsync, isLoading, error } = useContractWrite(contract, method);

  return {
    mutateAsync,
    isLoading,
    error,
  };
};

export const usePublicLock = (address: string) => {
  const { data: contract } = useContract(address, PUBLIC_LOCK_ABI);

  return {
    contract,
  };
};
