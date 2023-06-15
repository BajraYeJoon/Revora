"use client";

import Avatar from "@/app/components/Avatar/Avatar";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="gap-1 flex-center">
        <div className="hidden px-4 py-1 text-xs font-medium transition rounded-full cursor-pointer text-primary hover:bg-neutral md:block">
          Register Homestay
        </div>

        <div
          onClick={toggleOpen}
          className="gap-3 p-2 border rounded-full cursor-pointer flex-center hover: border-neutral hover:shadow-md md:px-2 md:py-1 "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {
        // Menu Dropdown
        isOpen && (
          <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-neutral text-sm shadow-md md:w-3/4">
            <div className="flex flex-col cursor-pointer">
              <>
                <MenuItem onClick={() => {}} label="login" />
                <MenuItem onClick={() => {}} label="Sign Up" />
              </>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Menu;
