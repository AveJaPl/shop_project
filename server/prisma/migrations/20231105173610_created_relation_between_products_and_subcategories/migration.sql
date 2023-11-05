-- AlterTable
ALTER TABLE `products` ADD COLUMN `subCategoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
