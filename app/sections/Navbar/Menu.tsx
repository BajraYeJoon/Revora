"use client";

import { User } from "@prisma/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterProvider from "@/app/hooks/useRegisterProvider";
import useLoginProvider from "@/app/hooks/useLoginProvider";
import { signOut } from "next-auth/react";

interface MenuProps {
  currentUser?: User | null;
}

const Menu = ({ currentUser }: MenuProps) => {
  const registerModal = useRegisterProvider();
  const loginModal = useLoginProvider();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex-center gap-1">
        <div className="hidden cursor-pointer rounded-full px-4 py-1 text-xs font-medium text-primary transition hover:bg-neutral md:block">
          Register Homestay
        </div>

        <div
          onClick={toggleOpen}
          className="flex-center hover: cursor-pointer gap-3 rounded-full border-[5px] border-gray-600 p-2 hover:shadow-md md:px-2 md:py-1"
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
            <div className="flex cursor-pointer flex-col">
              {currentUser ? (
                <>
                  <MenuItem onClick={() => {}} label="My History" />
                  <MenuItem onClick={() => {}} label="Favorites" />
                  <MenuItem onClick={() => {}} label="Reservations" />
                  <MenuItem onClick={() => {}} label="Places" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login" />
                  <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                </>
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Menu;
