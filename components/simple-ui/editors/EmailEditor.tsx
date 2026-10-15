// <EmailEditor onHtmlChange={setHtml} />
// const [html, setHtml] = useState("");
"use client";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

export function EmailEditor({
  onHtmlChange,
}: {
  onHtmlChange?: (html: string) => void;
}) {
  const [html, setHtml] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showButtonDialog, setShowButtonDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showProductCardDialog, setShowProductCardDialog] = useState(false);
  const [showTwoProductCardsDialog, setShowTwoProductCardsDialog] =
    useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
    ],
    content: "<p>Start writing your email content here...</p>",
    onUpdate: ({ editor }) => {
      const newHtml = editor.getHTML();
      setHtml(newHtml);
      if (onHtmlChange) {
        onHtmlChange(newHtml);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none p-4 border rounded-md",
      },
    },
  });

  const handleSubmit = () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      setHtml(htmlContent);
      console.log("HTML Content:", htmlContent);
      // Here you would typically send the HTML to your backend
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Toolbar
          editor={editor}
          onLinkClick={() => setShowLinkDialog(true)}
          onButtonClick={() => setShowButtonDialog(true)}
          onImageClick={() => setShowImageDialog(true)}
          onProductCardClick={() => setShowProductCardDialog(true)}
          onTwoProductCardsClick={() => setShowTwoProductCardsDialog(true)}
        />
        <EditorContent editor={editor} />
      </div>

      {!onHtmlChange && (
        <>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Generate HTML</Button>
          </div>

          {html && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Generated HTML</h2>
              <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
                <pre className="text-sm">{html}</pre>
              </div>
            </div>
          )}
        </>
      )}

      {showLinkDialog && editor && (
        <LinkDialog
          editor={editor}
          isOpen={showLinkDialog}
          onClose={() => setShowLinkDialog(false)}
        />
      )}

      {showButtonDialog && editor && (
        <ButtonDialog
          editor={editor}
          isOpen={showButtonDialog}
          onClose={() => setShowButtonDialog(false)}
        />
      )}

      {showImageDialog && editor && (
        <ImageDialog
          editor={editor}
          isOpen={showImageDialog}
          onClose={() => setShowImageDialog(false)}
        />
      )}

      {showProductCardDialog && editor && (
        <ProductCardDialog
          editor={editor}
          isOpen={showProductCardDialog}
          onClose={() => setShowProductCardDialog(false)}
        />
      )}

      {showTwoProductCardsDialog && editor && (
        <TwoProductCardsDialog
          editor={editor}
          isOpen={showTwoProductCardsDialog}
          onClose={() => setShowTwoProductCardsDialog(false)}
        />
      )}
    </div>
  );
}

