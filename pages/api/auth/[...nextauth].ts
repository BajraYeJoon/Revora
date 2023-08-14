import { PrismaAdapter } from "@auth/prisma-adapter";
import { client } from "@/app/lib/prismadb";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  CredentialsProvider: {},
};
