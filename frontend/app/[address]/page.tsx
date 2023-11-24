import { Purchase } from "@/app/components/forms/Purchase";

type RouteParams = { address: string };

const Membership = ({ params }: { params: RouteParams }) => {
  const address = params.address;

  return (
    <div className="flex-col items-center justify-between px-12 py-4 w-full">
      {address.length === 42 && address.startsWith("0x") ? (
        <Purchase address={params.address} />
      ) : (
        <div className="text-rose-500">Invalid address</div>
      )}
    </div>
  );
};

export default Membership;
