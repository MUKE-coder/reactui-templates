"use client";
import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
interface InvoiceItem {
  id: string; // Unique ID for React keys and easier management
  quantity: number | "";
  description: string;
  unitPrice: number | "";
  taxable: boolean;
  amount: number;
}

// Define the overall structure for invoice data
interface InvoiceData {
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    logoUrl: string; // Added for company logo
  };
  invoiceDetails: {
    date: string;
    invoiceNumber: string;
    customerID: string;
    preparedBy: string;
    invoiceDueDate: string;
  };
  billTo: {
    contactPerson: string;
    companyName: string;
    location: string;
    phone: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number; // Stored as a percentage (e.g., 0.05 for 5%)
  salesTax: number;
  other: number;
  total: number;
  notes: string;
  paymentInfo: string;
  thankYouMessage: string;
}

// Initial dummy data for the invoice
const initialInvoiceData: InvoiceData = {
  company: {
    name: "DESISHUB",
    address: "Company Address",
    phone: "0762063160 | 0756384580",
    email: "info@desishub.com",
    logoUrl: "https://placehold.co/150x50/A0B3D6/FFFFFF?text=DESISHUB", // Placeholder logo
  },
  invoiceDetails: {
    date: "2025-05-22",
    invoiceNumber: "30098",
    customerID: "CCL",
    preparedBy: "JB",
    invoiceDueDate: "2025-05-22",
  },
  billTo: {
    contactPerson: "Mary Awalith",
    companyName: "CODELABS CO. LTD",
    location: "South Sudan",
    phone: "922031601",
  },
  items: [
    {
      id: "item-1",
      quantity: 1,
      description:
        "Payment for Backend Development of a Shipment and Tracking Web application",
      unitPrice: 300.0,
      taxable: false,
      amount: 300.0,
    },
    {
      id: "item-2",
      quantity: "",
      description: "",
      unitPrice: "",
      taxable: false,
      amount: 0,
    },
    {
      id: "item-3",
      quantity: "",
      description: "",
      unitPrice: "",
      taxable: false,
      amount: 0,
    },
  ],
  subtotal: 300.0,
  taxRate: 0, // 0% initially
  salesTax: 0,
  other: 0,
  total: 300.0,
  notes: "If you have any questions concerning this Invoice, please contact:",
  paymentInfo:
    "All dues are Payable to Desishub through Cash or MTN MOMO 0762 063 160",
  thankYouMessage: "Thank you for your business!",
};

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

