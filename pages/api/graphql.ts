import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient, User } from "@prisma/client";
import { typeDefs } from "@/GQL/schema";
import { prisma } from "@/app/lib/prismadb";
import { resolvers } from "@/GQL/resolver";
import { getSession } from "next-auth/client";

export type Context = {
  prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    const session = await getSession({ req });

    return {
      prisma,
      req,
      res,
      session,
    };
  },
});
