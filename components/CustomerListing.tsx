"use client";

import { useState } from "react";
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

export interface CustomerData {
  id: number;
  name: string;
  email: string;
  productName: string;
  productPrice: number;
  purchaseDate: string;
}

const customerData: CustomerData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    productName: "Premium Template Bundle",
    productPrice: 99.99,
    purchaseDate: "2023-06-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    productName: "Business Card Design",
    productPrice: 29.99,
    purchaseDate: "2023-06-18",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    productName: "Website Template",
    productPrice: 59.99,
    purchaseDate: "2023-06-20",
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    productName: "Logo Design Package",
    productPrice: 149.99,
    purchaseDate: "2023-06-22",
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward@example.com",
    productName: "Social Media Kit",
    productPrice: 39.99,
    purchaseDate: "2023-06-25",
  },
];

const ITEMS_PER_PAGE = 3;

export default function CustomerListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = customerData.filter((customer) =>
    Object.values(customer).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Customer Purchases</h2>
      <div className="mb-4 relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search customers, products, or dates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-right">Product Price</TableHead>
              <TableHead>Purchase Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.productName}</TableCell>
                <TableCell className="text-right">
                  ${customer.productPrice.toFixed(2)}
                </TableCell>
                <TableCell>{customer.purchaseDate}</TableCell>
              </TableRow>
            ))}
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
