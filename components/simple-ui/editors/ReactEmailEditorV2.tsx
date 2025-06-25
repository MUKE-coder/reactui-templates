/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Type,
  ImageIcon,
  Minus,
  MousePointer,
  List,
  ListOrdered,
  Hash,
  Video,
  CreditCard,
  Share2,
  Code,
  Layout,
  ShoppingCart,
  Grid3X3,
  Eye,
  Smartphone,
  Monitor,
  Send,
  TestTube,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sendEmailToAudience } from "@/lib/sendMail";
import toast from "react-hot-toast";

interface EmailComponent {
  id: string;
  type: string;
  content: any;
  props?: any;
}

interface ComponentOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  description: string;
}

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
    id: "youtube",
    label: "YouTube Video",
    icon: <Video className="w-4 h-4" />,
    type: "youtube",
    description: "Embed a YouTube video",
  },
  {
    id: "pricingCard",
    label: "Pricing Card",
    icon: <CreditCard className="w-4 h-4" />,
    type: "pricingCard",
    description: "Add a pricing card",
  },
  {
    id: "socialLinks",
    label: "Social Links",
    icon: <Share2 className="w-4 h-4" />,
    type: "socialLinks",
    description: "Add social media links",
  },
  {
    id: "codeBlock",
    label: "Code Block",
    icon: <Code className="w-4 h-4" />,
    type: "codeBlock",
    description: "Add a code snippet",
  },
  {
    id: "section",
    label: "Section",
    icon: <Layout className="w-4 h-4" />,
    type: "section",
    description: "Add a content section",
  },
  {
    id: "productCard",
    label: "Product Card",
    icon: <ShoppingCart className="w-4 h-4" />,
    type: "productCard",
    description: "Add a product showcase",
  },
  {
    id: "twoColumnProducts",
    label: "2 Column Products",
    icon: <Grid3X3 className="w-4 h-4" />,
    type: "twoColumnProducts",
    description: "Add two product cards side by side",
  },
  {
    id: "divider",
    label: "Divider",
    icon: <Minus className="w-4 h-4" />,
    type: "divider",
    description: "Add a horizontal line",
  },
];

const audiences = [
  { id: "developers", name: "Developers", count: 1250 },
  { id: "marketers", name: "Marketers", count: 890 },
  { id: "designers", name: "Designers", count: 654 },
  { id: "founders", name: "Founders", count: 432 },
  { id: "all", name: "All Subscribers", count: 3226 },
];

