"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="w-full transition border rounded-full shadow-sm cursor-pointer text-primary hover:shadow-md md:w-auto">
      <div className="justify-between py-2 flex-center">
        <div className="px-6 text-xs font-medium">Anywhere</div>
        <div className="flex-1 hidden px-6 text-xs font-medium text-center border-x lg:block">
          Any Day
        </div>
        <div className="gap-3 pl-6 pr-2 text-xs flex-center">
          <div className="hidden font-medium sm:block">Add Guests</div>
          <div className="p-2 text-white rounded-full bg-primary">
            <BiSearch size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
