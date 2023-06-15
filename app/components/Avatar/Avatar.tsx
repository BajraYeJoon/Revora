"use client";
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full "
      alt="avatar"
      height={20}
      width={20}
      src="https://res.cloudinary.com/dw55twddi/image/upload/v1686822032/Revora/avatar_tn0e7c.png"
    />
  );
};

export default Avatar;
