"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      relative
      w-full
      rounded-lg
      transition
      hover:opacity-80
      disabled:cursor-not-allowed
      disabled:opacity-50 
      ${outline ? "bg-neutral" : "bg-info"}
      ${outline ? "border-black" : "border-info"}
      ${outline ? "text-black" : "text-neutral"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "py-1" : "py-3"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}

    `}
    >
      {Icon && <Icon size={20} className="absolute left-4 top-4" />}
      {label}
    </button>
  );
};

export default Button;
