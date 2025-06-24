"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Type,
  ImageIcon,
  Minus,
  MousePointer,
  List,
  ListOrdered,
  Hash,
  Play,
  CreditCard,
  Share2,
  Code,
  LayoutGrid,
  Rows,
  Tablet,
  Monitor,
  Smartphone,
} from "lucide-react";
import { sendNewsletter } from "@/actions/send-mails";

// Define the structure of an email component
interface EmailComponent {
  id: string;
  type:
    | "text"
    | "heading1"
    | "heading2"
    | "heading3"
    | "image"
    | "button"
    | "divider"
    | "bulletList"
    | "numberedList"
    | "youtubeVideo"
    | "pricingCard"
    | "socialLinks"
    | "codeBlock"
    | "section"
    | "productCard"
    | "twoColumnProductCards";
  content: string; // Primary editable text content
  props?: any; // Additional properties like URLs, prices, etc.
}

// Define the structure for component options in the slash menu
interface ComponentOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: EmailComponent["type"];
  description: string;
}

// List of all available component options for the slash menu
const componentOptions: ComponentOption[] = [
  {
    id: "text",
    label: "Text",
    icon: <Type className="w-4 h-4" />,
    type: "text",
    description: "Add a text paragraph",
  },
  {
    id: "image",
    label: "Image",
    icon: <ImageIcon className="w-4 h-4" />,
    type: "image",
    description: "Add an image",
  },
  {
    id: "heading1",
    label: "Heading 1",
    icon: <Hash className="w-4 h-4" />,
    type: "heading1",
    description: "Large heading",
  },
  {
    id: "heading2",
    label: "Heading 2",
    icon: <Hash className="w-4 h-4" />,
    type: "heading2",
    description: "Medium heading",
  },
  {
    id: "heading3",
    label: "Heading 3",
    icon: <Hash className="w-4 h-4" />,
    type: "heading3",
    description: "Small heading",
  },
  {
    id: "bulletList",
    label: "Bullet List",
    icon: <List className="w-4 h-4" />,
    type: "bulletList",
    description: "Create a bulleted list",
  },
  {
    id: "numberedList",
    label: "Numbered List",
    icon: <ListOrdered className="w-4 h-4" />,
    type: "numberedList",
    description: "Create a numbered list",
  },
  {
    id: "button",
    label: "Button",
    icon: <MousePointer className="w-4 h-4" />,
    type: "button",
    description: "Add a call-to-action button",
  },
  {
    id: "youtubeVideo",
    label: "YouTube Video",
    icon: <Play className="w-4 h-4" />,
    type: "youtubeVideo",
    description: "Embed a YouTube video",
  },
  {
    id: "pricingCard",
    label: "Pricing Card",
    icon: <CreditCard className="w-4 h-4" />,
    type: "pricingCard",
    description: "Display a pricing plan",
  },
  {
    id: "socialLinks",
    label: "Social Links",
    icon: <Share2 className="w-4 h-4" />,
    type: "socialLinks",
    description: "Add links to social media profiles",
  },
  {
    id: "codeBlock",
    label: "Code Block",
    icon: <Code className="w-4 h-4" />,
    type: "codeBlock",
    description: "Insert a block of code",
  },
  {
    id: "section",
    label: "Section",
    icon: <Rows className="w-4 h-4" />,
    type: "section",
    description: "A generic section for grouping content",
  },
  {
    id: "productCard",
    label: "Product Card",
    icon: <ImageIcon className="w-4 h-4" />, // Re-using image icon for now
    type: "productCard",
    description: "Showcase a single product",
  },
  {
    id: "twoColumnProductCards",
    label: "2 Column Product Cards",
    icon: <LayoutGrid className="w-4 h-4" />,
    type: "twoColumnProductCards",
    description: "Display two product cards side-by-side",
  },
  {
    id: "divider",
    label: "Divider",
    icon: <Minus className="w-4 h-4" />,
    type: "divider",
    description: "Add a horizontal line",
  },
];

// Mock audience data (replace with actual data from your backend)
const audiences = [
  {
    id: "1",
    name: "Developers",
    emails: ["gmukejohnbaptist@gmail.com", "desishub.info@gmail.com"],
  },
  {
    id: "2",
    name: "Marketers",
    emails: ["mkt1@example.com", "mkt2@example.com"],
  },
  {
    id: "3",
    name: "All Users",
    emails: ["user1@example.com", "user2@example.com", "user3@example.com"],
  },
];

