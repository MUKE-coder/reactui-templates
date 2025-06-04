"use client";
import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Define interfaces (assuming they are defined as before)
interface InvoiceItem {
  quantity: number;
  description: string;
  unitPrice: number;
  taxable: boolean;
  amount: number;
}

interface InvoiceData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  logoUrl: string;
  billToContactPerson: string;
  billToCompanyName: string;
  billToLocation: string;
  billToPhone: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceDueDate: string;
  customerID: string;
  preparedBy: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  salesTax: number;
  other: number;
  total: number;
  contactInfo: string;
  paymentInfo: string;
  thankYouMessage: string;
}

// Placeholder data (assuming it's defined as before)
const initialInvoiceData: InvoiceData = {
  companyName: "DESISHUB",
  companyAddress: "DESISHUB",
  companyPhone: "0762063160 | 0756384580",
  companyEmail: "info@desishub.com",
  billToContactPerson: "Mary Awalith",
  billToCompanyName: "CODELABS CO. LTD",
  billToLocation: "South Sudan",
  billToPhone: "922031601",
  invoiceDate: "5/22/2025",
  invoiceNumber: "30098",
  customerID: "CCL",
  preparedBy: "JB",
  invoiceDueDate: "22/5/2025",
  items: [
    {
      quantity: 1,
      description:
        "Payment for Backend Development of a Shipment and Tracking Web application",
      unitPrice: 300.0,
      taxable: false,
      amount: 300.0,
    },
    { quantity: 0, description: "", unitPrice: 0, taxable: false, amount: 0 },
    { quantity: 0, description: "", unitPrice: 0, taxable: false, amount: 0 },
    { quantity: 0, description: "", unitPrice: 0, taxable: false, amount: 0 },
    { quantity: 0, description: "", unitPrice: 0, taxable: false, amount: 0 },
  ],
  subtotal: 300.0,
  taxRate: 0,
  salesTax: 0,
  other: 0,
  total: 300.0,
  contactInfo:
    "If you have any questions concerning this Invoice, please contact: Call or Whatsapp: 0762 063 160 | 0756 384 580",
  paymentInfo:
    "All dues are Payable to Desishub through Cash or MTN MOMO 0762 063 160",
  thankYouMessage: "Thank you for your business!",
  logoUrl: "https://via.placeholder.com/150x50?text=DESISHUB+Logo", // Placeholder logo
};

