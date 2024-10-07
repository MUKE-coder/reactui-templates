"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface TemplateData {
  id: number;
  image: string;
  name: string;
  sales: number;
  revenue: number;
  visits: number;
  today: number;
  last7Days: number;
  last30Days: number;
}

const templateData: TemplateData[] = [
  {
    id: 1,
    image: "/placeholder.svg?height=40&width=40",
    name: "Business Card Template",
    sales: 120,
    revenue: 1200,
    visits: 1500,
    today: 5,
    last7Days: 35,
    last30Days: 150,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=40&width=40",
    name: "Resume Template",
    sales: 85,
    revenue: 850,
    visits: 1200,
    today: 3,
    last7Days: 25,
    last30Days: 110,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=40&width=40",
    name: "Social Media Kit",
    sales: 200,
    revenue: 2000,
    visits: 2500,
    today: 8,
    last7Days: 60,
    last30Days: 250,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=40&width=40",
    name: "Presentation Template",
    sales: 150,
    revenue: 1500,
    visits: 2000,
    today: 6,
    last7Days: 45,
    last30Days: 180,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=40&width=40",
    name: "Flyer Design",
    sales: 100,
    revenue: 1000,
    visits: 1800,
    today: 4,
    last7Days: 30,
    last30Days: 130,
  },
];

const ITEMS_PER_PAGE = 3;

export default function BestSellingProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = templateData.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totals = filteredData.reduce(
    (acc, template) => ({
      sales: acc.sales + template.sales,
      revenue: acc.revenue + template.revenue,
      visits: acc.visits + template.visits,
      today: acc.today + template.today,
      last7Days: acc.last7Days + template.last7Days,
      last30Days: acc.last30Days + template.last30Days,
    }),
    { sales: 0, revenue: 0, visits: 0, today: 0, last7Days: 0, last30Days: 0 }
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">Best selling</h2>
      <div className="mb-4 relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Template Image</TableHead>
              <TableHead>Template Name</TableHead>
              <TableHead className="text-right">Template Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Visits</TableHead>
              <TableHead className="text-right">Today</TableHead>
              <TableHead className="text-right">Last 7 days</TableHead>
              <TableHead className="text-right">Last 30 days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <Image
                    src={template.image}
                    alt={`${template.name} thumbnail`}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell className="text-right">{template.sales}</TableCell>
                <TableCell className="text-right">
                  ${template.revenue}
                </TableCell>
                <TableCell className="text-right">{template.visits}</TableCell>
                <TableCell className="text-right">{template.today}</TableCell>
                <TableCell className="text-right">
                  {template.last7Days}
                </TableCell>
                <TableCell className="text-right">
                  {template.last30Days}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell colSpan={2}>Totals</TableCell>
              <TableCell className="text-right">{totals.sales}</TableCell>
              <TableCell className="text-right">${totals.revenue}</TableCell>
              <TableCell className="text-right">{totals.visits}</TableCell>
              <TableCell className="text-right">{totals.today}</TableCell>
              <TableCell className="text-right">{totals.last7Days}</TableCell>
              <TableCell className="text-right">{totals.last30Days}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)} of{" "}
          {filteredData.length} results
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
