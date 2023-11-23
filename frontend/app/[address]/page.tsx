import { Purchase } from "@/app/components/forms/Purchase";

type RouteParams = { address: string };

const Membership = ({ params }: { params: RouteParams }) => {
  return (
    <div className="flex-col items-center justify-between px-12 py-4 w-full">
      <Purchase address={params.address} />
    </div>
  );
};

export default Membership;