// --- Invoice Preview Component ---
const InvoicePreview: React.FC<{ invoiceData: InvoiceData }> = ({
  invoiceData,
}) => (
  <div>
    {/* Header */}
    <div className="mb-8 p-6 bg-black text-white flex justify-between items-center rounded-t-lg">
      <div>
        {invoiceData.logoUrl ? (
          <img
            src={invoiceData.logoUrl}
            alt="Company Logo"
            className="h-12 mb-2"
          />
        ) : (
          <div className="text-4xl font-bold">{invoiceData.companyName}</div>
        )}
        <div className="text-sm">Leveraging Technology</div>
      </div>
      <div className="text-5xl font-bold text-right">INVOICE</div>
    </div>

    {/* Company & Invoice Details */}
    <div className="grid grid-cols-2 gap-8 mb-8 px-8">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Company Address
        </h3>
        <p className="text-gray-600">{invoiceData.companyName}</p>
        <p className="text-gray-600">Phone: {invoiceData.companyPhone}</p>
        <p className="text-gray-600">Email: {invoiceData.companyEmail}</p>
      </div>
      <div className="text-right">
        <p>
          <span className="font-semibold text-gray-700">Date:</span>{" "}
          <span className="text-gray-600">{invoiceData.invoiceDate}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Invoice #:</span>{" "}
          <span className="text-gray-600">{invoiceData.invoiceNumber}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Customer ID:</span>{" "}
          <span className="text-gray-600">{invoiceData.customerID}</span>
        </p>
      </div>
    </div>

    {/* Bill To & Prepared By */}
    <div className="grid grid-cols-2 gap-8 mb-8 px-8">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Bill To</h3>
        <p className="text-gray-600">
          Contact Person: {invoiceData.billToContactPerson}
        </p>
        <p className="text-gray-600">
          Company Name: {invoiceData.billToCompanyName}
        </p>
        <p className="text-gray-600">Location: {invoiceData.billToLocation}</p>
        <p className="text-gray-600">Phone: {invoiceData.billToPhone}</p>
      </div>
      <div className="text-right">
        <p>
          <span className="font-semibold text-gray-700">Prepared by:</span>{" "}
          <span className="text-gray-600">{invoiceData.preparedBy}</span>
        </p>
      </div>
    </div>

    {/* Invoice Due Date */}
    <div className="mb-8 px-8">
      <p>
        <span className="font-semibold text-gray-700">Invoice Due Date:</span>{" "}
        <span className="text-gray-600">{invoiceData.invoiceDueDate}</span>
      </p>
    </div>

    {/* Items Table */}
    <div className="mb-8 px-8">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-3 border border-gray-300 text-left text-sm font-semibold">
              Quantity
            </th>
            <th className="p-3 border border-gray-300 text-left text-sm font-semibold">
              Description
            </th>
            <th className="p-3 border border-gray-300 text-right text-sm font-semibold">
              Unit Price
            </th>
            <th className="p-3 border border-gray-300 text-center text-sm font-semibold">
              Taxable?
            </th>
            <th className="p-3 border border-gray-300 text-right text-sm font-semibold">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="p-3 border-l border-r border-gray-300 text-gray-700 text-center">
                {item.quantity || ""}
              </td>
              <td className="p-3 border-l border-r border-gray-300 text-gray-700">
                {item.description}
              </td>
              <td className="p-3 border-l border-r border-gray-300 text-gray-700 text-right">
                {item.unitPrice ? `$${item.unitPrice.toFixed(2)}` : ""}
              </td>
              <td className="p-3 border-l border-r border-gray-300 text-gray-700 text-center">
                {item.taxable ? "Yes" : item.quantity > 0 ? "No" : ""}
              </td>
              <td className="p-3 border-l border-r border-gray-300 text-gray-700 text-right">
                {item.amount ? `$${item.amount.toFixed(2)}` : ""}
              </td>
            </tr>
          ))}
          {/* Ensure table has a bottom border */}
          <tr className="border-b border-gray-300">
            <td colSpan={5} className="p-0"></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Totals Section */}
    <div className="flex justify-end mb-8 px-8">
      <div className="w-1/3">
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-700">
            ${invoiceData.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="text-gray-700">Tax Rate</span>
          <span className="text-gray-700">
            {invoiceData.taxRate ? `${invoiceData.taxRate}%` : "-"}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="text-gray-700">Sales Tax</span>
          <span className="text-gray-700">
            {invoiceData.salesTax ? `$${invoiceData.salesTax.toFixed(2)}` : "-"}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="text-gray-700">Other</span>
          <span className="text-gray-700">
            {invoiceData.other ? `$${invoiceData.other.toFixed(2)}` : "-"}
          </span>
        </div>
        <div className="flex justify-between py-2 font-bold bg-black text-white px-3 mt-2 rounded">
          <span>TOTAL</span>
          <span>${invoiceData.total.toFixed(2)}</span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="text-sm text-gray-600 px-8 pb-8 border-t border-gray-200 pt-6">
      <p className="mb-2">{invoiceData.contactInfo}</p>
      <p className="mb-4">{invoiceData.paymentInfo}</p>
      <p className="text-lg font-semibold text-gray-800">
        {invoiceData.thankYouMessage}
      </p>
    </div>
  </div>
);

