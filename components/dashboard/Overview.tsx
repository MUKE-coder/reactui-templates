import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Info } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
}

function AnalyticsCard({ title, value }: AnalyticsCardProps) {
  return (
    <Card className="bg-gray-900 text-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-300">{title}</h3>
          <Info className="w-4 h-4 text-gray-500" />
        </div>
        <p className="text-4xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardOverview({ username = "User" }) {
  return (
    <Card className="w-full  mx-auto overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
              Welcome back, {username}!
            </h1>
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-lg sm:text-xl text-white/90 mt-2 max-w-xl">
            Ready to make today amazing? Your dashboard is loaded with
            opportunities!
          </p>
        </div>
        <div className="bg-gray-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnalyticsCard title="Balance" value="$0" />
            <AnalyticsCard title="Last 7 days" value="$0" />
            <AnalyticsCard title="Last 28 days" value="$0" />
            <AnalyticsCard title="Total earnings" value="$0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
