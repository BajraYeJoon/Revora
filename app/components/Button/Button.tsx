"use client";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      disbaled:opacity-50
      relative
      w-full
      rounded-lg
      transition
      hover:opacity-80
      disabled:cursor-not-allowed 
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
