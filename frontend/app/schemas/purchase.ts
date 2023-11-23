import { toWei } from "@thirdweb-dev/react";
import * as z from "zod";
import { ZERO_ADDRESS } from "../const";
import { bytesToHex, stringToBytes } from "../utils";

export const schema = z.object({
  value: z.string(),
  recipient: z.string().min(42).max(42).startsWith("0x", {
    message: "recipient must be a valid Ethereum address starting with 0x.",
  }),
  data: z.string(),
});

export type Params = z.infer<typeof schema>;

export const defaultValues: Params = {
  value: "0",
  recipient: "",
  data: "",
};

export const toArgs = ({ value, recipient, data }: Params) => {
  return [
    [toWei(value).toHexString()],
    [recipient],
    [ZERO_ADDRESS],
    [ZERO_ADDRESS],
    ["0x" + bytesToHex(stringToBytes(data))],
  ];
};
