"use client";

import { useCallback } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onSubtract = useCallback(() => {
    if (value > 0) {
      onChange(value - 1);
    }
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onSubtract}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition duration-300 hover:bg-gray-200"
        >
          <AiOutlineMinusCircle />
        </div>
        <div className="text-neutral-300 text-lg font-normal">{value}</div>
        <div className="flex flex-row items-center gap-3">
          <div
            onClick={onAdd}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition duration-300 hover:bg-gray-200"
          >
            <AiOutlinePlusCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
