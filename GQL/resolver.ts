import getCurrentUser from "@/app/lib/actions/getCurrentUserInfo";
import { Context } from "@/pages/api/graphql";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const resolvers = {
  Query: {
    users: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany();
    },
  },

  Mutation: {
    register: async (_parent: any, args: any, context: Context) => {
      const { name, email, password } = args.input;

      if (!password) {
        throw new Error("Password is required for registration");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await context.prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });

      return user;
    },

    createListing: async (_: any, args: any, context: Context) => {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        throw new Error("Not authenticated");
      }

      const {
        title,
        description,
        listingImage,
        category,
        roomCount,
        bathroomCount,
        maxGuests,
        location,
        price,
      } = args.input;

      const listing = await context.prisma.listing.create({
        data: {
          title,
          description,
          listingImage,
          category,
          roomCount,
          bathroomCount,
          maxGuests,
          location: location.value,
          price: parseInt(price, 10),
          userId: currentUser.id,
        },
      });

      return listing;
    },
  },
};
