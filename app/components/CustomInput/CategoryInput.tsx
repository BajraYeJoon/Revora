import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex cursor-pointer items-center gap-2 rounded-md border-2 p-4 transition hover:border-accent/60 ${
        selected ? "border-accent/60" : "border-accent/20"
      }`}
    >
      <Icon size={24} color="#004AAD" />
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default CategoryInput;
