"use client";
// -----------------------------------------------------------------------------for client side to styling

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  );
};

export default Wrapper;
