"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height="110"
      width="110"
      src="https://res.cloudinary.com/dw55twddi/image/upload/v1686814865/Revora/revoralogo_1_zrkkzb.png"
    />
  );
};
export default Logo;