export default function ReactEmailEditor() {
  const [components, setComponents] = useState<EmailComponent[]>([]);
  const [showComponentMenu, setShowComponentMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [currentInput, setCurrentInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(componentOptions);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectedAudience, setSelectedAudience] = useState<string>(""); // Stores the ID of the selected audience
  const [emailMeta, setEmailMeta] = useState({
    from: "Acme <acme@example.com>",
    to: "", // Will be populated from selectedAudience
    subject: "",
    previewText: "",
  });
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showComponentMenu) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedOptionIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedOptionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredOptions.length > 0) {
            handleComponentSelect(filteredOptions[selectedOptionIndex]);
          }
        } else if (e.key === "Escape") {
          setShowComponentMenu(false);
          setCurrentInput("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showComponentMenu, filteredOptions, selectedOptionIndex]);

  // Effect to update 'to' emailMeta when selectedAudience changes
  useEffect(() => {
    const audience = audiences.find((aud) => aud.id === selectedAudience);
    setEmailMeta((prev) => ({
      ...prev,
      to: audience ? audience.emails.join(",") : "",
    }));
  }, [selectedAudience]);

  const handleInputChange = (value: string) => {
    setCurrentInput(value);

    if (value === "/") {
      setShowComponentMenu(true);
      setFilteredOptions(componentOptions);
      setSelectedOptionIndex(0);

      // Get cursor position for menu placement
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setMenuPosition({ x: rect.left, y: rect.bottom + 5 });
      }
    } else if (value.startsWith("/") && value.length > 1) {
      const searchTerm = value.slice(1).toLowerCase();
      const filtered = componentOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm) ||
          option.description.toLowerCase().includes(searchTerm)
      );
      setFilteredOptions(filtered);
      setSelectedOptionIndex(0);
      setShowComponentMenu(true); // Keep menu open if filtering
    } else {
      setShowComponentMenu(false);
    }
  };

  const handleComponentSelect = (option: ComponentOption) => {
    const newComponent: EmailComponent = {
      id: Date.now().toString(),
      type: option.type,
      content: getDefaultContent(option.type),
      props: getDefaultProps(option.type),
    };

    setComponents((prev) => [...prev, newComponent]);
    setShowComponentMenu(false);
    setCurrentInput("");
  };

  const getDefaultContent = (type: EmailComponent["type"]): string => {
    switch (type) {
      case "text":
        return "Enter your text here...";
      case "heading1":
      case "heading2":
      case "heading3":
        return "Your Heading";
      case "button":
        return "Click Me";
      case "image":
        return "https://via.placeholder.com/400x200.png?text=Placeholder+Image";
      case "bulletList":
        return "• List item 1\n• List item 2\n• List item 3";
      case "numberedList":
        return "1. List item 1\n2. List item 2\n3. List item 3";
      case "divider":
        return "";
      case "youtubeVideo":
        return "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rick Astley for fun
      case "pricingCard":
        return "Basic Plan";
      case "socialLinks":
        return "Connect with us!";
      case "codeBlock":
        return `function helloWorld() {\n  console.log("Hello, Email!");\n}`;
      case "section":
        return "New Section";
      case "productCard":
        return "Awesome Product";
      case "twoColumnProductCards":
        return "Product A\nProduct B"; // Content can be minimal here, props hold details
      default:
        return "";
    }
  };

  const getDefaultProps = (type: EmailComponent["type"]) => {
    switch (type) {
      case "button":
        return {
          href: "https://example.com",
          style: {
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
          },
        };
      case "image":
        return { width: 400, height: 200, alt: "Placeholder Image" };
      case "youtubeVideo":
        return {
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          alt: "YouTube Video",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg", // Default YouTube thumbnail
        };
      case "pricingCard":
        return {
          price: "$99/month",
          features: ["✓ Feature A", "✓ Feature B", "✓ Feature C"],
          buttonText: "Get Started",
          buttonHref: "https://example.com/pricing",
        };
      case "socialLinks":
        return {
          links: [
            {
              platform: "facebook",
              url: "https://facebook.com/yourpage",
              iconUrl:
                "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
            },
            {
              platform: "twitter",
              url: "https://twitter.com/yourhandle",
              iconUrl:
                "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg",
            },
            {
              platform: "linkedin",
              url: "https://linkedin.com/in/yourprofile",
              iconUrl:
                "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
            },
          ],
        };
      case "productCard":
        return {
          imageUrl:
            "https://via.placeholder.com/150x150.png?text=Product+Image",
          description: "A fantastic product with amazing features.",
          price: "$29.99",
          buttonText: "Shop Now",
          buttonHref: "https://example.com/product/awesome",
        };
      case "twoColumnProductCards":
        return {
          products: [
            {
              imageUrl:
                "https://via.placeholder.com/100x100.png?text=Product+1",
              name: "Product One",
              description: "Short description for product one.",
              price: "$10.00",
              buttonText: "Buy 1",
              buttonHref: "https://example.com/product/1",
            },
            {
              imageUrl:
                "https://via.placeholder.com/100x100.png?text=Product+2",
              name: "Product Two",
              description: "Short description for product two.",
              price: "$20.00",
              buttonText: "Buy 2",
              buttonHref: "https://example.com/product/2",
            },
          ],
        };
      default:
        return {};
    }
  };

  const updateComponentContent = (id: string, newContent: string) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, content: newContent } : comp
      )
    );
  };

  const updateComponentProps = (id: string, newProps: any) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, props: { ...comp.props, ...newProps } }
          : comp
      )
    );
  };

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  const handleSendEmail = async () => {
    if (!emailMeta.subject || !emailMeta.to) {
      alert("Please fill in Subject and select an Audience.");
      return;
    }

    const emailData = {
      meta: emailMeta,
      blocks: components,
    };

    try {
      // Assuming your server action is available at /api/send-newsletter or a direct import
      // For simplicity here, we'll use a mock API route.
      // In a real Next.js server action scenario, you would import and call it directly:
      // import { sendNewsletter } from "@/app/actions/sendEmail";
      const response = await sendNewsletter(emailData);

      // Using fetch for API route example:
      // const response = await fetch("/api/send-newsletter", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(emailData),
      // });

      // const result = await response.json();

      if (response.success) {
        alert("Email sent successfully!");
        // Optionally reset editor:
        // setComponents([]);
        // setEmailMeta({ from: "Acme <acme@example.com>", to: "", subject: "", previewText: "" });
        // setSelectedAudience("");
      } else {
        alert(`Failed to send email: ${response.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  const renderEmailComponent = (component: EmailComponent) => {
    const commonProps = {
      key: component.id,
      className:
        "group relative border border-transparent hover:border-gray-200 rounded p-2",
    };

    // Function to render delete button
    const renderDeleteButton = () => (
      <Button
        size="sm"
        variant="ghost"
        onClick={() => deleteComponent(component.id)}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
      >
        ×
      </Button>
    );

    switch (component.type) {
      case "text":
        return (
          <div {...commonProps}>
            <textarea
              value={component.content}
              onChange={(e) =>
                updateComponentContent(component.id, e.target.value)
              }
              className="w-full p-2 border-none resize-none bg-transparent focus:outline-none"
              rows={3}
            />
            {renderDeleteButton()}
          </div>
        );

      case "heading1":
      case "heading2":
      case "heading3":
        const HeadingTag =
          component.type === "heading1"
            ? "h1"
            : component.type === "heading2"
            ? "h2"
            : "h3";
        const headingClass =
          component.type === "heading1"
            ? "text-3xl"
            : component.type === "heading2"
            ? "text-2xl"
            : "text-xl";
        return (
          <div {...commonProps}>
            <Input
              type="text"
              value={component.content}
              onChange={(e) =>
                updateComponentContent(component.id, e.target.value)
              }
              className={`w-full p-2 border-none bg-transparent focus:outline-none font-bold ${headingClass}`}
            />
            {renderDeleteButton()}
          </div>
        );

      case "image":
        return (
          <div {...commonProps}>
            <div className="space-y-2">
              <img
                src={
                  component.content ||
                  "https://via.placeholder.com/400x200.png?text=Image"
                }
                alt={component.props?.alt || "Image"}
                className="max-w-full h-auto rounded"
                style={{ maxHeight: "300px" }}
              />
              <Input
                type="text"
                value={component.content}
                onChange={(e) =>
                  updateComponentContent(component.id, e.target.value)
                }
                placeholder="Image URL"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Input
                type="text"
                value={component.props?.alt || ""}
                onChange={(e) =>
                  updateComponentProps(component.id, { alt: e.target.value })
                }
                placeholder="Alt Text"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {renderDeleteButton()}
          </div>
        );

      case "button":
        return (
          <div {...commonProps}>
            <div className="space-y-2 text-center py-2">
              <Button className="bg-black text-white hover:bg-gray-800">
                {component.content || "Click me"}
              </Button>
              <Input
                type="text"
                value={component.content}
                onChange={(e) =>
                  updateComponentContent(component.id, e.target.value)
                }
                placeholder="Button text"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Input
                type="text"
                value={component.props?.href || ""}
                onChange={(e) =>
                  updateComponentProps(component.id, { href: e.target.value })
                }
                placeholder="Button URL"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {renderDeleteButton()}
          </div>
        );

      case "bulletList":
      case "numberedList":
        const ListTag = component.type === "bulletList" ? "ul" : "ol";
        return (
          <div {...commonProps}>
            <textarea
              value={component.content}
              onChange={(e) =>
                updateComponentContent(component.id, e.target.value)
              }
              className="w-full p-2 border rounded resize-none bg-transparent focus:outline-none font-mono text-sm"
              rows={5}
              placeholder="Enter each list item on a new line."
            />
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
              <ListTag
                className={
                  component.type === "bulletList"
                    ? "list-disc list-inside"
                    : "list-decimal list-inside"
                }
              >
                {component.content.split("\n").map((line, index) => (
                  <li key={index}>{line.replace(/^[•\d]+\.?\s/, "")}</li>
                ))}
              </ListTag>
            </div>
            {renderDeleteButton()}
          </div>
        );

      case "divider":
        return (
          <div {...commonProps}>
            <hr className="border-gray-300 my-4" />
            {renderDeleteButton()}
          </div>
        );

      case "youtubeVideo":
        return (
          <div {...commonProps}>
            <div className="space-y-2">
              <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center rounded overflow-hidden">
                <img
                  src={
                    component.props?.thumbnail ||
                    "https://via.placeholder.com/560x315.png?text=YouTube+Video"
                  }
                  alt={component.props?.alt || "YouTube Video Thumbnail"}
                  className="max-w-full h-auto object-cover"
                />
                <Play className="absolute w-16 h-16 text-red-500 opacity-80" />
              </div>
              <Input
                type="text"
                value={component.content}
                onChange={(e) =>
                  updateComponentContent(component.id, e.target.value)
                }
                placeholder="YouTube Video URL"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Input
                type="text"
                value={component.props?.thumbnail || ""}
                onChange={(e) =>
                  updateComponentProps(component.id, {
                    thumbnail: e.target.value,
                  })
                }
                placeholder="Thumbnail URL (optional)"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Input
                type="text"
                value={component.props?.alt || ""}
                onChange={(e) =>
                  updateComponentProps(component.id, { alt: e.target.value })
                }
                placeholder="Alt Text for Video"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {renderDeleteButton()}
          </div>
        );

      case "pricingCard":
        return (
          <div {...commonProps}>
            <Card className="text-center p-6 space-y-4">
              <Input
                type="text"
                value={component.content}
                onChange={(e) =>
                  updateComponentContent(component.id, e.target.value)
                }
                className="text-2xl font-semibold border-none focus:outline-none text-center"
                placeholder="Plan Name"
              />
              <Input
                type="text"
                value={component.props?.price || ""}
                onChange={(e) =>
                  updateComponentProps(component.id, { price: e.target.value })
                }
                className="text-4xl font-bold text-blue-600 border-none focus:outline-none text-center"
                placeholder="$X.XX/month"
              />
              <ul className="list-none space-y-2 px-4">
                {component.props?.features?.map(
                  (feature: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <Input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [
                            ...(component.props?.features || []),
                          ];
                          newFeatures[index] = e.target.value;
                          updateComponentProps(component.id, {
                            features: newFeatures,
                          });
                        }}
                        className="flex-1 border-none focus:outline-none"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newFeatures = (
                            component.props?.features || []
                          ).filter((_: string, i: number) => i !== index);
                          updateComponentProps(component.id, {
                            features: newFeatures,
                          });
                        }}
                        className="h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </li>
                  )
                )}
                <li>
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateComponentProps(component.id, {
                        features: [
                          ...(component.props?.features || []),
                          "New Feature",
                        ],
                      });
                    }}
                    className="mt-2 w-full"
                  >
                    Add Feature
                  </Button>
                </li>
              </ul>
              <Button className="w-full">
                <Input
                  type="text"
                  value={component.props?.buttonText || ""}
                  onChange={(e) =>
                    updateComponentProps(component.id, {
                      buttonText: e.target.value,
                    })
                  }
                  className="bg-transparent text-white border-none focus:outline-none text-center"
                  placeholder="Button Text"
                />
              </Button>
              <Input
                type="text"
                value={component.props?.buttonHref || ""}
                onChange={(e) =>
                  updateComponentProps(component.id, {
                    buttonHref: e.target.value,
                  })
                }
                placeholder="Button URL"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Card>
            {renderDeleteButton()}
          </div>
        );

      case "socialLinks":
        return (
          <div {...commonProps}>
            <div className="flex flex-wrap justify-center items-center gap-4 p-4 border rounded">
              <Input
                type="text"
                value={component.content}
                onChange={(e) =>
                  updateComponentContent(component.id, e.target.value)
                }
                placeholder="Social Links Title/Text"
                className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center mb-2"
              />
              {component.props?.links?.map(
                (
                  link: { platform: string; url: string; iconUrl?: string },
                  index: number
                ) => (
                  <div key={index} className="flex items-center space-x-2">
                    {link.iconUrl && (
                      <img
                        src={link.iconUrl}
                        alt={link.platform}
                        className="h-6 w-6"
                      />
                    )}
                    <Input
                      type="text"
                      value={link.platform}
                      onChange={(e) => {
                        const newLinks = [...(component.props?.links || [])];
                        newLinks[index] = {
                          ...newLinks[index],
                          platform: e.target.value,
                        };
                        updateComponentProps(component.id, { links: newLinks });
                      }}
                      placeholder="Platform (e.g., Facebook)"
                      className="w-24 p-1 text-sm border rounded focus:outline-none"
                    />
                    <Input
                      type="text"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...(component.props?.links || [])];
                        newLinks[index] = {
                          ...newLinks[index],
                          url: e.target.value,
                        };
                        updateComponentProps(component.id, { links: newLinks });
                      }}
                      placeholder="URL"
                      className="flex-1 p-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                      type="text"
                      value={link.iconUrl || ""}
                      onChange={(e) => {
                        const newLinks = [...(component.props?.links || [])];
                        newLinks[index] = {
                          ...newLinks[index],
                          iconUrl: e.target.value,
                        };
                        updateComponentProps(component.id, { links: newLinks });
                      }}
                      placeholder="Icon URL (optional)"
                      className="flex-1 p-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newLinks = (component.props?.links || []).filter(
                          (_: any, i: number) => i !== index
                        );
                        updateComponentProps(component.id, { links: newLinks });
                      }}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  updateComponentProps(component.id, {
                    links: [
                      ...(component.props?.links || []),
                      { platform: "", url: "", iconUrl: "" },
                    ],
                  });
                }}
              >
                Add Link
              </Button>
            </div>
            {renderDeleteButton()}
          </div>
        );

      case "codeBlock":
        return (
          <div {...commonProps}>
            <textarea
              value={component.content}
              onChange={(e) =>
                updateComponentContent(component.id, e.target.value)
              }
              className="w-full p-2 border rounded resize-none font-mono text-sm bg-gray-900 text-white focus:outline-none"
              rows={6}
              placeholder="Enter your code here..."
            />
            {renderDeleteButton()}
          </div>
        );

      case "section":
        return (
          <div {...commonProps}>
            <div className="border border-dashed border-blue-400 p-4 rounded-lg">
              <h4 className="text-blue-600 text-sm mb-2">Section:</h4>
              <Input
                type="text"
                value={component.content}
                onChange={(e) =>
                  updateComponentContent(component.id, e.target.value)
                }
                className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                placeholder="Section Title (optional)"
              />
              <p className="text-gray-500 text-sm">
                (This section is for grouping; content goes inside. Drag other
                blocks here if implementing nesting.)
              </p>
            </div>
            {renderDeleteButton()}
          </div>
        );

      case "productCard":
        return (
          <div {...commonProps}>
            <Card className="flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
              <img
                src={
                  component.props?.imageUrl ||
                  "https://via.placeholder.com/150x150.png?text=Product+Image"
                }
                alt={component.content}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 space-y-2 text-center md:text-left">
                <Input
                  type="text"
                  value={component.content}
                  onChange={(e) =>
                    updateComponentContent(component.id, e.target.value)
                  }
                  className="font-semibold text-lg border-none focus:outline-none w-full text-center md:text-left"
                  placeholder="Product Name"
                />
                <textarea
                  value={component.props?.description || ""}
                  onChange={(e) =>
                    updateComponentProps(component.id, {
                      description: e.target.value,
                    })
                  }
                  className="text-sm text-gray-600 border-none focus:outline-none resize-none w-full text-center md:text-left"
                  rows={2}
                  placeholder="Product Description"
                />
                <Input
                  type="text"
                  value={component.props?.price || ""}
                  onChange={(e) =>
                    updateComponentProps(component.id, {
                      price: e.target.value,
                    })
                  }
                  className="text-md font-bold border-none focus:outline-none w-full text-center md:text-left"
                  placeholder="Product Price"
                />
                <Button className="w-full md:w-auto">
                  <Input
                    type="text"
                    value={component.props?.buttonText || ""}
                    onChange={(e) =>
                      updateComponentProps(component.id, {
                        buttonText: e.target.value,
                      })
                    }
                    className="bg-transparent text-white border-none focus:outline-none text-center"
                    placeholder="Button Text"
                  />
                </Button>
                <Input
                  type="text"
                  value={component.props?.buttonHref || ""}
                  onChange={(e) =>
                    updateComponentProps(component.id, {
                      buttonHref: e.target.value,
                    })
                  }
                  placeholder="Button URL"
                  className="mt-2 w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="text"
                  value={component.props?.imageUrl || ""}
                  onChange={(e) =>
                    updateComponentProps(component.id, {
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="Image URL"
                  className="mt-2 w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </Card>
            {renderDeleteButton()}
          </div>
        );

      case "twoColumnProductCards":
        return (
          <div {...commonProps}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded">
              {component.props?.products?.map((product: any, index: number) => (
                <Card
                  key={index}
                  className="flex flex-col items-center p-4 space-y-2"
                >
                  <img
                    src={
                      product.imageUrl ||
                      "https://via.placeholder.com/100x100.png?text=Product"
                    }
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <Input
                    type="text"
                    value={product.name}
                    onChange={(e) => {
                      const newProducts = [
                        ...(component.props?.products || []),
                      ];
                      newProducts[index] = {
                        ...newProducts[index],
                        name: e.target.value,
                      };
                      updateComponentProps(component.id, {
                        products: newProducts,
                      });
                    }}
                    className="font-semibold text-md border-none focus:outline-none w-full text-center"
                    placeholder="Product Name"
                  />
                  <textarea
                    value={product.description || ""}
                    onChange={(e) => {
                      const newProducts = [
                        ...(component.props?.products || []),
                      ];
                      newProducts[index] = {
                        ...newProducts[index],
                        description: e.target.value,
                      };
                      updateComponentProps(component.id, {
                        products: newProducts,
                      });
                    }}
                    className="text-xs text-gray-500 border-none focus:outline-none resize-none w-full text-center"
                    rows={1}
                    placeholder="Product Description"
                  />
                  <Input
                    type="text"
                    value={product.price || ""}
                    onChange={(e) => {
                      const newProducts = [
                        ...(component.props?.products || []),
                      ];
                      newProducts[index] = {
                        ...newProducts[index],
                        price: e.target.value,
                      };
                      updateComponentProps(component.id, {
                        products: newProducts,
                      });
                    }}
                    className="text-sm font-bold border-none focus:outline-none w-full text-center"
                    placeholder="Product Price"
                  />
                  <Button className="w-full">
                    <Input
                      type="text"
                      value={product.buttonText || ""}
                      onChange={(e) => {
                        const newProducts = [
                          ...(component.props?.products || []),
                        ];
                        newProducts[index] = {
                          ...newProducts[index],
                          buttonText: e.target.value,
                        };
                        updateComponentProps(component.id, {
                          products: newProducts,
                        });
                      }}
                      className="bg-transparent text-white border-none focus:outline-none text-center"
                      placeholder="Button Text"
                    />
                  </Button>
                  <Input
                    type="text"
                    value={product.buttonHref || ""}
                    onChange={(e) => {
                      const newProducts = [
                        ...(component.props?.products || []),
                      ];
                      newProducts[index] = {
                        ...newProducts[index],
                        buttonHref: e.target.value,
                      };
                      updateComponentProps(component.id, {
                        products: newProducts,
                      });
                    }}
                    placeholder="Button URL"
                    className="mt-2 w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Input
                    type="text"
                    value={product.imageUrl || ""}
                    onChange={(e) => {
                      const newProducts = [
                        ...(component.props?.products || []),
                      ];
                      newProducts[index] = {
                        ...newProducts[index],
                        imageUrl: e.target.value,
                      };
                      updateComponentProps(component.id, {
                        products: newProducts,
                      });
                    }}
                    placeholder="Image URL"
                    className="mt-2 w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newProducts = (
                        component.props?.products || []
                      ).filter((_: any, i: number) => i !== index);
                      updateComponentProps(component.id, {
                        products: newProducts,
                      });
                    }}
                    className="h-6 w-6 p-0"
                  >
                    Remove
                  </Button>
                </Card>
              ))}
              {component.props?.products?.length < 2 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    updateComponentProps(component.id, {
                      products: [
                        ...(component.props?.products || []),
                        {
                          imageUrl:
                            "https://via.placeholder.com/100x100.png?text=New+Product",
                          name: "New Product",
                          description: "Description",
                          price: "$0.00",
                          buttonText: "Link",
                          buttonHref: "#",
                        },
                      ],
                    });
                  }}
                  className="w-full"
                >
                  Add Product Card
                </Button>
              )}
            </div>
            {renderDeleteButton()}
          </div>
        );

      default:
        return null;
    }
  };

  // Simplified render for iframe preview for Tailwind compatibility
  const renderPreviewHtml = () => {
    // Basic email-safe styles for the preview, should align with React Email styles
    const baseStyles = `
      body { margin: 0; padding: 0; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; color: #333; }
      img { max-width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto; }
      a { text-decoration: none; color: inherit; }
      p, h1, h2, h3, h4, ul, ol, pre { margin: 0; padding: 0; }
      ul, ol { padding-left: 20px; }
      /* General button style for preview */
      .email-button {
          background-color: #000;
          color: #fff;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
      }
      .product-card-container {
          display: flex;
          align-items: center;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          margin-bottom: 20px; /* Adjust as needed */
      }
      .product-card-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          margin-right: 20px;
      }
      .product-card-content {
          flex: 1;
      }
      @media (max-width: 480px) {
        .product-card-container {
            flex-direction: column;
            text-align: center;
        }
        .product-card-image {
            margin-right: 0;
            margin-bottom: 10px;
        }
      }

      .two-col-product-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 20px 0;
      }
      .two-col-product-card {
          width: 48%; /* Adjust for spacing */
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          text-align: center;
          box-sizing: border-box; /* Include padding and border in the width */
      }
      .two-col-product-card:nth-child(odd) {
          margin-right: 4%; /* Space between columns */
      }
      @media (max-width: 480px) {
          .two-col-product-card {
              width: 100%;
              margin-right: 0 !important;
              margin-bottom: 20px;
          }
      }
    `;

    const renderBlockHtml = (block: EmailComponent) => {
      switch (block.type) {
        case "text":
          return `<p style="font-size:16px; line-height:24px;">${block.content}</p>`;
        case "heading1":
          return `<h1 style="font-size:32px; line-height:36px; font-weight:bold;">${block.content}</h1>`;
        case "heading2":
          return `<h2 style="font-size:24px; line-height:28px; font-weight:bold;">${block.content}</h2>`;
        case "heading3":
          return `<h3 style="font-size:20px; line-height:24px; font-weight:bold;">${block.content}</h3>`;
        case "image":
          return `<img src="${block.content}" alt="${
            block.props?.alt || "Image"
          }" style="max-width:100%; height:auto; border-radius:8px;">`;
        case "button":
          return `<div style="text-align:center; margin-top:20px;"><a href="${
            block.props?.href || "#"
          }" class="email-button">${block.content}</a></div>`;
        case "bulletList":
          return `<ul style="font-size:16px; line-height:24px; padding-left:20px;">${block.content
            .split("\n")
            .map((item) => `<li>${item.replace("• ", "")}</li>`)
            .join("")}</ul>`;
        case "numberedList":
          return `<ol style="font-size:16px; line-height:24px; padding-left:20px;">${block.content
            .split("\n")
            .map((item) => `<li>${item.replace(/^\d+\.\s/, "")}</li>`)
            .join("")}</ol>`;
        case "divider":
          return `<hr style="border-color:#eee; margin:20px 0;">`;
        case "youtubeVideo":
          return `
            <div style="text-align:center; padding:20px 0;">
              <a href="${block.props?.url}" target="_blank" rel="noopener noreferrer">
                <img src="${block.props?.thumbnail}" alt="${block.props?.alt}" width="560" height="315" style="max-width:100%; height:auto; margin: 0 auto; display: block;">
              </a>
              <p style="font-size:14px; color:#666; margin-top: 10px;">Click image to watch video</p>
            </div>
          `;
        case "pricingCard":
          return `
            <div style="padding:20px; border:1px solid #eee; border-radius:8px; text-align:center; margin:20px 0;">
              <h3 style="font-size:24px; margin-bottom:10px;">${
                block.content
              }</h3>
              <p style="font-size:36px; font-weight:bold; color:#4F46E5; margin:0 0 20px;">${
                block.props?.price
              }</p>
              <ul style="list-style:none; padding:0; margin:0 0 20px;">
                ${block.props?.features
                  ?.map(
                    (f: string) =>
                      `<li style="margin-bottom:8px; font-size:16px; color:#555;">${f}</li>`
                  )
                  .join("")}
              </ul>
              <a href="${
                block.props?.buttonHref
              }" style="background-color:#4F46E5; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; display:inline-block; font-size:16px; font-weight:bold;">${
            block.props?.buttonText
          }</a>
            </div>
          `;
        case "socialLinks":
          return `
            <div style="text-align:center; padding:20px 0;">
              ${block.props?.links
                ?.map(
                  (link: any) => `
                <span style="margin:0 10px;">
                  <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                    <img src="${link.iconUrl}" width="24" height="24" alt="${link.platform}" style="vertical-align: middle;">
                  </a>
                </span>
              `
                )
                .join("")}
            </div>
          `;
        case "codeBlock":
          return `
            <div style="padding:10px; background-color:#f6f8fa; border-radius:4px; margin:20px 0; overflow-x: auto;">
              <pre style="font-family:monospace; font-size:14px; line-height:20px; white-space:pre-wrap; margin: 0;">${block.content}</pre>
            </div>
          `;
        case "section":
          return `
            <div style="border: 1px dashed #4299e1; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="font-size:14px; color:#4299e1; margin-bottom:10px;">Section: ${block.content}</p>
                <p style="font-size:12px; color:#666;">(This is a placeholder for a section. Actual content would go here.)</p>
            </div>
          `;
        case "productCard":
          return `
            <div class="product-card-container">
                <img src="${block.props?.imageUrl}" alt="${block.content}" class="product-card-image">
                <div class="product-card-content">
                    <h4 style="font-size:18px; margin:0 0 5px;">${block.content}</h4>
                    <p style="font-size:14px; line-height:20px; color:#666; margin:0 0 10px;">${block.props?.description}</p>
                    <p style="font-size:16px; font-weight:bold; margin:0 0 15px;">${block.props?.price}</p>
                    <a href="${block.props?.buttonHref}" style="background-color:#007bff; color:#fff; padding:10px 20px; border-radius:5px; text-decoration:none; display:inline-block; font-size:14px;">${block.props?.buttonText}</a>
                </div>
            </div>
          `;
        case "twoColumnProductCards":
          return `
            <div class="two-col-product-grid">
                ${block.props?.products
                  ?.map(
                    (product: any) => `
                    <div class="two-col-product-card">
                        <img src="${product.imageUrl}" alt="${product.name}" style="width:80px; height:80px; object-fit:cover; border-radius:8px; margin:0 auto 10px;">
                        <h5 style="font-size:16px; margin:0 0 5px;">${product.name}</h5>
                        <p style="font-size:12px; line-height:18px; color:#666; margin:0 0 10px;">${product.description}</p>
                        <p style="font-size:14px; font-weight:bold; margin:0 0 15px;">${product.price}</p>
                        <a href="${product.buttonHref}" style="background-color:#28a745; color:#fff; padding:8px 16px; border-radius:4px; text-decoration:none; display:inline-block; font-size:12px;">${product.buttonText}</a>
                    </div>
                `
                  )
                  .join("")}
            </div>
          `;
        default:
          return "";
      }
    };

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailMeta.subject || "Email Preview"}</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          ${components.map(renderBlockHtml).join("")}
        </div>
      </body>
      </html>
    `;
  };

  const getPreviewWidth = () => {
    switch (previewDevice) {
      case "desktop":
        return "600px";
      case "tablet":
        return "480px";
      case "mobile":
        return "320px";
      default:
        return "600px";
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Email Editor</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Test email</Button>
          <Button onClick={handleSendEmail}>Send</Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Editor Panel */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold">Email Details</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="from"
                    className="text-sm font-medium text-gray-600"
                  >
                    From
                  </label>
                  <Input
                    id="from"
                    value={emailMeta.from}
                    onChange={(e) =>
                      setEmailMeta((prev) => ({
                        ...prev,
                        from: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="replyTo"
                    className="text-sm font-medium text-gray-600"
                  >
                    Reply-To
                  </label>
                  <Input
                    id="replyTo"
                    placeholder="reply@example.com"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="audience"
                    className="text-sm font-medium text-gray-600"
                  >
                    To (Audience)
                  </label>
                  <select
                    id="audience"
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select an audience</option>
                    {audiences.map((audience) => (
                      <option key={audience.id} value={audience.id}>
                        {audience.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="when"
                    className="text-sm font-medium text-gray-600"
                  >
                    When
                  </label>
                  <Input
                    id="when"
                    placeholder="Send now"
                    className="mt-1"
                    disabled
                  />{" "}
                  {/* For future scheduling */}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-600"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={emailMeta.subject}
                    onChange={(e) =>
                      setEmailMeta((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="previewText"
                    className="text-sm font-medium text-gray-600"
                  >
                    Preview text
                  </label>
                  <Input
                    id="previewText"
                    value={emailMeta.previewText}
                    onChange={(e) =>
                      setEmailMeta((prev) => ({
                        ...prev,
                        previewText: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg flex-1 flex flex-col">
            <CardHeader>
              <h2 className="text-lg font-semibold">Email Content</h2>
              <p className="text-sm text-gray-600">
                Type "/" to add components
              </p>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div ref={editorRef} className="space-y-4 min-h-[400px]">
                {components.map(renderEmailComponent)}

                {/* Input for adding new components */}
                <div className="relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Type '/' for commands"
                    className="w-full p-3 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="shadow-lg h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-lg font-semibold">Preview</h2>
              <div className="flex space-x-2">
                <Button
                  variant={previewDevice === "desktop" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPreviewDevice("desktop")}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewDevice === "tablet" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPreviewDevice("tablet")}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewDevice === "mobile" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPreviewDevice("mobile")}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center p-4">
              <div
                className={`bg-white border rounded-lg overflow-hidden mx-auto transition-all duration-300 shadow-md`}
                style={{
                  width: getPreviewWidth(),
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <iframe
                  title="Email Live Preview"
                  className="w-full border-none"
                  style={{ height: "calc(100vh - 250px)" }} // Adjust height as needed
                  srcDoc={renderPreviewHtml()}
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Component Selection Menu */}
      {showComponentMenu && (
        <div
          className="absolute z-50 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 w-64"
          style={{
            left: menuPosition.x,
            top: menuPosition.y,
          }}
        >
          <div className="p-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
                    index === selectedOptionIndex
                      ? "bg-gray-700"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => handleComponentSelect(option)}
                >
                  {option.icon}
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-400">
                      {option.description}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-400">
                No matching components found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
