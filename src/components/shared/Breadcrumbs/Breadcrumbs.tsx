import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface Item {
  title: string;
  url: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: Item[];
}

export function BreadcrumbWithCustomSeparator({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item) => {
          return (
            <React.Fragment key={item.title}>
              <BreadcrumbItem>
                {item.active ? (
                  <BreadcrumbPage className="font-museo">
                    {item.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link className="font-museo" href={item.url}>
                      {item.title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!item.active && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
