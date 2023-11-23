import { ZERO_ADDRESS } from "@/app/const";
import { bytesToHex } from "@/app/utils";
import { toWei } from "@thirdweb-dev/react";
import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "name cannot be empty." }),
  expirationDuration: z.string().min(1, {
    message: "expirationDuration cannot be empty.",
  }),
  tokenAddress: z.string().min(42).max(42).startsWith("0x", {
    message: "tokenAddress must be a valid Ethereum address starting with 0x.",
  }),
  keyPrice: z.string().min(0, {
    message: "keyPrice must be greater than or equal to 0.",
  }),
  maxNumberOfKeys: z.number().min(1, {
    message: "maxNumberOfKeys must be greater than or equal to 1. ",
  }),
});

export type Params = z.infer<typeof schema>;

export const defaultValues: Params = {
  expirationDuration:
    "115792089237316195423570985008687907853269984665640564039457584007913129639935",
  tokenAddress: ZERO_ADDRESS,
  keyPrice: "0.0001",
  maxNumberOfKeys: 100000000,
  name: "",
};

export const toArgs = ({
  expirationDuration,
  tokenAddress,
  keyPrice,
  maxNumberOfKeys,
  name,
}: Params) => {
  const salt = new Uint8Array(12);
  if (typeof window !== "undefined" && window.crypto !== undefined) {
    window.crypto.getRandomValues(salt);
  }

  return [
    expirationDuration,
    tokenAddress,
    toWei(keyPrice),
    maxNumberOfKeys,
    name,
    "0x" + bytesToHex(salt),
  ];
};
