import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { TemplateProps } from "./Templates";

export default function TemplateList({
  templates,
  title,
}: {
  templates: TemplateProps[];
  title: string;
}) {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-400 mb-6">{templates.length} Templates</p>
      </div>
      <div className="grid lg:grid-cols-4 gap-4  grid-cols-2 md:grid-cols-3">
        {templates.map((item, i) => {
          const price = item.price > 0 ? `$ ${item.price}` : "Free";
          return (
            <Link
              key={i}
              href={`/web-templates/${item.slug}`}
              className="rounded-xl overflow-hidden border"
            >
              <img src={item.thumbnail} alt="" />
              <div className="px-3 pb-3">
                <h2 className="py-1.5 font-semibold">{item.name}</h2>
                <div className="flex items-center justify-between">
                  <Badge className="py-1.5 px-4">{price}</Badge>
                  <p>{item.userName}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
