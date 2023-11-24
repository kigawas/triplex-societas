import { useContract, useContractWrite } from "@thirdweb-dev/react";
import React from "react";
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

export const useInterval = (callback: () => void, delay?: number) => {
  const intervalRef = React.useRef(0);
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
};

export const useRetryUntilResolved = (
  callback: () => boolean,
  interval = 100,
  maxRetries = 10
) => {
  const [resolved, setResolved] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  useInterval(
    () => {
      const result = callback();
      if (result || counter > maxRetries) {
        // default: 10 retries at most
        setResolved(true);
      } else {
        setCounter(counter + 1);
      }
    },
    resolved ? undefined : interval * counter
  );
  return resolved;
};
