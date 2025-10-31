"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Plus,
  Save,
  Package,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  ChevronsUpDown,
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  basePrice: z
    .string()
    .min(1, "Base price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Base price must be a valid positive number",
    }),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const variantSchema = z.object({
  sku: z.string().min(1, "Variant SKU is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid positive number",
    }),
  stock: z
    .string()
    .min(1, "Stock is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Stock must be a valid positive number",
    }),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isAvailable: z.boolean(),
});

const attributeSchema = z.object({
  key: z.string().min(1, "Attribute name is required"),
  value: z.string().min(1, "Value is required"),
});

type ProductFormData = z.infer<typeof productSchema>;
type VariantFormData = z.infer<typeof variantSchema>;
type AttributeFormData = z.infer<typeof attributeSchema>;

type VariantAttribute = {
  id: string;
  key: string;
  value: string;
};

type Variant = {
  id: string;
  sku: string;
  price: string;
  stock: string;
  imageUrl: string;
  isAvailable: boolean;
  attributes: VariantAttribute[];
};

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home-garden", label: "Home & Garden" },
  { value: "sports-outdoors", label: "Sports & Outdoors" },
  { value: "toys-games", label: "Toys & Games" },
  { value: "books", label: "Books" },
  { value: "beauty-personal-care", label: "Beauty & Personal Care" },
  { value: "automotive", label: "Automotive" },
  { value: "food-beverages", label: "Food & Beverages" },
  { value: "health-wellness", label: "Health & Wellness" },
  { value: "pet-supplies", label: "Pet Supplies" },
  { value: "office-supplies", label: "Office Supplies" },
];

type CategorySelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

