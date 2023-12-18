"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { FaPhotoVideo } from "react-icons/fa";

declare global {
  var cloudinary: any;
}

interface UploadImageProps {
  onChange: (image: string) => void;
  image: string;
}

const UploadImage = ({ onChange, image }: UploadImageProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="gje0wvzx"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed border-primary/60 p-16 text-primary/60 transition hover:opacity-50"
          >
            <FaPhotoVideo size={50} />
            <div className="text-base font-semibold">Upload Image</div>
            {image && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={image}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  alt=""
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
