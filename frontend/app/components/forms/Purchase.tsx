"use client";

import { ZERO_ADDRESS } from "@/app/const";
import { usePublicLock } from "@/app/hooks";
import { Params, defaultValues, schema, toArgs } from "@/app/schemas/purchase";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Item from "./Item";

type Props = {
  address: string;
};

export const Purchase: React.FC<Props> = ({ address }) => {
  const walletAddress = useAddress();
  const [tokenAddress, setTokenAddress] = useState<string>(ZERO_ADDRESS);
  const { contract } = usePublicLock(address);

  useEffect(() => {
    const get = async () => {
      if (contract !== undefined) {
        const res = await contract?.call("tokenAddress");
        setTokenAddress(res);
      }
    };
    get();
  }, [contract, tokenAddress, setTokenAddress]);

  const { mutateAsync, isLoading } = useContractWrite(contract, "purchase");

  const form = useForm<Params>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: Params) {
    if (contract === undefined) return;
    const keyPrice =
      tokenAddress === ZERO_ADDRESS ? await contract?.call("keyPrice") : 0;

    const res = await mutateAsync({
      args: toArgs(values),
      overrides: { value: keyPrice },
    });
    const receipt = res.receipt;
    console.log(receipt);
  }

  return (
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
