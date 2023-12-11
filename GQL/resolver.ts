import { Context } from "@/pages/api/graphql";
import bcrypt from "bcrypt";

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
  },
};
