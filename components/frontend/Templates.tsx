"use client";
import Link from "next/link";
import * as React from "react";
import { Check, ChevronDown, List } from "lucide-react";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

import { Badge } from "../ui/badge";
import { LayoutGrid } from "lucide-react";
import TemplateHorizontalCard from "./TemplateCard";
import TemplateFilters from "./TemplateFilters";
import {
  updateTemplateDownloads,
  updateTemplateViews,
} from "@/actions/templates";
export type TemplateProps = {
  id: string;
  slug: string;
  name: string;
  price: number;
  screenShots: string[]; // Array of image URLs or paths
  description: string | null;
  userName: string;
  categoryName: string;
  thumbnail: string; // URL or path to the thumbnail image
};
export default function Templates({
  templates,
}: {
  templates: TemplateProps[];
}) {
  const [isGrid, setIsGrid] = React.useState(true);
  async function handleUpdateViews(id: string) {
    try {
      await updateTemplateViews(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-background py-8">
      {templates.length > 0 ? (
        <div className="max-w-7xl px-4 mx-auto">
          <div className="flex items-center justify-between pb-8">
            <div className="flex space-x-4 ">
              {/* <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select> */}
              <TemplateFilters />
            </div>
            <div className="flex gap-6 items-center">
              <button onClick={() => setIsGrid(!isGrid)}>
                {isGrid ? <LayoutGrid /> : <List />}
              </button>
              <p>{templates.length} Templates</p>
            </div>
          </div>
          {isGrid ? (
            <div className="grid lg:grid-cols-4 gap-4  grid-cols-2 md:grid-cols-3">
              {templates.map((item, i) => {
                const price = item.price > 0 ? `$ ${item.price}` : "Free";
                return (
                  <Link
                    onClick={() => handleUpdateViews(item.id)}
                    key={i}
                    href={`/web-templates/${item.slug}`}
                    className="rounded-xl overflow-hidden border"
                  >
                    <img src={item.thumbnail} alt="" />
                    <div className="px-3 pb-3">
                      <h2 className="py-1.5 font-semibold">{item.name}</h2>
                      <p className="line-clamp-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="py-1.5 px-4">{price}</Badge>
                        <p>{item.userName}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4 py-12">
              {templates.map((item, i) => {
                return <TemplateHorizontalCard data={item} key={i} />;
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="">
          <h2>No Templates Yet</h2>
        </div>
      )}
    </div>
  );
}
