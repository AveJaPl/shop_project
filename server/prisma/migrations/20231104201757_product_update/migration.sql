/*
  Warnings:

  - Added the required column `countInStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numReviews` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `countInStock` INTEGER NOT NULL,
    ADD COLUMN `numReviews` INTEGER NOT NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL;