// --- Invoice Form Component ---
const InvoiceForm: React.FC<{
  initialData: InvoiceData;
  onSubmit: (data: InvoiceData) => void;
}> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<InvoiceData>(initialData);

  // Generate invoice number on component mount if not already set
  useEffect(() => {
    if (
      !formData.invoiceNumber ||
      formData.invoiceNumber === initialData.invoiceNumber
    ) {
      const generatedInvoiceNumber = generateInvoiceNumber();
      setFormData((prev) => ({
        ...prev,
        invoiceNumber: generatedInvoiceNumber,
      }));
    }
  }, []);

  // Generate customer ID when company name or contact person changes
  useEffect(() => {
    if (formData.billToCompanyName && formData.billToContactPerson) {
      const generatedCustomerId = generateCustomerId(
        formData.billToCompanyName,
        formData.billToContactPerson
      );
      setFormData((prev) => ({ ...prev, customerID: generatedCustomerId }));
    }
  }, [formData.billToCompanyName, formData.billToContactPerson]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    // Handle nested state for items later if needed
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const updatedItems = [...formData.items];
    const itemKey = name as keyof InvoiceItem;

    let parsedValue: string | number | boolean = value;
    if (type === "number") {
      parsedValue = parseFloat(value) || 0;
    }
    // Add checkbox handling if 'taxable' becomes editable

    // Ensure the property exists on InvoiceItem before assigning
    if (itemKey in updatedItems[index]) {
      (updatedItems[index] as any)[itemKey] = parsedValue;

      // Recalculate amount if quantity or unitPrice changes
      if (itemKey === "quantity" || itemKey === "unitPrice") {
        updatedItems[index].amount =
          updatedItems[index].quantity * updatedItems[index].unitPrice;
      }

      setFormData((prev) => ({ ...prev, items: updatedItems }));
      // Recalculate totals after item change
      recalculateTotals(updatedItems);
    }
  };

  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      quantity: 0,
      description: "",
      unitPrice: 0,
      taxable: false,
      amount: 0,
    };

    const updatedItems = [...formData.items, newItem];
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const removeInvoiceItem = (index: number) => {
    if (formData.items.length <= 1) return; // Keep at least one item

    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
    recalculateTotals(updatedItems);
  };

  const recalculateTotals = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxRate = formData.taxRate || 0;
    const salesTax =
      taxRate > 0 ? subtotal * (taxRate / 100) : formData.salesTax || 0;
    const other = formData.other || 0;
    const total = subtotal + salesTax + other;

    setFormData((prev) => ({
      ...prev,
      subtotal,
      salesTax,
      total,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Helper function to generate invoice number
  const generateInvoiceNumber = () => {
    const prefix = "INV";
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const timestamp = new Date().getTime().toString().slice(-4);
    return `${prefix}-${randomDigits}-${timestamp}`;
  };

  // Helper function to generate customer ID
  const generateCustomerId = (companyName: string, contactPerson: string) => {
    if (!companyName && !contactPerson) return "";

    // Use first 3 letters of company name (or first letter if shorter) + first letter of contact person
    const companyPrefix = companyName
      ? companyName.substring(0, Math.min(3, companyName.length)).toUpperCase()
      : "";
    const contactPrefix = contactPerson
      ? contactPerson.charAt(0).toUpperCase()
      : "";

    // Add a random 3-digit number
    const randomDigits = Math.floor(100 + Math.random() * 900);

    return `${companyPrefix}${contactPrefix}-${randomDigits}`;
  };

  // Basic form structure - needs significant styling and refinement
  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Invoice</h2>

      {/* Company Info Section */}
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-medium px-2">Company Info</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="companyAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Company Address
            </label>
            <input
              type="text"
              name="companyAddress"
              id="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="companyPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Company Phone
            </label>
            <input
              type="text"
              name="companyPhone"
              id="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="companyEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Company Email
            </label>
            <input
              type="email"
              name="companyEmail"
              id="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="logoUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Logo URL (Optional)
            </label>
            <input
              type="text"
              name="logoUrl"
              id="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </fieldset>

      {/* Bill To Section */}
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-medium px-2">Bill To</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="billToContactPerson"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Person
            </label>
            <input
              type="text"
              name="billToContactPerson"
              id="billToContactPerson"
              value={formData.billToContactPerson}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="billToCompanyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              name="billToCompanyName"
              id="billToCompanyName"
              value={formData.billToCompanyName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="billToLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="billToLocation"
              id="billToLocation"
              value={formData.billToLocation}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="billToPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              name="billToPhone"
              id="billToPhone"
              value={formData.billToPhone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </fieldset>

      {/* Invoice Details Section */}
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-medium px-2">Invoice Details</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="invoiceNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Invoice #
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    invoiceNumber: generateInvoiceNumber(),
                  }))
                }
                className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Generate
              </button>
            </label>
            <input
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="invoiceDate"
              className="block text-sm font-medium text-gray-700"
            >
              Invoice Date
            </label>
            <input
              type="date"
              name="invoiceDate"
              id="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="invoiceDueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              name="invoiceDueDate"
              id="invoiceDueDate"
              value={formData.invoiceDueDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="customerID"
              className="block text-sm font-medium text-gray-700"
            >
              Customer ID
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    customerID: generateCustomerId(
                      formData.billToCompanyName,
                      formData.billToContactPerson
                    ),
                  }))
                }
                className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Generate
              </button>
            </label>
            <input
              type="text"
              name="customerID"
              id="customerID"
              value={formData.customerID}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="preparedBy"
              className="block text-sm font-medium text-gray-700"
            >
              Prepared By
            </label>
            <input
              type="text"
              name="preparedBy"
              id="preparedBy"
              value={formData.preparedBy}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </fieldset>

      {/* Items Section */}
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-medium px-2">
          Items
          <button
            type="button"
            onClick={addInvoiceItem}
            className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Add Item
          </button>
        </legend>
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 mb-2 items-center">
            <input
              type="number"
              name="quantity"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="border border-gray-300 rounded-md shadow-sm p-2"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              className="col-span-2 border border-gray-300 rounded-md shadow-sm p-2"
            />
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
              className="border border-gray-300 rounded-md shadow-sm p-2"
            />
            <span className="text-right p-2">${item.amount.toFixed(2)}</span>
            <button
              type="button"
              onClick={() => removeInvoiceItem(index)}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              disabled={formData.items.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
      </fieldset>

      {/* Tax and Totals Section */}
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-medium px-2">
          Tax and Additional Charges
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="taxRate"
              className="block text-sm font-medium text-gray-700"
            >
              Tax Rate (%)
            </label>
            <input
              type="number"
              name="taxRate"
              id="taxRate"
              value={formData.taxRate || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setFormData((prev) => {
                  const newSalesTax = (prev.subtotal * value) / 100;
                  const newTotal =
                    prev.subtotal + newSalesTax + (prev.other || 0);
                  return {
                    ...prev,
                    taxRate: value,
                    salesTax: newSalesTax,
                    total: newTotal,
                  };
                });
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="salesTax"
              className="block text-sm font-medium text-gray-700"
            >
              Sales Tax ($)
            </label>
            <input
              type="number"
              name="salesTax"
              id="salesTax"
              value={formData.salesTax || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setFormData((prev) => {
                  const newTotal = prev.subtotal + value + (prev.other || 0);
                  return { ...prev, salesTax: value, total: newTotal };
                });
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="other"
              className="block text-sm font-medium text-gray-700"
            >
              Other Charges ($)
            </label>
            <input
              type="number"
              name="other"
              id="other"
              value={formData.other || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setFormData((prev) => {
                  const newTotal = prev.subtotal + (prev.salesTax || 0) + value;
                  return { ...prev, other: value, total: newTotal };
                });
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span>${formData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Sales Tax:</span>
              <span>${(formData.salesTax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Other:</span>
              <span>${(formData.other || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>TOTAL:</span>
              <span>${formData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Footer Info Section */}
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-medium px-2">Footer Info</legend>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="contactInfo"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Info
            </label>
            <textarea
              name="contactInfo"
              id="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="paymentInfo"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Info
            </label>
            <textarea
              name="paymentInfo"
              id="paymentInfo"
              value={formData.paymentInfo}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="thankYouMessage"
              className="block text-sm font-medium text-gray-700"
            >
              Thank You Message
            </label>
            <input
              type="text"
              name="thankYouMessage"
              id="thankYouMessage"
              value={formData.thankYouMessage}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
      >
        Save Invoice
      </button>
    </form>
  );
};

// --- Send Mail Popup Component ---
const SendMailPopup: React.FC<{
  onClose: () => void;
  onSend: (emails: string) => void;
}> = ({ onClose, onSend }) => {
  const [emails, setEmails] = useState("");

  const handleSend = () => {
    onSend(emails);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Send Invoice via Email</h3>
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="Enter email addresses, separated by commas"
          rows={3}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PDF Document Component ---
// Register fonts if needed for PDF (especially for non-Latin characters)
// Font.register({ family: 'Roboto', src: 'path/to/Roboto.ttf' });

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#FFFFFF", padding: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    padding: 20,
    marginBottom: 20,
  },
  headerText: { fontSize: 12 },
  invoiceTitle: { fontSize: 30, fontWeight: "bold" },
  section: { marginBottom: 15, fontSize: 10 },
  grid: { flexDirection: "row", justifyContent: "space-between" },
  col: { width: "48%" },
  h3: { fontSize: 12, fontWeight: "bold", marginBottom: 5 },
  text: { marginBottom: 3 },
  textRight: { textAlign: "right" },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  tableHeader: { backgroundColor: "#000000", color: "#FFFFFF" },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 9,
    fontWeight: "bold",
  },
  tableColDescHeader: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 9,
    fontWeight: "bold",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 9,
  },
  tableColDesc: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 9,
  },
  tableCell: { textAlign: "right" },
  tableCellCenter: { textAlign: "center" },
  totalsSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  totalsBox: { width: "35%" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  totalLabel: {}, // fontSize: 10
  totalValue: {}, // fontSize: 10
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#000000",
    color: "#FFFFFF",
    marginTop: 5,
  },
  grandTotalLabel: { fontWeight: "bold" }, // fontSize: 11
  grandTotalValue: { fontWeight: "bold" }, // fontSize: 11
  footer: {
    fontSize: 9,
    color: "#555555",
    borderTopColor: "#cccccc",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  footerText: { marginBottom: 5 },
  thankYou: { fontSize: 12, fontWeight: "bold", marginTop: 10 },
});

const InvoicePDF: React.FC<{ invoiceData: InvoiceData }> = ({
  invoiceData,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          {/* Add Logo rendering for PDF if available */}
          <Text style={styles.headerText}>{invoiceData.companyName}</Text>
          <Text style={styles.headerText}>Leveraging Technology</Text>
        </View>
        <Text style={styles.invoiceTitle}>INVOICE</Text>
      </View>

      {/* Company & Invoice Details */}
      <View style={[styles.section, styles.grid]}>
        <View style={styles.col}>
          <Text style={styles.h3}>Company Address</Text>
          <Text style={styles.text}>{invoiceData.companyName}</Text>
          <Text style={styles.text}>Phone: {invoiceData.companyPhone}</Text>
          <Text style={styles.text}>Email: {invoiceData.companyEmail}</Text>
        </View>
        <View style={[styles.col, styles.textRight]}>
          <Text style={styles.text}>Date: {invoiceData.invoiceDate}</Text>
          <Text style={styles.text}>
            Invoice #: {invoiceData.invoiceNumber}
          </Text>
          <Text style={styles.text}>Customer ID: {invoiceData.customerID}</Text>
        </View>
      </View>

      {/* Bill To & Prepared By */}
      <View style={[styles.section, styles.grid]}>
        <View style={styles.col}>
          <Text style={styles.h3}>Bill To</Text>
          <Text style={styles.text}>
            Contact Person: {invoiceData.billToContactPerson}
          </Text>
          <Text style={styles.text}>
            Company Name: {invoiceData.billToCompanyName}
          </Text>
          <Text style={styles.text}>
            Location: {invoiceData.billToLocation}
          </Text>
          <Text style={styles.text}>Phone: {invoiceData.billToPhone}</Text>
        </View>
        <View style={[styles.col, styles.textRight]}>
          <Text style={styles.text}>Prepared by: {invoiceData.preparedBy}</Text>
        </View>
      </View>

      {/* Invoice Due Date */}
      <View style={styles.section}>
        <Text style={styles.text}>
          Invoice Due Date: {invoiceData.invoiceDueDate}
        </Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableColHeader}>
            <Text>Quantity</Text>
          </View>
          <View style={styles.tableColDescHeader}>
            <Text>Description</Text>
          </View>
          <View style={[styles.tableColHeader, styles.tableCell]}>
            <Text>Unit Price</Text>
          </View>
          <View style={[styles.tableColHeader, styles.tableCellCenter]}>
            <Text>Taxable?</Text>
          </View>
          <View style={[styles.tableColHeader, styles.tableCell]}>
            <Text>Amount</Text>
          </View>
        </View>
        {/* Table Body */}
        {invoiceData.items
          .filter((item) => item.quantity > 0)
          .map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={[styles.tableCol, styles.tableCellCenter]}>
                <Text>{item.quantity}</Text>
              </View>
              <View style={styles.tableColDesc}>
                <Text>{item.description}</Text>
              </View>
              <View style={[styles.tableCol, styles.tableCell]}>
                <Text>${item.unitPrice.toFixed(2)}</Text>
              </View>
              <View style={[styles.tableCol, styles.tableCellCenter]}>
                <Text>{item.taxable ? "Yes" : "No"}</Text>
              </View>
              <View style={[styles.tableCol, styles.tableCell]}>
                <Text>${item.amount.toFixed(2)}</Text>
              </View>
            </View>
          ))}
      </View>

      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>
              ${invoiceData.subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax Rate</Text>
            <Text style={styles.totalValue}>
              {invoiceData.taxRate ? `${invoiceData.taxRate}%` : "-"}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sales Tax</Text>
            <Text style={styles.totalValue}>
              {invoiceData.salesTax
                ? `$${invoiceData.salesTax.toFixed(2)}`
                : "-"}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Other</Text>
            <Text style={styles.totalValue}>
              {invoiceData.other ? `$${invoiceData.other.toFixed(2)}` : "-"}
            </Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>TOTAL</Text>
            <Text style={styles.grandTotalValue}>
              ${invoiceData.total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{invoiceData.contactInfo}</Text>
        <Text style={styles.footerText}>{invoiceData.paymentInfo}</Text>
        <Text style={styles.thankYou}>{invoiceData.thankYouMessage}</Text>
      </View>
    </Page>
  </Document>
);

// --- Main Invoice Component ---
const InvoiceFour: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(initialInvoiceData);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  // Print Handler
  const handlePrint = useReactToPrint({
    documentTitle: `Invoice-${invoiceData.invoiceNumber}`,
    // @ts-ignore - Type definition mismatch in react-to-print library
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      // Ensure we're in preview mode before printing
      if (isEditMode) {
        setIsEditMode(false);
        // Return a promise to ensure the print waits for the state update
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 100);
        });
      }
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log("Print completed successfully");
    },
  });

  // Download Handler (using PDFDownloadLink)
  const PdfLinkComponent = (
    <PDFDownloadLink
      document={<InvoicePDF invoiceData={invoiceData} />}
      fileName={`Invoice-${invoiceData.invoiceNumber}.pdf`}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 no-underline"
    >
      {/* @ts-ignore - Type definition mismatch in @react-pdf/renderer library */}
      {({ blob, url, loading, error }) =>
        loading ? "Loading PDF..." : "Download PDF"
      }
    </PDFDownloadLink>
  );

  // Send Mail Handler
  const handleSendMailClick = () => {
    setShowMailPopup(true);
  };

  const handleSendMailSubmit = (emails: string) => {
    console.log("Sending invoice to:", emails);
    // Here you would typically trigger a backend API call
    // For now, just log the emails
    alert(`Invoice would be sent to: ${emails}`);
  };

  // Edit Mode Toggle
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Generate Invoice Number
  const generateInvoiceNumber = () => {
    const prefix = "INV";
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const timestamp = new Date().getTime().toString().slice(-4);
    return `${prefix}-${randomDigits}-${timestamp}`;
  };

  // Generate Customer ID from customer info
  const generateCustomerId = (companyName: string, contactPerson: string) => {
    if (!companyName && !contactPerson) return "";

    // Use first 3 letters of company name (or first letter if shorter) + first letter of contact person
    const companyPrefix = companyName
      ? companyName.substring(0, Math.min(3, companyName.length)).toUpperCase()
      : "";
    const contactPrefix = contactPerson
      ? contactPerson.charAt(0).toUpperCase()
      : "";

    // Add a random 3-digit number
    const randomDigits = Math.floor(100 + Math.random() * 900);

    return `${companyPrefix}${contactPrefix}-${randomDigits}`;
  };

  // Form Submit Handler
  const handleFormSubmit = (data: InvoiceData) => {
    console.log("Invoice Form Submitted:", data);
    setInvoiceData(data);
    setIsEditMode(false); // Switch back to preview after submit
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      {/* Action Buttons Area */}
      <div className="p-4 bg-gray-100 border-b flex flex-wrap justify-end gap-2">
        {!isEditMode && (
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 text-sm"
          >
            Print
          </button>
        )}
        {!isEditMode && PdfLinkComponent}
        {!isEditMode && (
          <button
            onClick={handleSendMailClick}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200 text-sm"
          >
            Send Via Mail
          </button>
        )}
        <button
          onClick={toggleEditMode}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200 text-sm"
        >
          {isEditMode ? "Preview Mode" : "Edit Mode"}
        </button>
      </div>

      {/* Invoice Content Area */}
      <div ref={componentRef} className="invoice-content-area">
        {isEditMode ? (
          <InvoiceForm initialData={invoiceData} onSubmit={handleFormSubmit} />
        ) : (
          <InvoicePreview invoiceData={invoiceData} />
        )}
      </div>

      {/* Mail Popup */}
      {showMailPopup && (
        <SendMailPopup
          onClose={() => setShowMailPopup(false)}
          onSend={handleSendMailSubmit}
        />
      )}
    </div>
  );
};

export default InvoiceFour;
