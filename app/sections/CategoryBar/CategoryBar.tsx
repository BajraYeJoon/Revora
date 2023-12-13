"use client";

import React from "react";
import Wrapper from "../Wrapper";
import Categories from "@/app/components/Categories/Categories";
import { usePathname, useSearchParams } from "next/navigation";

import {
  GiMountainCave,
  GiCampingTent,
  GiSnowflake1,
  GiTreehouse,
  GiSurfBoard,
  GiWoodCabin,
  GiAirBalloon,
  GiCruiser,
  GiVillage,
} from "react-icons/gi";
import {
  FaBed,
  FaSwimmer,
  FaFire,
  FaSnowflake,
  FaUmbrellaBeach,
  FaMountain,
  FaSkiing,
  FaCity,
} from "react-icons/fa";
import {
  MdOutlineApartment,
  MdOutlineBusinessCenter,
  MdOutlineLocalHotel,
  MdOutlineHome,
} from "react-icons/md";

export const categories = [
  {
    label: "Scenic",
    icon: GiMountainCave,
    description: "Properties with breathtaking views",
  },
  {
    label: "Adventure",
    icon: GiCampingTent,
    description: "Accommodations for outdoor enthusiasts",
  },
  {
    label: "Snowy",
    icon: FaSnowflake,
    description: "Cozy retreats in snowy landscapes",
  },
  {
    label: "Cruise",
    icon: GiCruiser,
    description: "Luxurious accommodations on the water",
  },
  {
    label: "Luxury",
    icon: GiVillage,
    description: "Upscale and lavish vacation rentals",
  },
  {
    label: "Rustic",
    icon: GiWoodCabin,
    description: "Charming cabins surrounded by nature",
  },
  {
    label: "Treehouse",
    icon: GiTreehouse,
    description: "Unique stays high in the treetops",
  },
  {
    label: "Ski",
    icon: FaSkiing,
    description: "Accommodations near skiing destinations",
  },
  {
    label: "Beach",
    icon: FaUmbrellaBeach,
    description: "Properties by the sun and sand",
  },
  {
    label: "City",
    icon: FaCity,
    description: "Urban accommodations with city vibes",
  },
  {
    label: "Mountain",
    icon: FaMountain,
    description: "Lodges surrounded by majestic mountains",
  },
  {
    label: "Cozy",
    icon: FaBed,
    description: "Warm and inviting bed and breakfasts",
  },
  {
    label: "Pool",
    icon: FaSwimmer,
    description: "Stays with refreshing swimming pools",
  },
  {
    label: "Hotel",
    icon: MdOutlineLocalHotel,
    description: "Hotel-like experiences with full amenities",
  },
  {
    label: "Modern",
    icon: MdOutlineApartment,
    description: "Sleek and contemporary apartments",
  },
];

const CategoryBar = () => {
  const params = useSearchParams();
  const currentCategory = params?.get("category");

  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Wrapper>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((category) => (
          <Categories
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={currentCategory === category.label}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default CategoryBar;