// Invoice Preview Component
const InvoicePreview: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto my-8 font-inter">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          {/* Company Logo */}
          <img
            src={invoice.company.logoUrl}
            alt={`${invoice.company.name} Logo`}
            className="h-16 w-auto mr-4 object-contain" // Adjust size as needed
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/150x50/CCCCCC/000000?text=Logo";
            }} // Fallback
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {invoice.company.name}
            </h1>
            <p className="text-md text-indigo-600">Leveraging Technology</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            INVOICE
          </h2>
          <p className="text-sm text-gray-600">
            Date: {invoice.invoiceDetails.date}
          </p>
          <p className="text-sm text-gray-600">
            Invoice #: {invoice.invoiceDetails.invoiceNumber}
          </p>
          <p className="text-sm text-gray-600">
            Customer ID: {invoice.invoiceDetails.customerID}
          </p>
        </div>
      </div>

      {/* Company and Bill To Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Company Address
          </h3>
          <p className="text-sm text-gray-600">{invoice.company.name}</p>
          <p className="text-sm text-gray-600">
            Phone: {invoice.company.phone}
          </p>
          <p className="text-sm text-gray-600">
            Email: {invoice.company.email}
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Bill To</h3>
          <p className="text-sm text-gray-600">
            Contact Person: {invoice.billTo.contactPerson}
          </p>
          <p className="text-sm text-gray-600">
            Company Name: {invoice.billTo.companyName}
          </p>
          <p className="text-sm text-gray-600">
            Location: {invoice.billTo.location}
          </p>
          <p className="text-sm text-gray-600">Phone: {invoice.billTo.phone}</p>
          <p className="text-sm text-gray-600 mt-2">
            Prepared by: {invoice.invoiceDetails.preparedBy}
          </p>
          <p className="text-sm text-gray-600">
            Invoice Due Date: {invoice.invoiceDetails.invoiceDueDate}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taxable?
              </th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {item.description}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">
                  {formatCurrency(item.unitPrice as number)}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">
                  {item.taxable ? "Yes" : "No"}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800 text-right">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="flex justify-end mb-8">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-sm text-gray-700">Subtotal</span>
            <span className="text-sm font-semibold text-gray-800">
              {formatCurrency(invoice.subtotal)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-sm text-gray-700">
              Tax Rate ({invoice.taxRate * 100}%)
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {formatCurrency(invoice.salesTax)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-sm text-gray-700">Other</span>
            <span className="text-sm font-semibold text-gray-800">
              {formatCurrency(invoice.other)}
            </span>
          </div>
          <div className="flex justify-between py-3 mt-4 border-t-2 border-indigo-600">
            <span className="text-lg font-bold text-gray-800">TOTAL</span>
            <span className="text-lg font-extrabold text-indigo-700">
              {formatCurrency(invoice.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="text-sm text-gray-600 mb-4">
        <p>{invoice.notes}</p>
        <p className="mt-1">Call or Whatsapp: {invoice.company.phone}</p>
      </div>
      <div className="text-sm text-gray-600 mb-8">
        <p>{invoice.paymentInfo}</p>
      </div>

      <div className="text-center text-lg font-semibold text-gray-700">
        <p>{invoice.thankYouMessage}</p>
      </div>
    </div>
  );
};

// Invoice Form Component
const InvoiceForm: React.FC<{
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
  onSubmit: (data: InvoiceData) => void;
}> = ({ invoice, setInvoice, onSubmit }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Handle nested state updates
    if (name.startsWith("company.")) {
      setInvoice((prev) => ({
        ...prev,
        company: { ...prev.company, [name.split(".")[1]]: value },
      }));
    } else if (name.startsWith("invoiceDetails.")) {
      setInvoice((prev) => ({
        ...prev,
        invoiceDetails: { ...prev.invoiceDetails, [name.split(".")[1]]: value },
      }));
    } else if (name.startsWith("billTo.")) {
      setInvoice((prev) => ({
        ...prev,
        billTo: { ...prev.billTo, [name.split(".")[1]]: value },
      }));
    } else {
      // Handle top-level fields like notes, paymentInfo, thankYouMessage, taxRate, other
      setInvoice((prev) => ({
        ...prev,
        [name]:
          name === "taxRate" || name === "other"
            ? parseFloat(value) || 0
            : value,
      }));
    }
  };

  const handleItemChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setInvoice((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          let updatedValue: string | number | boolean = value;
          if (type === "number") {
            updatedValue = parseFloat(value) || "";
          } else if (type === "checkbox") {
            updatedValue = (e.target as HTMLInputElement).checked;
          }
          return { ...item, [name]: updatedValue };
        }
        return item;
      });
      return { ...prev, items: updatedItems };
    });
  };

  // Effect to recalculate totals whenever invoice data or items change
  useEffect(() => {
    setInvoice((prev) => {
      let newSubtotal = 0;
      prev.items.forEach((item) => {
        const quantity = typeof item.quantity === "number" ? item.quantity : 0;
        const unitPrice =
          typeof item.unitPrice === "number" ? item.unitPrice : 0;
        const itemAmount = quantity * unitPrice;
        newSubtotal += itemAmount;
        // Update individual item amount within the state
        item.amount = itemAmount;
      });

      const newSalesTax = newSubtotal * prev.taxRate;
      const newTotal = newSubtotal + newSalesTax + prev.other;

      return {
        ...prev,
        subtotal: newSubtotal,
        salesTax: newSalesTax,
        total: newTotal,
      };
    });
  }, [invoice.items, invoice.taxRate, invoice.other, setInvoice]);

  const handleAddItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`, // Unique ID
          quantity: "",
          description: "",
          unitPrice: "",
          taxable: false,
          amount: 0,
        },
      ],
    }));
  };

  const handleRemoveItem = (id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto my-8 font-inter">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Invoice Details
      </h2>

      {/* Company Information */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            name="company.name"
            value={invoice.company.name}
            onChange={handleChange}
          />
          <Input
            label="Company Address"
            name="company.address"
            value={invoice.company.address}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="company.phone"
            value={invoice.company.phone}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="company.email"
            value={invoice.company.email}
            onChange={handleChange}
          />
          <Input
            label="Logo URL"
            name="company.logoUrl"
            value={invoice.company.logoUrl}
            onChange={handleChange}
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Invoice Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            name="invoiceDetails.date"
            type="date"
            value={invoice.invoiceDetails.date}
            onChange={handleChange}
          />
          <Input
            label="Invoice #"
            name="invoiceDetails.invoiceNumber"
            value={invoice.invoiceDetails.invoiceNumber}
            onChange={handleChange}
          />
          <Input
            label="Customer ID"
            name="invoiceDetails.customerID"
            value={invoice.invoiceDetails.customerID}
            onChange={handleChange}
          />
          <Input
            label="Prepared By"
            name="invoiceDetails.preparedBy"
            value={invoice.invoiceDetails.preparedBy}
            onChange={handleChange}
          />
          <Input
            label="Invoice Due Date"
            name="invoiceDetails.invoiceDueDate"
            type="date"
            value={invoice.invoiceDetails.invoiceDueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Bill To Information */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Bill To</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contact Person"
            name="billTo.contactPerson"
            value={invoice.billTo.contactPerson}
            onChange={handleChange}
          />
          <Input
            label="Company Name"
            name="billTo.companyName"
            value={invoice.billTo.companyName}
            onChange={handleChange}
          />
          <Input
            label="Location"
            name="billTo.location"
            value={invoice.billTo.location}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="billTo.phone"
            value={invoice.billTo.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Items Section */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Invoice Items
        </h3>
        {invoice.items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 items-end border-b pb-4 border-gray-200 last:border-b-0"
          >
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(item.id, e)}
              min="0"
            />
            <Input
              label="Description"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, e)}
              className="md:col-span-2"
            />
            <Input
              label="Unit Price"
              name="unitPrice"
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(item.id, e)}
              min="0"
              step="0.01"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="taxable"
                checked={item.taxable}
                onChange={(e) => handleItemChange(item.id, e)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor={`taxable-${item.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Taxable?
              </label>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <span className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-100 text-gray-600">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveItem(item.id)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 self-center"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          Add Item
        </button>
      </div>

      {/* Totals and Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Notes & Payment Info
          </h3>
          <TextArea
            label="Notes"
            name="notes"
            value={invoice.notes}
            onChange={handleChange}
            rows={3}
          />
          <TextArea
            label="Payment Info"
            name="paymentInfo"
            value={invoice.paymentInfo}
            onChange={handleChange}
            rows={3}
          />
          <Input
            label="Thank You Message"
            name="thankYouMessage"
            value={invoice.thankYouMessage}
            onChange={handleChange}
          />
        </div>
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Totals</h3>
          <Input
            label="Tax Rate (%)"
            name="taxRate"
            type="number"
            value={invoice.taxRate * 100} // Display as percentage
            onChange={(e) =>
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  value: (parseFloat(e.target.value) / 100).toString(),
                },
              })
            } // Convert back to decimal
            min="0"
            step="0.01"
          />
          <Input
            label="Other Charges"
            name="other"
            type="number"
            value={invoice.other}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          <div className="flex justify-between py-2 mt-4 border-t border-gray-200">
            <span className="text-md font-medium text-gray-700">Subtotal:</span>
            <span className="text-md font-semibold text-gray-800">
              {formatCurrency(invoice.subtotal)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-md font-medium text-gray-700">
              Sales Tax:
            </span>
            <span className="text-md font-semibold text-gray-800">
              {formatCurrency(invoice.salesTax)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-t-2 border-indigo-600 mt-2">
            <span className="text-lg font-bold text-gray-800">TOTAL:</span>
            <span className="text-lg font-extrabold text-indigo-700">
              {formatCurrency(invoice.total)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => onSubmit(invoice)}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors duration-200"
        >
          Submit Invoice
        </button>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input: React.FC<{
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  min?: string;
  step?: string;
  className?: string;
}> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  min,
  step,
  className = "",
}) => (
  <div className={`flex flex-col ${className}`}>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      min={min}
      step={step}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
    />
  </div>
);

// Reusable TextArea Component
const TextArea: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
}> = ({ label, name, value, onChange, rows = 3, className = "" }) => (
  <div className={`flex flex-col mb-4 ${className}`}>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
    ></textarea>
  </div>
);

// Email Modal Component
const EmailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSend: (emails: string[]) => void;
}> = ({ isOpen, onClose, onSend }) => {
  const [emailList, setEmailList] = useState("");

  if (!isOpen) return null;

  const handleSendClick = () => {
    const emails = emailList
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
    onSend(emails);
    setEmailList(""); // Clear input after sending
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Send Invoice via Email
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter email addresses, separated by commas.
        </p>
        <TextArea
          label="Email Addresses"
          name="emailList"
          value={emailList}
          onChange={(e) => setEmailList(e.target.value)}
          rows={5}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSendClick}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const InvoiceThree: React.FC = () => {
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(initialInvoiceData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null); // Ref for the invoice preview component

  // Function to handle printing using window.print()
  const handlePrint = () => {
    if (invoiceRef.current) {
      const printContent = invoiceRef.current.innerHTML;
      const originalBody = document.body.innerHTML;
      document.body.innerHTML = `
        <html>
          <head>
            <title>Invoice</title>
            <link href="https://cdn.tailwindcss.com" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <style>
              @page { size: A4; margin: 20mm; }
              body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
              /* Ensure the invoice content is centered and fits A4 */
              .invoice-print-container {
                width: 210mm; /* A4 width */
                min-height: 297mm; /* A4 height */
                margin: 0 auto;
                padding: 20mm;
                box-sizing: border-box; /* Include padding in width/height */
              }
              /* Hide elements not needed for print */
              .no-print { display: none; }
              /* Force background colors and images to print */
              @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .bg-white { background-color: #ffffff !important; }
                .shadow-xl { box-shadow: none !important; }
                .rounded-lg { border-radius: 0 !important; }
                .border-b { border-bottom-width: 1px !important; }
                .border-gray-200 { border-color: #e5e7eb !important; }
                .bg-gray-50 { background-color: #f9fafb !important; }
                .text-indigo-600 { color: #4f46e5 !important; }
                .border-indigo-600 { border-color: #4f46e5 !important; }
                table, th, td { border-collapse: collapse !important; }
                th, td { border: 1px solid #e5e7eb !important; } /* Add borders to table cells for print */
              }
            </style>
          </head>
          <body>
            <div class="invoice-print-container">
              ${printContent}
            </div>
          </body>
        </html>
      `;
      window.print();
      document.body.innerHTML = originalBody; // Restore original body content
      window.location.reload(); // Reload to ensure React re-renders correctly
    }
  };

  // Function to handle PDF download
  const handleDownloadPdf = async () => {
    if (invoiceRef.current) {
      // Ensure html2canvas and jspdf are loaded
      if (
        typeof html2canvas === "undefined" ||
        typeof (window as any).jsPDF === "undefined"
      ) {
        console.error(
          "html2canvas or jsPDF not loaded. Please ensure CDN scripts are available."
        );
        return;
      }

      const input = invoiceRef.current;
      const canvas = await html2canvas(input, { scale: 2, useCORS: true }); // Scale up for better quality
      const imgData = canvas.toDataURL("image/png");
      const pdf = new (window as any).jsPDF("p", "mm", "a4"); // 'p' for portrait, 'mm' for millimeters, 'a4' size
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice-${invoiceData.invoiceDetails.invoiceNumber}.pdf`);
    }
  };

  // Function to handle sending emails
  const handleSendEmails = (emails: string[]) => {
    console.log("Sending invoice to:", emails);
    // In a real application, you would send this data to a backend API
    // which would then handle the actual email sending.
    // Example: fetch('/api/send-invoice-email', { method: 'POST', body: JSON.stringify({ invoiceData, emails }) });
  };

  // Function to handle form submission (console log data)
  const handleFormSubmit = (data: InvoiceData) => {
    console.log("Invoice Data Submitted:", data);
    setIsEditMode(false); // Switch back to preview mode after submission
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center font-inter">
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl no-print">
        {" "}
        {/* Added no-print class */}
        <button
          onClick={handlePrint}
          className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 4V2a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2zm0 10v4h10v-4H5zm1-7a1 1 0 100 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>
          Print
        </button>
        <button
          onClick={handleDownloadPdf}
          className="flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          Download PDF
        </button>
        <button
          onClick={() => setShowEmailModal(true)}
          className="flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
          Send Via Mail
        </button>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="flex items-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 10.928a1 1 0 01-.424 1.054l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.054-.424l.784-.784 2.828 2.828-.784.784z"></path>
          </svg>
          {isEditMode ? "Preview Mode" : "Edit Mode"}
        </button>
      </div>

      {/* Invoice Display Area */}
      <div ref={invoiceRef} className="w-full">
        {isEditMode ? (
          <InvoiceForm
            invoice={invoiceData}
            setInvoice={setInvoiceData}
            onSubmit={handleFormSubmit}
          />
        ) : (
          <InvoicePreview invoice={invoiceData} />
        )}
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={handleSendEmails}
      />
    </div>
  );
};

export default InvoiceThree;
