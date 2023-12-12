/*
  Warnings:

  - Made the column `userId` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `listingId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_userId_fkey";

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "listingId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