function CategorySelect({ value, onValueChange }: CategorySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {value
            ? categories.find((category) => category.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type AttributeFormProps = {
  attribute: VariantAttribute;
  onUpdate: (attribute: VariantAttribute) => void;
  onRemove: () => void;
};

function AttributeForm({ attribute, onUpdate, onRemove }: AttributeFormProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      key: attribute.key,
      value: attribute.value,
    },
  });

  const handleFieldBlur = (field: keyof AttributeFormData) => {
    const value = watch(field);
    onUpdate({
      ...attribute,
      [field]: value,
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-1">
          <Label htmlFor={`attr-key-${attribute.id}`} className="text-xs">
            Attribute Name
          </Label>
          <Input
            id={`attr-key-${attribute.id}`}
            {...register("key")}
            onBlur={() => handleFieldBlur("key")}
            placeholder="e.g., Color, Size, RAM"
            className="h-9"
          />
        </div>

        <div className="flex-1 space-y-1">
          <Label htmlFor={`attr-value-${attribute.id}`} className="text-xs">
            Value
          </Label>
          <Input
            id={`attr-value-${attribute.id}`}
            {...register("value")}
            onBlur={() => handleFieldBlur("value")}
            placeholder="e.g., Red, Large, 16GB"
            className="h-9"
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-9 px-2"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex gap-2">
        {errors.key && (
          <p className="flex-1 text-xs text-destructive">
            {errors.key.message}
          </p>
        )}
        {errors.value && (
          <p className="flex-1 text-xs text-destructive">
            {errors.value.message}
          </p>
        )}
      </div>
    </div>
  );
}

type VariantFormProps = {
  variant: Variant;
  index: number;
  onUpdate: (variant: Variant) => void;
  onRemove: () => void;
};

function VariantForm({ variant, index, onUpdate, onRemove }: VariantFormProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<VariantFormData>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      sku: variant.sku,
      price: variant.price,
      stock: variant.stock,
      imageUrl: variant.imageUrl,
      isAvailable: variant.isAvailable,
    },
  });

  const handleFieldBlur = (field: keyof VariantFormData) => {
    const value = watch(field);
    onUpdate({
      ...variant,
      [field]: value,
    });
  };

  const addAttribute = () => {
    const newAttribute: VariantAttribute = {
      id: `attr-${Date.now()}`,
      key: "",
      value: "",
    };
    onUpdate({ ...variant, attributes: [...variant.attributes, newAttribute] });
  };

  const updateAttribute = (id: string, updatedAttribute: VariantAttribute) => {
    onUpdate({
      ...variant,
      attributes: variant.attributes.map((a) =>
        a.id === id ? updatedAttribute : a
      ),
    });
  };

  const removeAttribute = (id: string) => {
    onUpdate({
      ...variant,
      attributes: variant.attributes.filter((a) => a.id !== id),
    });
  };

  return (
    <Card className="border-l-4 border-l-accent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Variant {index + 1}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`variant-sku-${variant.id}`}>Variant SKU *</Label>
              <Input
                id={`variant-sku-${variant.id}`}
                {...register("sku")}
                onBlur={() => handleFieldBlur("sku")}
                placeholder="e.g., PROD-001-RED"
              />
              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`variant-price-${variant.id}`}>Price *</Label>
              <Input
                id={`variant-price-${variant.id}`}
                type="number"
                step="0.01"
                {...register("price")}
                onBlur={() => handleFieldBlur("price")}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`variant-stock-${variant.id}`}>Stock *</Label>
              <Input
                id={`variant-stock-${variant.id}`}
                type="number"
                {...register("stock")}
                onBlur={() => handleFieldBlur("stock")}
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-sm text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`variant-image-${variant.id}`}>Image URL</Label>
              <Input
                id={`variant-image-${variant.id}`}
                type="url"
                {...register("imageUrl")}
                onBlur={() => handleFieldBlur("imageUrl")}
                placeholder="https://example.com/variant.jpg"
              />
              {errors.imageUrl && (
                <p className="text-sm text-destructive">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
            <div className="space-y-0.5">
              <Label htmlFor={`variant-available-${variant.id}`}>
                Available for Sale
              </Label>
              <p className="text-sm text-muted-foreground">
                Make this variant available to customers
              </p>
            </div>
            <Switch
              id={`variant-available-${variant.id}`}
              checked={watch("isAvailable")}
              onCheckedChange={(checked) => {
                setValue("isAvailable", checked);
                onUpdate({ ...variant, isAvailable: checked });
              }}
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-foreground">
                  Variant Attributes
                </h4>
                <p className="text-xs text-muted-foreground">
                  Define characteristics like color, size, etc.
                </p>
              </div>
              <Button
                type="button"
                onClick={addAttribute}
                variant="outline"
                size="sm"
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Attribute
              </Button>
            </div>

            {variant.attributes.length > 0 && (
              <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-3">
                {variant.attributes.map((attribute) => (
                  <AttributeForm
                    key={attribute.id}
                    attribute={attribute}
                    onUpdate={(updatedAttribute) =>
                      updateAttribute(attribute.id, updatedAttribute)
                    }
                    onRemove={() => removeAttribute(attribute.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function ProductForm() {
  const [variants, setVariants] = useState<Variant[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      basePrice: "",
      category: "",
      brand: "",
      imageUrl: "",
    },
  });

  const category = watch("category");

  const addVariant = () => {
    const newVariant: Variant = {
      id: `variant-${Date.now()}`,
      sku: "",
      price: "",
      stock: "",
      imageUrl: "",
      isAvailable: true,
      attributes: [],
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (id: string, updatedVariant: Variant) => {
    setVariants(variants.map((v) => (v.id === id ? updatedVariant : v)));
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      basePrice: Number.parseFloat(data.basePrice),
      variants: variants.map((v) => ({
        sku: v.sku,
        price: Number.parseFloat(v.price),
        stock: Number.parseInt(v.stock),
        imageUrl: v.imageUrl,
        isAvailable: v.isAvailable,
        attributes: v.attributes,
      })),
    };

    console.log("[v0] Product data to submit:", productData);

    toast("Product saved", {
      description: "Your product has been successfully saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Enter the basic details for your product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Premium Wireless Headphones"
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <CategorySelect
                value={category}
                onValueChange={(value) =>
                  setValue("category", value, { shouldValidate: true })
                }
              />
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your product..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price *</Label>
              <Input
                id="basePrice"
                type="number"
                step="0.01"
                {...register("basePrice")}
                placeholder="0.00"
              />
              {errors.basePrice && (
                <p className="text-sm text-destructive">
                  {errors.basePrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                {...register("brand")}
                placeholder="e.g., TechBrand"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              {...register("imageUrl")}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-sm text-destructive">
                {errors.imageUrl.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Product Variants
            </h2>
            <p className="text-sm text-muted-foreground">
              Add different variants of this product
            </p>
          </div>
          <Button
            type="button"
            onClick={addVariant}
            variant="outline"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Variant
          </Button>
        </div>

        {variants.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-center">
                No variants added yet. Click "Add Variant" to create your first
                variant.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {variants.map((variant, index) => (
              <VariantForm
                key={variant.id}
                variant={variant}
                index={index}
                onUpdate={(updatedVariant) =>
                  updateVariant(variant.id, updatedVariant)
                }
                onRemove={() => removeVariant(variant.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Product
        </Button>
      </div>
    </form>
  );
}