interface ProductCardDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductCardDialog({
  editor,
  isOpen,
  onClose,
}: ProductCardDialogProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("Read more");
  const [buttonUrl, setButtonUrl] = useState<string>("");
  const [layout, setLayout] = useState<"full" | "split">("full");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create product card HTML based on layout
    const productCard =
      layout === "full"
        ? `
      <div style="border-radius: 0.75rem; overflow: hidden; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin: 1rem 0; width: 100%;">
        <img 
          src="${imageUrl}" 
          alt="${title}"
          style="width: 100%; height: 300px; object-fit: cover;"
        />
        <div style="padding: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">
            ${title}
          </h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">
            ${description}
          </p>
          <a 
            href="${buttonUrl}"
            style="display: inline-flex; align-items: center; background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;"
          >
            ${buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="margin-left: 0.5rem;">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    `
        : `
      <div style="border-radius: 0.75rem; overflow: hidden; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin: 1rem 0; width: 100%; display: flex;">
        <div style="flex: 1;">
          <img 
            src="${imageUrl}" 
            alt="${title}"
            style="width: 100%; height: 100%; object-fit: cover;"
          />
        </div>
        <div style="flex: 1; padding: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">
            ${title}
          </h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">
            ${description}
          </p>
          <a 
            href="${buttonUrl}"
            style="display: inline-flex; align-items: center; background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;"
          >
            ${buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="margin-left: 0.5rem;">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    `;

    editor.chain().focus().insertContent(productCard).run();

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setImageUrl("");
    setTitle("");
    setDescription("");
    setButtonText("Read more");
    setButtonUrl("");
    setLayout("full");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Product Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="layout" className="text-right">
                Layout
              </Label>
              <Select
                value={layout}
                onValueChange={(value) => setLayout(value as "full" | "split")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Width</SelectItem>
                  <SelectItem value="split">Split</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-text" className="text-right">
                Button Text
              </Label>
              <Input
                id="button-text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Read more"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-url" className="text-right">
                Button URL
              </Label>
              <Input
                id="button-url"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  LinkIcon,
  MousePointer,
  Image,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarProps {
  editor: Editor | null;
  onLinkClick: () => void;
  onButtonClick: () => void;
  onImageClick: () => void;
  onProductCardClick: () => void;
  onTwoProductCardsClick: () => void;
}

function ToolbarButton({
  icon: Icon,
  label,
  pressed,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  pressed?: boolean;
  onClick: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={pressed}
            onPressedChange={onClick}
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Toolbar({
  editor,
  onLinkClick,
  onButtonClick,
  onImageClick,
  onProductCardClick,
  onTwoProductCardsClick,
}: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-1 flex flex-wrap gap-1 items-center">
      <div className="flex items-center">
        <ToolbarButton
          icon={Heading1}
          label="Heading 1"
          pressed={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <ToolbarButton
          icon={Heading2}
          label="Heading 2"
          pressed={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          icon={Heading3}
          label="Heading 3"
          pressed={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={Bold}
          label="Bold"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={Italic}
          label="Italic"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={UnderlineIcon}
          label="Underline"
          pressed={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={List}
          label="Bullet List"
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered List"
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          icon={Code}
          label="Code Block"
          pressed={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={LinkIcon}
          label="Insert Link"
          pressed={editor.isActive("link")}
          onClick={onLinkClick}
        />
        <ToolbarButton
          icon={MousePointer}
          label="Insert Button"
          onClick={onButtonClick}
        />
        <ToolbarButton
          icon={Image}
          label="Insert Image"
          onClick={onImageClick}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={ShoppingBag}
          label="Insert Product Card"
          onClick={onProductCardClick}
        />
        <ToolbarButton
          icon={LayoutGrid}
          label="Insert Two Product Cards"
          onClick={onTwoProductCardsClick}
        />
      </div>
    </div>
  );
}

interface LinkDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function LinkDialog({ editor, isOpen, onClose }: LinkDialogProps) {
  const [url, setUrl] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If there's no selection, insert the link with the provided text
    if (editor.state.selection.empty && text) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}">${text}</a>`)
        .run();
    } else {
      // Otherwise, convert the selected text to a link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }

    onClose();
    setUrl("");
    setText("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Text
              </Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Link text (optional)"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface ImageDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageDialog({ editor, isOpen, onClose }: ImageDialogProps) {
  const [url, setUrl] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [width, setWidth] = useState<string>("100%");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Insert image with specified attributes
    editor
      .chain()
      .focus()
      .insertContent(
        `<img src="${url}" alt="${alt}" style="width: ${width}; max-width: 100%; height: auto;" />`
      )
      .run();

    onClose();
    setUrl("");
    setAlt("");
    setWidth("100%");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-alt" className="text-right">
                Alt Text
              </Label>
              <Input
                id="image-alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Image description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-width" className="text-right">
                Width
              </Label>
              <Input
                id="image-width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100%"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Image</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface ProductInfo {
  imageUrl: string;
  title: string;
  price: string;
  link: string;
}

interface TwoProductCardsDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function TwoProductCardsDialog({
  editor,
  isOpen,
  onClose,
}: TwoProductCardsDialogProps) {
  const [product1, setProduct1] = useState<ProductInfo>({
    imageUrl: "",
    title: "",
    price: "",
    link: "",
  });

  const [product2, setProduct2] = useState<ProductInfo>({
    imageUrl: "",
    title: "",
    price: "",
    link: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create two product cards side by side
    const twoProductCards = `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0; width: 100%;">
        <div style="flex: 1; min-width: 250px; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
          <a href="${product1.link}" style="text-decoration: none; color: inherit;">
            <img src="${product1.imageUrl}" alt="${product1.title}" style="width: 100%; height: 200px; object-fit: cover;" />
            <div style="padding: 1rem;">
              <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${product1.title}</h3>
              <p style="font-size: 1rem; font-weight: 700; color: #4f46e5;">${product1.price}</p>
              <a href="${product1.link}" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background-color: #4f46e5; color: white; border-radius: 0.25rem; text-decoration: none; font-weight: 500;">View Product</a>
            </div>
          </a>
        </div>
        <div style="flex: 1; min-width: 250px; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
          <a href="${product2.link}" style="text-decoration: none; color: inherit;">
            <img src="${product2.imageUrl}" alt="${product2.title}" style="width: 100%; height: 200px; object-fit: cover;" />
            <div style="padding: 1rem;">
              <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${product2.title}</h3>
              <p style="font-size: 1rem; font-weight: 700; color: #4f46e5;">${product2.price}</p>
              <a href="${product2.link}" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background-color: #4f46e5; color: white; border-radius: 0.25rem; text-decoration: none; font-weight: 500;">View Product</a>
            </div>
          </a>
        </div>
      </div>
    `;

    editor.chain().focus().insertContent(twoProductCards).run();

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setProduct1({
      imageUrl: "",
      title: "",
      price: "",
      link: "",
    });
    setProduct2({
      imageUrl: "",
      title: "",
      price: "",
      link: "",
    });
  };

  const updateProduct1 = (field: keyof ProductInfo, value: string) => {
    setProduct1((prev) => ({ ...prev, [field]: value }));
  };

  const updateProduct2 = (field: keyof ProductInfo, value: string) => {
    setProduct2((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Insert Two Product Cards</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="product1" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="product1">Product 1</TabsTrigger>
              <TabsTrigger value="product2">Product 2</TabsTrigger>
            </TabsList>
            <TabsContent value="product1">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="product1-image"
                    value={product1.imageUrl}
                    onChange={(e) => updateProduct1("imageUrl", e.target.value)}
                    placeholder="https://example.com/product1.jpg"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-title" className="text-right">
                    Product Title
                  </Label>
                  <Input
                    id="product1-title"
                    value={product1.title}
                    onChange={(e) => updateProduct1("title", e.target.value)}
                    placeholder="Product 1 Name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="product1-price"
                    value={product1.price}
                    onChange={(e) => updateProduct1("price", e.target.value)}
                    placeholder="$99.99"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product1-link" className="text-right">
                    Product Link
                  </Label>
                  <Input
                    id="product1-link"
                    value={product1.link}
                    onChange={(e) => updateProduct1("link", e.target.value)}
                    placeholder="https://example.com/product1"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="product2">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="product2-image"
                    value={product2.imageUrl}
                    onChange={(e) => updateProduct2("imageUrl", e.target.value)}
                    placeholder="https://example.com/product2.jpg"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-title" className="text-right">
                    Product Title
                  </Label>
                  <Input
                    id="product2-title"
                    value={product2.title}
                    onChange={(e) => updateProduct2("title", e.target.value)}
                    placeholder="Product 2 Name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="product2-price"
                    value={product2.price}
                    onChange={(e) => updateProduct2("price", e.target.value)}
                    placeholder="$99.99"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product2-link" className="text-right">
                    Product Link
                  </Label>
                  <Input
                    id="product2-link"
                    value={product2.link}
                    onChange={(e) => updateProduct2("link", e.target.value)}
                    placeholder="https://example.com/product2"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Product Cards</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface ButtonDialogProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export function ButtonDialog({ editor, isOpen, onClose }: ButtonDialogProps) {
  const [url, setUrl] = useState<string>("");
  const [text, setText] = useState<string>("Click Here");
  const [style, setStyle] = useState<string>("primary");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a button with the specified style
    const buttonClass = getButtonClass(style);

    editor
      .chain()
      .focus()
      .insertContent(`<a href="${url}" class="${buttonClass}">${text}</a>`)
      .run();

    onClose();
    setUrl("");
    setText("Click Here");
    setStyle("primary");
  };

  const getButtonClass = (style: string): string => {
    switch (style) {
      case "primary":
        return "inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 text-center no-underline";
      case "secondary":
        return "inline-block px-4 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 text-center no-underline";
      case "success":
        return "inline-block px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 text-center no-underline";
      case "danger":
        return "inline-block px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 text-center no-underline";
      default:
        return "inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 text-center no-underline";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Button</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-url" className="text-right">
                URL
              </Label>
              <Input
                id="button-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-text" className="text-right">
                Text
              </Label>
              <Input
                id="button-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Button text"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="button-style" className="text-right">
                Style
              </Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="danger">Danger</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Insert Button</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
