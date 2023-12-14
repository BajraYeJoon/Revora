"use client";

import Avatar from "@/app/components/Avatar/Avatar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterProvider from "@/app/hooks/useRegisterProvider";
import useLoginProvider from "@/app/hooks/useLoginProvider";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useStayApply from "@/app/hooks/useStayApply";

interface MenuProps {
  currentUser?: SafeUser | null;
}

const Menu = ({ currentUser }: MenuProps) => {
  const modal = useRef<HTMLDivElement>(null);

  const registerModal = useRegisterProvider();
  const loginModal = useLoginProvider();
  const vacRegPlace = useStayApply();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    vacRegPlace.onOpen();
  }, [currentUser, loginModal, vacRegPlace]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (modal.current && !modal.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal, isOpen]);

  return (
    <div className="relative" ref={modal}>
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
          hidden
            cursor-pointer
            rounded-full
            px-4 
            py-3 
            text-xs
            font-semibold 
            text-primary 
            transition 
            hover:text-primary/80 
            md:block
          "
        >
          Register Your Place?
        </div>
        <div
          onClick={toggleOpen}
          className="flex-center hover: cursor-pointer gap-3 rounded-full  p-2 hover:shadow-md md:px-2 md:py-1"
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
          <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-neutral text-sm shadow-md  md:max-w-[150px]">
            <div className="flex cursor-pointer flex-col">
              {currentUser ? (
                <>
                  <MenuItem onClick={() => {}} label="My History" />
                  <MenuItem onClick={() => {}} label="Favorites" />
                  <MenuItem onClick={() => {}} label="Reservations" />
                  <MenuItem onClick={() => {}} label="Places" />
                  <MenuItem
                    onClick={vacRegPlace.onOpen}
                    label="Register your place"
                  />

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
