"use client";

import { useUnlockWrite } from "@/app/hooks";
import { Params, defaultValues, schema, toArgs } from "@/app/schemas/createLock";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Item from "./Item";

export const CreateLock = () => {
  const { mutateAsync, isLoading, error } = useUnlockWrite("createLock");

  const form = useForm<Params>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(values: Params) {
    console.log(values);
    const res = await mutateAsync({ args: toArgs(values) });
    const receipt = res.receipt;
    console.log(receipt);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Item
              field={field}
              label="Membership name"
              description={"Enter the name of the membership."}
            ></Item>
          )}
        />

        <FormField
          control={form.control}
          name="expirationDuration"
          render={({ field }) => (
            <Item
              field={field}
              label="Expiration duration"
              description={
                "Enter the expiration duration in seconds. " +
                "Enter maximum uint256 (115792089237316195423570985008687907853269984665640564039457584007913129639935) for unlimited duration."
              }
            ></Item>
          )}
        />

        <FormField
          control={form.control}
          name="tokenAddress"
          render={({ field }) => (
            <Item
              field={field}
              label="Fee token address"
              description="Enter zero address (0x0000000000000000000000000000000000000000) if the fee is in native token (for example, ETH/ASTR)"
            ></Item>
          )}
        />

        <FormField
          control={form.control}
          name="keyPrice"
          render={({ field }) => (
            <Item
              field={field}
              label="Membership price"
              description={
                "Enter the price of your membership. For example, if the price is 0.1 ETH, enter 0.1."
              }
            ></Item>
          )}
        />

        <FormField
          control={form.control}
          name="maxNumberOfKeys"
          render={({ field }) => (
            <Item
              field={field}
              label="Max number of members"
              description={
                "Enter the maximum number of members. " +
                "Enter maximum uint256 (115792089237316195423570985008687907853269984665640564039457584007913129639935) for indefinite."
              }
            ></Item>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
