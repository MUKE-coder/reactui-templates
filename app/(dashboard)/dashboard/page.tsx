import DashboardOverview from "@/components/dashboard/Overview";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import BestSellingProducts from "./BestSellingProducts";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="p-8">
      <DashboardOverview username={user.firstName} />
      {/* <div className="py-16">
        <BestSellingProducts />
      </div> */}
    </div>
  );
}
