"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { ContractReceipt } from "ethers";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { ZERO_ADDRESS } from "@/app/const";
import { usePublicLock, useRetryUntilResolved } from "@/app/hooks";
import { Params, defaultValues, schema, toArgs } from "@/app/schemas/purchase";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import Item from "./Item";

type Props = {
  address: string;
};

export const Purchase: React.FC<Props> = ({ address }) => {
  const walletAddress = useAddress();
  const [tokenAddress, setTokenAddress] = useState<string>(ZERO_ADDRESS);
  const [keyPrice, setKeyPrice] = useState<string>("0");
  const { contract } = usePublicLock(address);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const [tokenId, setTokenId] = useState<string>("0");

  const getContractData = useCallback(async () => {
    if (contract !== undefined) {
      const address = await contract?.call("tokenAddress");
      const price = await contract?.call("keyPrice");

      setTokenAddress(address);
      setKeyPrice(price);
      return true;
    }
    return false;
  }, [contract, setTokenAddress]);

  useRetryUntilResolved(() => {
    getContractData()
      .then((res) => {
        if (res) setState("ready");
      })
      .catch((e) => {
        console.error(e);
        setState("error");
      });
    return state === "ready" || state === "error";
  });

  const { mutateAsync, isLoading } = useContractWrite(contract, "purchase");

  const form = useForm<Params>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: Params) {
    console.log(values);
    if (contract === undefined) return;
    const value = tokenAddress === ZERO_ADDRESS ? keyPrice : "0";
    try {
      const res = await mutateAsync({
        args: toArgs(values),
        overrides: { value },
      });
      const receipt: ContractReceipt = res.receipt;
      console.log(receipt);
      if (receipt.events !== undefined) {
        const event = receipt.events.find((log) => log.event === "Transfer");
        const [from, to, tokenId] = event?.args || [];
        setTokenId(tokenId.toString());
      }
    } catch (e) {
      console.error((e as any).reason);
    }
  }

  return state === "ready" ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <Item
              field={field}
              label="Non-native token price"
              description={
                "Enter the price if the fee token is ERC20 token, for example USDT/USDC. " +
                "If the price is 0.1 USDT, enter 0.1. This field will be ignored if it is a native token."
              }
            ></Item>
          )}
        />

        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <Item
              field={field}
              label="Recipient address"
              placeholder={walletAddress}
              description={
                "Enter the address of the recipient of the membership token. " +
                "It can be your address or any other address."
              }
            ></Item>
          )}
        />

        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <Item
              field={field}
              label="Extra data"
              description="Enter any extra data."
            ></Item>
          )}
        />

        <Button disabled={isLoading} type="submit">
          Submit
        </Button>

        {tokenId !== "0" ? <p>Your token id is: {tokenId}</p> : null}
      </form>
    </Form>
  ) : state === "loading" ? (
    <div className="text-fuchsia-500">Loading</div>
  ) : (
    <div className="text-rose-500">Invalid contract</div>
  );
};
