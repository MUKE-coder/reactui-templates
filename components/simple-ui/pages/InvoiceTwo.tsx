"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Printer,
  Download,
  Mail,
  Edit3,
  Plus,
  Trash2,
  X,
  Check,
  Upload,
  RefreshCw,
} from "lucide-react";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxable: boolean;
}

interface InvoiceFormData {
  companyName: string;
  companySlogan: string;
  companyPhone: string;
  companyPhone2: string;
  companyEmail: string;
  companyLogo: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerId: string;
  preparedBy: string;
  billToContact: string;
  billToCompany: string;
  billToLocation: string;
  billToPhone: string;
  items: InvoiceItem[];
  taxRate: number;
  contactInfo: string;
  paymentInfo: string;
}

const InvoiceTwo: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailList, setEmailList] = useState("");
  const [logoPreview, setLogoPreview] = useState<string>("");
  const componentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `INV-${timestamp}${random}`;
  };

  const defaultValues: InvoiceFormData = {
    companyName: "DESISHUB",
    companySlogan: "Leveraging Technology",
    companyPhone: "0762063160",
    companyPhone2: "0756384580",
    companyEmail: "info@desishub.com",
    companyLogo: "",
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    customerId: "CCL",
    preparedBy: "JB",
    billToContact: "Mary Awalith",
    billToCompany: "CODELABS CO. LTD",
    billToLocation: "South Sudan",
    billToPhone: "922031601",
    items: [
      {
        description:
          "Payment for Backend Development of a Shipment and Tracking Web application",
        quantity: 1,
        unitPrice: 300.0,
        taxable: false,
      },
    ],
    taxRate: 0,
    contactInfo:
      "If you have any questions concerning this Invoice, please contact:",
    paymentInfo:
      "All dues are Payable to Desishub through Cash or MTN MOMO 0762063160",
  };

  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<InvoiceFormData>({
      defaultValues,
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedData = watch();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const emails = emailList
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);
    console.log("Sending invoice to emails:", emails);
    alert(`Invoice would be sent to: ${emails.join(", ")}`);
    setShowEmailModal(false);
    setEmailList("");
  };

  const addItem = () => {
    append({
      description: "",
      quantity: 1,
      unitPrice: 0,
      taxable: false,
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        setValue("companyLogo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const regenerateInvoiceNumber = () => {
    setValue("invoiceNumber", generateInvoiceNumber());
  };

  const calculateSubtotal = () => {
    return (
      watchedData.items?.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      ) || 0
    );
  };

  const calculateTax = () => {
    const taxableAmount =
      watchedData.items
        ?.filter((item) => item.taxable)
        .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
    return taxableAmount * ((watchedData.taxRate || 0) / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const onSubmit = (data: InvoiceFormData) => {
    console.log("Invoice Data:", data);
    console.log("Calculated Values:", {
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
    });
    setIsEditMode(false);
  };

  const InvoicePreview = () => (
    <div
      ref={componentRef}
      className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-gray-900 w-16 h-16 rounded-lg flex items-center justify-center font-bold text-2xl overflow-hidden">
              {watchedData.companyLogo ? (
                <img
                  src={watchedData.companyLogo}
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                watchedData.companyName?.charAt(0) || "D"
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{watchedData.companyName}</h1>
              <p className="text-gray-300 text-lg">
                {watchedData.companySlogan}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-light tracking-wide">INVOICE</h2>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Company Address
            </h3>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium">{watchedData.companyName}</p>
              <p>
                Phone: {watchedData.companyPhone} | {watchedData.companyPhone2}
              </p>
              <p>Email: {watchedData.companyEmail}</p>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="text-right">
            <div className="space-y-2">
              <p>
                <span className="text-gray-600">Date</span>{" "}
                <span className="font-semibold ml-8">{watchedData.date}</span>
              </p>
              <p>
                <span className="text-gray-600">Invoice #</span>{" "}
                <span className="font-semibold ml-8">
                  {watchedData.invoiceNumber}
                </span>
              </p>
              <p>
                <span className="text-gray-600">Customer ID</span>{" "}
                <span className="font-semibold ml-8">
                  {watchedData.customerId}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bill To */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bill To
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                Contact Person:{" "}
                <span className="font-medium">{watchedData.billToContact}</span>
              </p>
              <p>
                Company Name:{" "}
                <span className="font-medium">{watchedData.billToCompany}</span>
              </p>
              <p>
                Location:{" "}
                <span className="font-medium">
                  {watchedData.billToLocation}
                </span>
              </p>
              <p>
                Phone:{" "}
                <span className="font-medium">{watchedData.billToPhone}</span>
              </p>
            </div>
            <p className="mt-4 text-gray-600">
              Invoice Due Date:{" "}
              <span className="font-semibold">{watchedData.dueDate}</span>
            </p>
          </div>

          {/* Prepared By */}
          <div className="text-right">
            <p className="text-gray-600">
              Prepared by:{" "}
              <span className="font-semibold">{watchedData.preparedBy}</span>
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left p-4 font-semibold">Quantity</th>
                <th className="text-left p-4 font-semibold">Description</th>
                <th className="text-right p-4 font-semibold">Unit Price</th>
                <th className="text-center p-4 font-semibold">Taxable?</th>
                <th className="text-right p-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {watchedData.items?.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-4 text-center font-medium">
                    {item.quantity}
                  </td>
                  <td className="p-4">{item.description}</td>
                  <td className="p-4 text-right font-medium">
                    ${item.unitPrice.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    {item.taxable ? "Yes" : "No"}
                  </td>
                  <td className="p-4 text-right font-semibold">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-between items-start">
          <div className="text-gray-600 space-y-2 max-w-md">
            <p>{watchedData.contactInfo}</p>
            <p>
              Call or Whatsapp: {watchedData.companyPhone} |{" "}
              {watchedData.companyPhone2}
            </p>
            <p className="mt-4 font-medium">{watchedData.paymentInfo}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg min-w-80">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax Rate</span>
                <span className="font-semibold">{watchedData.taxRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sales Tax</span>
                <span className="font-semibold">
                  ${calculateTax().toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center bg-gray-900 text-white p-3 rounded">
                  <span className="font-bold text-lg">TOTAL</span>
                  <span className="font-bold text-xl">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <h3 className="text-2xl font-light text-gray-800">
            Thank you for your business!
          </h3>
        </div>
      </div>
    </div>
  );

  const InvoiceForm = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Invoice</h2>
      <div className="space-y-8">
        {/* Company Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Company Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="companySlogan"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Company Slogan"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="companyEmail"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
                </button>
                {logoPreview && (
                  <div className="w-12 h-12 border rounded-lg overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            <Controller
              name="companyPhone"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Phone 1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="companyPhone2"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Phone 2"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Invoice Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Controller
                name="invoiceNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Invoice Number"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                )}
              />
              <button
                type="button"
                onClick={regenerateInvoiceNumber}
                className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                title="Generate new invoice number"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="customerId"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Customer ID"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="preparedBy"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Prepared By"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="taxRate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Tax Rate (%)"
                  min="0"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
          </div>
        </div>

        {/* Bill To Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Bill To Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="billToContact"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Contact Person"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="billToCompany"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Company Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="billToLocation"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="billToPhone"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Phone"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
          </div>
        </div>

        {/* Contact & Payment Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Contact & Payment Information
          </h3>
          <div className="space-y-4">
            <Controller
              name="contactInfo"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Contact information text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
            <Controller
              name="paymentInfo"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Payment information"
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              )}
            />
          </div>
        </div>

        {/* Items */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Invoice Items
            </h3>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-white rounded-lg border"
              >
                <Controller
                  name={`items.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Qty"
                      min="1"
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  )}
                />
                <Controller
                  name={`items.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Description"
                      className="md:col-span-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  )}
                />
                <Controller
                  name={`items.${index}.unitPrice`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Unit Price"
                      min="0"
                      step="0.01"
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Controller
                    name={`items.${index}.taxable`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="checkbox"
                        checked={field.value}
                        className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900"
                      />
                    )}
                  />
                  <span className="text-sm text-gray-600">Taxable</span>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center justify-center p-2 text-red-500 hover:bg-red-50 rounded transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setIsEditMode(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            <Printer className="w-5 h-5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition shadow-lg"
          >
            <Mail className="w-5 h-5" />
            <span>Send Via Email</span>
          </button>

          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition shadow-lg"
          >
            <Edit3 className="w-5 h-5" />
            <span>{isEditMode ? "Preview Mode" : "Edit Mode"}</span>
          </button>
        </div>

        {/* Main Content */}
        {isEditMode ? <InvoiceForm /> : <InvoicePreview />}

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Send Invoice Via Email
                </h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Addresses (separated by commas)
                  </label>
                  <textarea
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                    placeholder="email1@example.com, email2@example.com"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    <Check className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceTwo;