export default function ReactEmailEditorV2() {
  const [components, setComponents] = useState<EmailComponent[]>([]);
  const [showComponentMenu, setShowComponentMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [currentInput, setCurrentInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(componentOptions);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [emailMeta, setEmailMeta] = useState({
    from: "Newsletter <newsletter@example.com>",
    replyTo: "reply@example.com",
    to: "",
    subject: "",
    previewText: "",
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper function to extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string => {
    const regexPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return url; // Return as-is if no pattern matches (assuming it's already an ID)
  };

  // Helper function to calculate menu position with viewport awareness
  const calculateMenuPosition = () => {
    if (!inputRef.current) return { x: 0, y: 0 };

    const rect = inputRef.current.getBoundingClientRect();
    const menuHeight = 400; // Approximate menu height
    const menuWidth = 320;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let x = rect.left;
    let y = rect.bottom + 5;

    // Adjust if menu would go off-screen horizontally
    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth - 20;
    }

    // Adjust if menu would go off-screen vertically
    if (y + menuHeight > viewportHeight) {
      y = rect.top - menuHeight - 5;
    }

    // Ensure menu doesn't go above viewport
    if (y < 10) {
      y = 10;
    }

    return { x, y };
  };

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
          handleComponentSelect(filteredOptions[selectedOptionIndex]);
        } else if (e.key === "Escape") {
          setShowComponentMenu(false);
          setCurrentInput("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showComponentMenu, filteredOptions, selectedOptionIndex]);

  const handleInputChange = (value: string) => {
    setCurrentInput(value);

    if (value === "/") {
      setShowComponentMenu(true);
      setFilteredOptions(componentOptions);
      setSelectedOptionIndex(0);
      setMenuPosition(calculateMenuPosition());
    } else if (value.startsWith("/") && value.length > 1) {
      const searchTerm = value.slice(1).toLowerCase();
      const filtered = componentOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm) ||
          option.description.toLowerCase().includes(searchTerm)
      );
      setFilteredOptions(filtered);
      setSelectedOptionIndex(0);
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

  const getDefaultContent = (type: string): any => {
    switch (type) {
      case "text":
        return "Enter your text here...";
      case "heading1":
      case "heading2":
      case "heading3":
        return "Your heading";
      case "button":
        return { text: "Click me", url: "#" };
      case "image":
        return {
          src: "/placeholder.svg?height=200&width=400",
          alt: "Image description",
        };
      case "bulletList":
        return ["List item 1", "List item 2", "List item 3"];
      case "numberedList":
        return ["List item 1", "List item 2", "List item 3"];
      case "youtube":
        return { videoUrl: "", title: "Video Title" };
      case "pricingCard":
        return {
          title: "Pro Plan",
          price: "$29",
          period: "/month",
          features: ["Feature 1", "Feature 2", "Feature 3"],
          buttonText: "Get Started",
          buttonUrl: "#",
        };
      case "socialLinks":
        return [
          { platform: "twitter", url: "#" },
          { platform: "facebook", url: "#" },
          { platform: "linkedin", url: "#" },
        ];
      case "codeBlock":
        return { code: "console.log('Hello World');", language: "javascript" };
      case "section":
        return {
          title: "Section Title",
          content: "Section content goes here...",
        };
      case "productCard":
        return {
          name: "Product Name",
          price: "$99",
          image: "/placeholder.svg?height=200&width=200",
          description: "Product description",
          buttonText: "Buy Now",
          buttonUrl: "#",
        };
      case "twoColumnProducts":
        return {
          products: [
            {
              name: "Product 1",
              price: "$99",
              image: "/placeholder.svg?height=150&width=150",
              description: "Description 1",
              buttonText: "Buy Now",
              buttonUrl: "#",
            },
            {
              name: "Product 2",
              price: "$129",
              image: "/placeholder.svg?height=150&width=150",
              description: "Description 2",
              buttonText: "Buy Now",
              buttonUrl: "#",
            },
          ],
        };
      case "divider":
        return {};
      default:
        return "";
    }
  };

  const getDefaultProps = (type: string) => {
    switch (type) {
      case "button":
        return {
          style: {
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
          },
        };
      case "image":
        return { width: 400, height: 200 };
      default:
        return {};
    }
  };

  const updateComponent = (id: string, content: any, props?: any) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, content, ...(props && { props }) } : comp
      )
    );
  };

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  const handleSendEmail = async () => {
    if (!emailMeta.to || !emailMeta.subject) {
      alert("Please fill in the recipient and subject fields");
      return;
    }

    setIsLoading(true);
    try {
      const emailData = {
        meta: emailMeta,
        components: components,
        audience: emailMeta.to,
      };

      console.log(
        "Email data to be sent to server:",
        JSON.stringify(emailData, null, 2)
      );

      // // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would send this JSON to your server action
      const result = await sendEmailToAudience(emailData);

      toast.success(
        "Email sent successfully! Check the browser console to see the JSON structure."
      );
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error("Send email error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      console.log("Test email data:", { meta: emailMeta, components });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Test email sent! Check the browser console for the data.");
    } catch (error) {
      alert("Failed to send test email.");
      console.error("Test email error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailComponent = (component: EmailComponent) => {
    const commonProps = {
      key: component.id,
      className:
        "group relative border border-transparent hover:border-gray-200 rounded p-4 mb-4",
    };

    const deleteButton = (
      <Button
        size="sm"
        variant="ghost"
        onClick={() => deleteComponent(component.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 bg-red-100 hover:bg-red-200"
      >
        ×
      </Button>
    );

    switch (component.type) {
      case "text":
        return (
          <div {...commonProps}>
            <Textarea
              value={component.content}
              onChange={(e) => updateComponent(component.id, e.target.value)}
              className="w-full min-h-[100px] resize-none"
              placeholder="Enter your text here..."
            />
            {deleteButton}
          </div>
        );

      case "heading1":
      case "heading2":
      case "heading3":
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
              onChange={(e) => updateComponent(component.id, e.target.value)}
              className={`w-full font-bold ${headingClass} border-none bg-transparent focus:outline-none shadow-none`}
              placeholder="Your heading"
            />
            {deleteButton}
          </div>
        );

      case "image":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <img
                src={component.content.src || "/placeholder.svg"}
                alt={component.content.alt || "Image"}
                className="max-w-full h-auto rounded max-h-64 object-cover"
              />
              <Input
                type="text"
                value={component.content.src}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    src: e.target.value,
                  })
                }
                placeholder="Image URL"
                className="text-sm"
              />
              <Input
                type="text"
                value={component.content.alt}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    alt: e.target.value,
                  })
                }
                placeholder="Alt text"
                className="text-sm"
              />
            </div>
            {deleteButton}
          </div>
        );

      case "button":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <Button className="bg-black text-white hover:bg-gray-800">
                {component.content.text}
              </Button>
              <Input
                type="text"
                value={component.content.text}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    text: e.target.value,
                  })
                }
                placeholder="Button text"
                className="text-sm"
              />
              <Input
                type="url"
                value={component.content.url}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    url: e.target.value,
                  })
                }
                placeholder="Button URL"
                className="text-sm"
              />
            </div>
            {deleteButton}
          </div>
        );

      case "youtube":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center relative overflow-hidden">
                {component.content.videoUrl &&
                extractYouTubeId(component.content.videoUrl) ? (
                  <img
                    src={`https://img.youtube.com/vi/${extractYouTubeId(
                      component.content.videoUrl
                    )}/maxresdefault.jpg`}
                    alt={component.content.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default thumbnail if maxres doesn't exist
                      e.currentTarget.src = `https://img.youtube.com/vi/${extractYouTubeId(
                        component.content.videoUrl
                      )}/hqdefault.jpg`;
                    }}
                  />
                ) : (
                  <Video className="w-12 h-12 text-gray-400" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-3">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <Input
                type="text"
                value={component.content.videoUrl}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    videoUrl: e.target.value,
                  })
                }
                placeholder="YouTube Video URL (e.g., https://youtu.be/dQw4w9WgXcQ)"
                className="text-sm"
              />
              <Input
                type="text"
                value={component.content.title}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    title: e.target.value,
                  })
                }
                placeholder="Video Title"
                className="text-sm"
              />
            </div>
            {deleteButton}
          </div>
        );

      case "pricingCard":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <div className="border rounded-lg p-4 bg-white">
                <h3 className="text-xl font-bold">{component.content.title}</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {component.content.price}
                  <span className="text-sm text-gray-500">
                    {component.content.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {component.content.features.map(
                    (feature: string, idx: number) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  {component.content.buttonText}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={component.content.title}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      title: e.target.value,
                    })
                  }
                  placeholder="Plan Title"
                  className="text-sm"
                />
                <Input
                  value={component.content.price}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                  className="text-sm"
                />
              </div>
              <Textarea
                value={component.content.features.join("\n")}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    features: e.target.value
                      .split("\n")
                      .filter((f) => f.trim()),
                  })
                }
                placeholder="Features (one per line)"
                className="text-sm"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={component.content.buttonText}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      buttonText: e.target.value,
                    })
                  }
                  placeholder="Button Text"
                  className="text-sm"
                />
                <Input
                  value={component.content.buttonUrl}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      buttonUrl: e.target.value,
                    })
                  }
                  placeholder="Button URL"
                  className="text-sm"
                />
              </div>
            </div>
            {deleteButton}
          </div>
        );

      case "productCard":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <div className="border rounded-lg p-4 bg-white">
                <img
                  src={component.content.image}
                  alt={component.content.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-bold text-lg">{component.content.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {component.content.description}
                </p>
                <div className="text-xl font-bold text-green-600 mb-3">
                  {component.content.price}
                </div>
                <Button className="w-full bg-black hover:bg-gray-800">
                  {component.content.buttonText}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={component.content.name}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      name: e.target.value,
                    })
                  }
                  placeholder="Product Name"
                  className="text-sm"
                />
                <Input
                  value={component.content.price}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                  className="text-sm"
                />
              </div>
              <Input
                value={component.content.image}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    image: e.target.value,
                  })
                }
                placeholder="Image URL"
                className="text-sm"
              />
              <Textarea
                value={component.content.description}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    description: e.target.value,
                  })
                }
                placeholder="Product Description"
                className="text-sm"
                rows={2}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={component.content.buttonText}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      buttonText: e.target.value,
                    })
                  }
                  placeholder="Button Text"
                  className="text-sm"
                />
                <Input
                  value={component.content.buttonUrl}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      buttonUrl: e.target.value,
                    })
                  }
                  placeholder="Button URL"
                  className="text-sm"
                />
              </div>
            </div>
            {deleteButton}
          </div>
        );

      case "socialLinks":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <div className="flex justify-center space-x-4 p-4 bg-gray-50 rounded">
                {component.content.map((social: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full border"
                  >
                    <span className="text-xs font-bold">
                      {social.platform.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {component.content.map((social: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <Select
                      value={social.platform}
                      onValueChange={(value) => {
                        const newContent = [...component.content];
                        newContent[idx] = {
                          ...newContent[idx],
                          platform: value,
                        };
                        updateComponent(component.id, newContent);
                      }}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="url"
                      value={social.url}
                      onChange={(e) => {
                        const newContent = [...component.content];
                        newContent[idx] = {
                          ...newContent[idx],
                          url: e.target.value,
                        };
                        updateComponent(component.id, newContent);
                      }}
                      placeholder="URL"
                      className="text-sm col-span-2"
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newContent = [
                        ...component.content,
                        { platform: "twitter", url: "" },
                      ];
                      updateComponent(component.id, newContent);
                    }}
                    className="text-xs"
                  >
                    Add Social
                  </Button>
                  {component.content.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newContent = component.content.slice(0, -1);
                        updateComponent(component.id, newContent);
                      }}
                      className="text-xs"
                    >
                      Remove Last
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {deleteButton}
          </div>
        );

      case "codeBlock":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                <pre>{component.content.code || "// Your code here"}</pre>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={component.content.language}
                  onValueChange={(value) =>
                    updateComponent(component.id, {
                      ...component.content,
                      language: value,
                    })
                  }
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="bash">Bash</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={component.content.title || ""}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      ...component.content,
                      title: e.target.value,
                    })
                  }
                  placeholder="Code title (optional)"
                  className="text-sm"
                />
              </div>
              <Textarea
                value={component.content.code}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    code: e.target.value,
                  })
                }
                placeholder="Enter your code here..."
                className="text-sm font-mono"
                rows={6}
              />
            </div>
            {deleteButton}
          </div>
        );

      case "section":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded">
                <h4 className="font-semibold text-lg mb-2">
                  {component.content.title}
                </h4>
                <p className="text-gray-700">{component.content.content}</p>
              </div>
              <Input
                value={component.content.title}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    title: e.target.value,
                  })
                }
                placeholder="Section Title"
                className="text-sm font-semibold"
              />
              <Textarea
                value={component.content.content}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.content,
                    content: e.target.value,
                  })
                }
                placeholder="Section content..."
                className="text-sm"
                rows={4}
              />
            </div>
            {deleteButton}
          </div>
        );

      case "twoColumnProducts":
        return (
          <div {...commonProps}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {component.content.products.map(
                  (product: any, productIdx: number) => (
                    <div
                      key={productIdx}
                      className="border rounded-lg p-3 bg-white"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {product.description}
                      </p>
                      <div className="text-sm font-bold text-green-600 mb-2">
                        {product.price}
                      </div>
                      <Button
                        size="sm"
                        className="w-full text-xs bg-black hover:bg-gray-800"
                      >
                        {product.buttonText}
                      </Button>
                    </div>
                  )
                )}
              </div>

              {/* Edit Forms for Both Products */}
              <div className="space-y-4">
                {component.content.products.map(
                  (product: any, productIdx: number) => (
                    <div
                      key={productIdx}
                      className="border rounded p-3 bg-gray-50"
                    >
                      <h5 className="font-semibold text-sm mb-2">
                        Product {productIdx + 1}
                      </h5>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <Input
                          value={product.name}
                          onChange={(e) => {
                            const newProducts = [...component.content.products];
                            newProducts[productIdx] = {
                              ...product,
                              name: e.target.value,
                            };
                            updateComponent(component.id, {
                              ...component.content,
                              products: newProducts,
                            });
                          }}
                          placeholder="Product Name"
                          className="text-xs"
                        />
                        <Input
                          value={product.price}
                          onChange={(e) => {
                            const newProducts = [...component.content.products];
                            newProducts[productIdx] = {
                              ...product,
                              price: e.target.value,
                            };
                            updateComponent(component.id, {
                              ...component.content,
                              products: newProducts,
                            });
                          }}
                          placeholder="Price"
                          className="text-xs"
                        />
                      </div>
                      <Input
                        value={product.image}
                        onChange={(e) => {
                          const newProducts = [...component.content.products];
                          newProducts[productIdx] = {
                            ...product,
                            image: e.target.value,
                          };
                          updateComponent(component.id, {
                            ...component.content,
                            products: newProducts,
                          });
                        }}
                        placeholder="Image URL"
                        className="text-xs mb-2"
                      />
                      <Textarea
                        value={product.description}
                        onChange={(e) => {
                          const newProducts = [...component.content.products];
                          newProducts[productIdx] = {
                            ...product,
                            description: e.target.value,
                          };
                          updateComponent(component.id, {
                            ...component.content,
                            products: newProducts,
                          });
                        }}
                        placeholder="Product Description"
                        className="text-xs mb-2"
                        rows={2}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={product.buttonText}
                          onChange={(e) => {
                            const newProducts = [...component.content.products];
                            newProducts[productIdx] = {
                              ...product,
                              buttonText: e.target.value,
                            };
                            updateComponent(component.id, {
                              ...component.content,
                              products: newProducts,
                            });
                          }}
                          placeholder="Button Text"
                          className="text-xs"
                        />
                        <Input
                          value={product.buttonUrl}
                          onChange={(e) => {
                            const newProducts = [...component.content.products];
                            newProducts[productIdx] = {
                              ...product,
                              buttonUrl: e.target.value,
                            };
                            updateComponent(component.id, {
                              ...component.content,
                              products: newProducts,
                            });
                          }}
                          placeholder="Button URL"
                          className="text-xs"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            {deleteButton}
          </div>
        );
      case "bulletList":
      case "numberedList":
        return (
          <div {...commonProps}>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                {component.type === "bulletList" ? (
                  <ul className="list-disc list-inside space-y-1">
                    {component.content.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <ol className="list-decimal list-inside space-y-1">
                    {component.content.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                )}
              </div>
              <Textarea
                value={component.content.join("\n")}
                onChange={(e) =>
                  updateComponent(
                    component.id,
                    e.target.value
                      .split("\n")
                      .filter((item: string) => item.trim())
                  )
                }
                placeholder="List items (one per line)"
                className="text-sm font-mono"
                rows={4}
              />
            </div>
            {deleteButton}
          </div>
        );

      case "divider":
        return (
          <div {...commonProps}>
            <hr className="border-gray-300 my-4" />
            {deleteButton}
          </div>
        );

      default:
        return (
          <div {...commonProps}>
            <div className="p-4 bg-gray-100 rounded text-center text-gray-500">
              {component.type} component - Edit functionality coming soon
            </div>
            {deleteButton}
          </div>
        );
    }
  };

  const renderPreviewComponent = (component: EmailComponent) => {
    switch (component.type) {
      case "text":
        return (
          <p key={component.id} className="text-gray-800 leading-relaxed mb-4">
            {component.content}
          </p>
        );
      case "heading1":
        return (
          <h1
            key={component.id}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            {component.content}
          </h1>
        );
      case "heading2":
        return (
          <h2
            key={component.id}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            {component.content}
          </h2>
        );
      case "heading3":
        return (
          <h3
            key={component.id}
            className="text-xl font-bold text-gray-900 mb-4"
          >
            {component.content}
          </h3>
        );
      case "image":
        return (
          <img
            key={component.id}
            src={component.content.src || "/placeholder.svg"}
            alt={component.content.alt || "Image"}
            className="max-w-full h-auto rounded mb-4"
          />
        );
      case "button":
        return (
          <div key={component.id} className="mb-4">
            <Button className="bg-black text-white hover:bg-gray-800">
              {component.content.text}
            </Button>
          </div>
        );
      case "youtube":
        const videoId = extractYouTubeId(component.content.videoUrl);
        return (
          <div key={component.id} className="mb-4">
            <div className="bg-gray-100 h-48 rounded flex items-center justify-center relative overflow-hidden">
              {videoId ? (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt={component.content.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-3">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </>
              ) : (
                <Video className="w-12 h-12 text-gray-400" />
              )}
            </div>
            {component.content.title && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {component.content.title}
              </p>
            )}
          </div>
        );
      case "socialLinks":
        return (
          <div key={component.id} className="mb-4 text-center">
            <div className="flex justify-center space-x-4">
              {component.content.map((social: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                >
                  <span className="text-xs font-bold">
                    {social.platform.charAt(0).toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "codeBlock":
        return (
          <div key={component.id} className="mb-4">
            {component.content.title && (
              <h4 className="text-sm font-semibold mb-2 text-gray-700">
                {component.content.title}
              </h4>
            )}
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>{component.content.code}</pre>
            </div>
          </div>
        );
      case "section":
        return (
          <div
            key={component.id}
            className="mb-6 p-4 bg-gray-50 border-l-4 border-blue-500 rounded"
          >
            <h3 className="font-semibold text-lg mb-2">
              {component.content.title}
            </h3>
            <p className="text-gray-700">{component.content.content}</p>
          </div>
        );
      case "twoColumnProducts":
        return (
          <div key={component.id} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {component.content.products.map((product: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-4 bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="text-xl font-bold text-green-600 mb-4">
                    {product.price}
                  </div>
                  <Button className="w-full bg-black hover:bg-gray-800">
                    {product.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      case "pricingCard":
        return (
          <div
            key={component.id}
            className="border rounded-lg p-6 bg-white mb-4 max-w-sm mx-auto"
          >
            <h3 className="text-xl font-bold mb-2">
              {component.content.title}
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">
              {component.content.price}
              <span className="text-sm text-gray-500">
                {component.content.period}
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              {component.content.features.map(
                (feature: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                )
              )}
            </ul>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              {component.content.buttonText}
            </Button>
          </div>
        );
      case "productCard":
        return (
          <div
            key={component.id}
            className="border rounded-lg p-4 bg-white mb-4 max-w-sm mx-auto"
          >
            <img
              src={component.content.image}
              alt={component.content.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg mb-2">{component.content.name}</h3>
            <p className="text-gray-600 text-sm mb-3">
              {component.content.description}
            </p>
            <div className="text-xl font-bold text-green-600 mb-4">
              {component.content.price}
            </div>
            <Button className="w-full bg-black hover:bg-gray-800">
              {component.content.buttonText}
            </Button>
          </div>
        );
      case "bulletList":
        return (
          <ul
            key={component.id}
            className="list-disc list-inside space-y-1 mb-4"
          >
            {component.content.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case "numberedList":
        return (
          <ol
            key={component.id}
            className="list-decimal list-inside space-y-1 mb-4"
          >
            {component.content.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        );
      case "divider":
        return <hr key={component.id} className="border-gray-300 my-6" />;
      default:
        return (
          <div
            key={component.id}
            className="p-4 bg-gray-100 rounded text-center text-gray-500 mb-4"
          >
            {component.type} preview
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Newsletter Editor</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleTestEmail}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
              ) : (
                <TestTube className="w-4 h-4 mr-2" />
              )}
              Test Email
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={isLoading || !emailMeta.to || !emailMeta.subject}
            >
              {isLoading ? (
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Email Details</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      From
                    </Label>
                    <Input
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
                    <Label className="text-sm font-medium text-gray-600">
                      Reply-To
                    </Label>
                    <Input
                      value={emailMeta.replyTo}
                      onChange={(e) =>
                        setEmailMeta((prev) => ({
                          ...prev,
                          replyTo: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Audience
                    </Label>
                    <Select
                      value={emailMeta.to}
                      onValueChange={(value) =>
                        setEmailMeta((prev) => ({ ...prev, to: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audiences.map((audience) => (
                          <SelectItem key={audience.id} value={audience.id}>
                            {audience.name} ({audience.count} subscribers)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Send
                    </Label>
                    <Select defaultValue="now">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send now</SelectItem>
                        <SelectItem value="schedule">
                          Schedule for later
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Subject
                    </Label>
                    <Input
                      value={emailMeta.subject}
                      onChange={(e) =>
                        setEmailMeta((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="Your email subject"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Preview Text
                    </Label>
                    <Input
                      value={emailMeta.previewText}
                      onChange={(e) =>
                        setEmailMeta((prev) => ({
                          ...prev,
                          previewText: e.target.value,
                        }))
                      }
                      placeholder="Preview text that appears in inbox"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Email Content</h2>
                <p className="text-sm text-gray-600">
                  Type "/" to add components
                </p>
              </CardHeader>
              <CardContent>
                <div ref={editorRef} className="space-y-2 min-h-[400px]">
                  {components.map(renderEmailComponent)}

                  {/* Input for adding new components */}
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Type '/' for commands"
                      className="w-full p-4 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Preview</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={
                        previewMode === "desktop" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`bg-white border rounded-lg p-6 space-y-4 transition-all duration-300 ${
                    previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"
                  }`}
                >
                  {/* Email Header */}
                  <div className="text-xs text-gray-600 space-y-1 pb-4 border-b">
                    <div>
                      <strong>From:</strong> {emailMeta.from}
                    </div>
                    <div>
                      <strong>To:</strong>{" "}
                      {emailMeta.to
                        ? audiences.find((a) => a.id === emailMeta.to)?.name +
                          ` (${
                            audiences.find((a) => a.id === emailMeta.to)?.count
                          } subscribers)`
                        : "Select audience"}
                    </div>
                    <div>
                      <strong>Subject:</strong>{" "}
                      {emailMeta.subject || "Your subject line"}
                    </div>
                    {emailMeta.previewText && (
                      <div className="text-gray-500 italic">
                        {emailMeta.previewText}
                      </div>
                    )}
                  </div>

                  {/* Email Content */}
                  <div className="space-y-4">
                    {components.length === 0 ? (
                      <div className="text-center text-gray-500 py-12">
                        <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Start adding components to see your email preview</p>
                      </div>
                    ) : (
                      components.map(renderPreviewComponent)
                    )}
                  </div>

                  {/* Email Footer */}
                  <div className="pt-8 mt-8 border-t text-xs text-gray-500 text-center">
                    <p>
                      You received this email because you subscribed to our
                      newsletter.
                    </p>
                    <p className="mt-2">
                      <a href="#" className="text-blue-600 hover:underline">
                        Unsubscribe
                      </a>{" "}
                      |
                      <a
                        href="#"
                        className="text-blue-600 hover:underline ml-2"
                      >
                        Update preferences
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Component Selection Menu */}
      {showComponentMenu && (
        <div
          className="fixed z-50 bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700 w-80 max-h-96 overflow-hidden"
          style={{
            left: Math.max(
              10,
              Math.min(menuPosition.x, window.innerWidth - 330)
            ),
            top: Math.max(
              10,
              Math.min(menuPosition.y, window.innerHeight - 410)
            ),
          }}
        >
          <div className="p-2 overflow-y-auto max-h-96">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No components found
              </div>
            ) : (
              <>
                <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-700 mb-2">
                  {filteredOptions.length} component
                  {filteredOptions.length !== 1 ? "s" : ""} found
                </div>
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.id}
                    className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                      index === selectedOptionIndex
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-800"
                    }`}
                    onClick={() => handleComponentSelect(option)}
                  >
                    <div className="flex-shrink-0">{option.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{option.label}</div>
                      <div className="text-xs text-gray-400 truncate">
                        {option.description}
                      </div>
                    </div>
                    {index === selectedOptionIndex && (
                      <div className="text-xs text-blue-200">↵</div>
                    )}
                  </div>
                ))}
                <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-700 mt-2">
                  Use ↑↓ to navigate, ↵ to select, Esc to close
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
