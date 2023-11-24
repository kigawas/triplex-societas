import { ZERO_ADDRESS } from "@/app/const";
import { bytesToHex } from "@/app/utils";
import { toWei } from "@thirdweb-dev/react";
import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty." }),
  expirationDuration: z.coerce.bigint().gt(BigInt(0), {
    message: "Duration must be positive.",
  }),
  tokenAddress: z.string().min(42).max(42).startsWith("0x", {
    message:
      "Fee token contract address must be a valid Ethereum address starting with 0x.",
  }),
  keyPrice: z.coerce.number().gte(0, {
    message: "Membership price must be greater than or equal to 0.",
  }),
  maxNumberOfKeys: z.coerce.bigint().gt(BigInt(0), {
    message: "Maximum number of members must be positive.",
  }),
});

export type Params = z.infer<typeof schema>;

export const defaultValues: Params = {
  expirationDuration: BigInt(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ),
  tokenAddress: ZERO_ADDRESS,
  keyPrice: 0,
  maxNumberOfKeys: BigInt(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ),
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
    expirationDuration.toString(),
    tokenAddress,
    toWei(keyPrice),
    maxNumberOfKeys.toString(),
    name,
    "0x" + bytesToHex(salt),
  ];
};
