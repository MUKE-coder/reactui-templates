"use client";

import type React from "react";

import { useState } from "react";
import {
  BookOpen,
  FileText,
  Users,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ClipboardList,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Chart } from "@/components/ui/chart";

export default function DashboardThree() {
  // In a real app, this would come from authentication
  const [userRole, setUserRole] = useState<"admin" | "user">("admin");

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between space-y-2 p-4 md:p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your {userRole === "admin" ? "admin" : "student"}{" "}
            dashboard
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={userRole === "admin" ? "default" : "outline"}
            onClick={() => setUserRole("admin")}
          >
            Admin View
          </Button>
          <Button
            variant={userRole === "user" ? "default" : "outline"}
            onClick={() => setUserRole("user")}
          >
            User View
          </Button>
        </div>
      </div>

      {userRole === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-4 p-4 md:p-8 pt-0">
      <div className="grid gap-4 md:grid-cols-2 ">
        <AnalyticsCard
          title="Users"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          today={12}
          week={78}
          month={342}
          total={1245}
        />
        <AnalyticsCard
          title="Course Sales"
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
          today={8}
          week={52}
          month={187}
          total={843}
        />
        <AnalyticsCard
          title="Earnings"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          today={240}
          week={1560}
          month={5610}
          total={25290}
          isCurrency={true}
        />
        <AnalyticsCard
          title="Courses Created"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          today={2}
          week={5}
          month={12}
          total={48}
        />
      </div>

      <div className="grid gap-4 ">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              The last 5 users who purchased courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Sarah Johnson</TableCell>
                  <TableCell>Advanced React Patterns</TableCell>
                  <TableCell>Today</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Michael Chen</TableCell>
                  <TableCell>UX Design Fundamentals</TableCell>
                  <TableCell>Yesterday</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Emily Rodriguez</TableCell>
                  <TableCell>Data Science Bootcamp</TableCell>
                  <TableCell>2 days ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">David Kim</TableCell>
                  <TableCell>JavaScript Masterclass</TableCell>
                  <TableCell>3 days ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lisa Patel</TableCell>
                  <TableCell>Python for Beginners</TableCell>
                  <TableCell>4 days ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserGrowthChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Courses</CardTitle>
          <CardDescription>
            Courses with the highest number of students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  JavaScript Masterclass
                </TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell>1,245</TableCell>
                <TableCell>$62,250</TableCell>
                <TableCell>4.9/5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Data Science Bootcamp
                </TableCell>
                <TableCell>Maria Garcia</TableCell>
                <TableCell>987</TableCell>
                <TableCell>$49,350</TableCell>
                <TableCell>4.8/5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  UX Design Fundamentals
                </TableCell>
                <TableCell>Alex Johnson</TableCell>
                <TableCell>876</TableCell>
                <TableCell>$43,800</TableCell>
                <TableCell>4.7/5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Python for Beginners
                </TableCell>
                <TableCell>Sarah Williams</TableCell>
                <TableCell>754</TableCell>
                <TableCell>$37,700</TableCell>
                <TableCell>4.6/5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Advanced React Patterns
                </TableCell>
                <TableCell>David Lee</TableCell>
                <TableCell>689</TableCell>
                <TableCell>$34,450</TableCell>
                <TableCell>4.8/5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function UserDashboard() {
  return (
    <div className="space-y-4 p-4 md:p-8 pt-0">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enrolled Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Courses
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Surveys Participated
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Completed</span>
              </div>
              <div className="text-xl font-bold">12</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span>Incomplete</span>
              </div>
              <div className="text-xl font-bold">3</div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Completion</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <CourseCompletionChart />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Courses</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            title="JavaScript Masterclass"
            progress={75}
            image="/placeholder.svg?height=200&width=400"
          />
          <CourseCard
            title="UX Design Fundamentals"
            progress={100}
            image="/placeholder.svg?height=200&width=400"
          />
          <CourseCard
            title="Python for Beginners"
            progress={45}
            image="/placeholder.svg?height=200&width=400"
          />
          <CourseCard
            title="Data Science Bootcamp"
            progress={20}
            image="/placeholder.svg?height=200&width=400"
          />
          <CourseCard
            title="Advanced React Patterns"
            progress={0}
            image="/placeholder.svg?height=200&width=400"
          />
        </div>
      </div>
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  icon: React.ReactNode;
  today: number;
  week: number;
  month: number;
  total: number;
  isCurrency?: boolean;
}

function AnalyticsCard({
  title,
  icon,
  today,
  week,
  month,
  total,
  isCurrency = false,
}: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="px-6 py-0">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-8">
            <TabsTrigger value="today" className="text-xs">
              Today
            </TabsTrigger>
            <TabsTrigger value="week" className="text-xs">
              7 Days
            </TabsTrigger>
            <TabsTrigger value="month" className="text-xs">
              28 Days
            </TabsTrigger>
            <TabsTrigger value="total" className="text-xs">
              Total
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="pt-4 pb-2">
            <div className="text-2xl font-bold">
              {isCurrency
                ? `$${today.toLocaleString()}`
                : today.toLocaleString()}
            </div>
          </TabsContent>
          <TabsContent value="week" className="pt-4 pb-2">
            <div className="text-2xl font-bold">
              {isCurrency ? `$${week.toLocaleString()}` : week.toLocaleString()}
            </div>
          </TabsContent>
          <TabsContent value="month" className="pt-4 pb-2">
            <div className="text-2xl font-bold">
              {isCurrency
                ? `$${month.toLocaleString()}`
                : month.toLocaleString()}
            </div>
          </TabsContent>
          <TabsContent value="total" className="pt-4 pb-2">
            <div className="text-2xl font-bold">
              {isCurrency
                ? `$${total.toLocaleString()}`
                : total.toLocaleString()}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface CourseCardProps {
  title: string;
  progress: number;
  image: string;
}

function CourseCard({ title, progress, image }: CourseCardProps) {
  const getButtonText = () => {
    if (progress === 0) return "Start";
    if (progress === 100) return "Restart";
    return "Resume";
  };

  return (
    <Card className="overflow-hidden">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">{getButtonText()}</Button>
      </CardFooter>
    </Card>
  );
}

function UserGrowthChart() {
  const data = [
    { name: "1", users: 12 },
    { name: "2", users: 15 },
    { name: "3", users: 18 },
    { name: "4", users: 14 },
    { name: "5", users: 16 },
    { name: "6", users: 19 },
    { name: "7", users: 22 },
    { name: "8", users: 25 },
    { name: "9", users: 23 },
    { name: "10", users: 26 },
    { name: "11", users: 28 },
    { name: "12", users: 31 },
    { name: "13", users: 33 },
    { name: "14", users: 35 },
    { name: "15", users: 34 },
    { name: "16", users: 37 },
    { name: "17", users: 39 },
    { name: "18", users: 42 },
    { name: "19", users: 45 },
    { name: "20", users: 48 },
    { name: "21", users: 51 },
    { name: "22", users: 55 },
    { name: "23", users: 58 },
    { name: "24", users: 62 },
    { name: "25", users: 65 },
    { name: "26", users: 68 },
    { name: "27", users: 72 },
    { name: "28", users: 75 },
    { name: "29", users: 79 },
    { name: "30", users: 82 },
  ];

  return (
    <Chart
      type="line"
      data={data}
      x={{ key: "name" }}
      y={{ key: "users" }}
      className="w-full h-full"
    />
  );
}

function CourseCompletionChart() {
  const data = [
    { name: "JavaScript Masterclass", completion: 75 },
    { name: "UX Design Fundamentals", completion: 100 },
    { name: "Python for Beginners", completion: 45 },
    { name: "Data Science Bootcamp", completion: 20 },
    { name: "Advanced React Patterns", completion: 0 },
  ];

  return (
    <Chart
      type="bar"
      data={data}
      x={{ key: "name" }}
      y={{ key: "completion" }}
      className="w-full h-full"
    />
  );
}

/*** UPDATE THE SHAD CHART UI COMPONENT WITH THIS CODE
 "use client";
 
 import type * as React from "react";
 import {
   Area,
   AreaChart,
   Bar,
   BarChart,
   CartesianGrid,
   Line,
   LineChart,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
 } from "recharts";
 
 import { cn } from "@/lib/utils";
 
 interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
   type?: "line" | "bar" | "area";
   data: any[];
   x: {
     key: string;
     label?: string;
     formatter?: (value: any) => string;
   };
   y: {
     key: string;
     label?: string;
     formatter?: (value: any) => string;
   };
   height?: number;
   colors?: {
     stroke?: string;
     fill?: string;
   };
 }
 
 export function Chart({
   type = "line",
   data,
   x,
   y,
   height = 300,
   colors = {
     stroke: "hsl(var(--primary))",
     fill: "hsl(var(--primary) / 0.2)",
   },
   className,
   ...props
 }: ChartProps) {
   const renderChart = () => {
     switch (type) {
       case "line":
         return (
           <LineChart data={data}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} />
             <XAxis
               dataKey={x.key}
               tickFormatter={x.formatter}
               tick={{ fontSize: 12 }}
               tickLine={false}
               axisLine={false}
             />
             <YAxis
               dataKey={y.key}
               tickFormatter={y.formatter}
               tick={{ fontSize: 12 }}
               tickLine={false}
               axisLine={false}
             />
             <Tooltip />
             <Line
               type="monotone"
               dataKey={y.key}
               stroke={colors.stroke}
               strokeWidth={2}
               dot={false}
               activeDot={{ r: 6 }}
             />
           </LineChart>
         );
       case "bar":
         return (
           <BarChart data={data}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} />
             <XAxis
               dataKey={x.key}
               tickFormatter={x.formatter}
               tick={{ fontSize: 12 }}
               tickLine={false}
               axisLine={false}
             />
             <YAxis
               dataKey={y.key}
               tickFormatter={y.formatter}
               tick={{ fontSize: 12 }}
               tickLine={false}
               axisLine={false}
             />
             <Tooltip />
             <Bar dataKey={y.key} fill={colors.stroke} radius={[4, 4, 0, 0]} />
           </BarChart>
         );
       case "area":
         return (
           <AreaChart data={data}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} />
             <XAxis
               dataKey={x.key}
               tickFormatter={x.formatter}
               tick={{ fontSize: 12 }}
               tickLine={false}
               axisLine={false}
             />
             <YAxis
               dataKey={y.key}
               tickFormatter={y.formatter}
               tick={{ fontSize: 12 }}
               tickLine={false}
               axisLine={false}
             />
             <Tooltip />
             <Area
               type="monotone"
               dataKey={y.key}
               stroke={colors.stroke}
               fill={colors.fill}
               strokeWidth={2}
             />
           </AreaChart>
         );
       default:
         return <p>No Chart</p>;
     }
   };
 
   return (
     <div className={cn("w-full h-full", className)} {...props}>
       <ResponsiveContainer width="100%" height={height}>
         {renderChart()}
       </ResponsiveContainer>
     </div>
   );
 }
 
 export function ChartContainer({
   className,
   ...props
 }: React.HTMLAttributes<HTMLDivElement>) {
   return <div className={className} {...props} />;
 }
 
 export function ChartTooltip({
   className,
   ...props
 }: React.HTMLAttributes<HTMLDivElement>) {
   return <div className={className} {...props} />;
 }
 
 export function ChartTooltipContent({
   className,
   ...props
 }: React.HTMLAttributes<HTMLDivElement>) {
   return <div className={className} {...props} />;
 }
 
 export function ChartLegend({
   className,
   ...props
 }: React.HTMLAttributes<HTMLDivElement>) {
   return <div className={className} {...props} />;
 }
 
 export function ChartLegendContent({
   className,
   ...props
 }: React.HTMLAttributes<HTMLDivElement>) {
   return <div className={className} {...props} />;
 }
 
 */
