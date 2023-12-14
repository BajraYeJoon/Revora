"use client";

interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h1 className="text-xl font-semibold text-black">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default Heading;
