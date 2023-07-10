"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="transiton px-4 py-4 font-semibold text-black hover:bg-neutral"
    >
      {label}
    </div>
  );
};

export default MenuItem;
