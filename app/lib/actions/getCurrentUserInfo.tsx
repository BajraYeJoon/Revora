// To get the current user info from the session

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/lib/prismadb";

/**
 * The function `getSession` is an asynchronous function that returns the server session using the
 * `getServerSession` function with the `authOptions` parameter.
 * @returns The `getSession` function is returning a promise that resolves to the result of the
 * `getServerSession` function call with the `authOptions` parameter.
 */
export async function getSession() {
  return await getServerSession(authOptions);
}
/**
 * The function `getCurrentUser` retrieves the current user's session and uses it to find and return
 * the corresponding user from the database.
 * @returns the current user if they are logged in and their email is available in the session. If the
 * user is not logged in or their email is not available, the function returns null. If there is an
 * error during the process, the function also returns null.
 */

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (err: any) {
    return null;
  }
}
