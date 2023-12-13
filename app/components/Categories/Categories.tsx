"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoriesProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const Categories = ({ icon: Icon, label, selected }: CategoriesProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleCategoryClick = useCallback(() => {
    let current = {};

    if (params) {
      current = qs.parse(params.toString());
    }

    const newParams: any = {
      ...current,
      category: label,
    };

    if (params?.get("category") === label) {
      delete newParams.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: newParams,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleCategoryClick}
      className={`
        flex
        cursor-pointer 
        flex-col 
        items-center 
        justify-center
        gap-2
        border-b-2
        p-3
        transition
        hover:text-primary/60
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default Categories;
