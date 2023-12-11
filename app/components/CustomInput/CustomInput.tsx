"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface CustomInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const CustomInput = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}: CustomInputProps) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={20}
          className="text-neutral-700 absolute left-2 top-5"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light transition marker:outline-none disabled:cursor-not-allowed disabled:opacity-70 
            ${formatPrice ? "pl-10" : "pl-4"}
            ${errors[id] ? "border-red-500" : "border-neutral-300"}
            ${errors[id] ? "focus:border-red-500" : "focus:border-black"} 
        `}
      />
      <label
        className={` text-md 
          absolute
          top-5 
          z-10 
          origin-[0] 
          -translate-y-3 
          transform 
          duration-150 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
