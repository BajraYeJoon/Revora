import { Context } from "@/pages/api/graphql";

export const resolvers = {
  Query: {
    hello: (_parent: unknown, _args: unknown, context: Context) => {
      return "Hello world!";
    },
  },
};
