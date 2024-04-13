-- CreateTable
CREATE TABLE `Command` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jsonPath` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `appId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Command` ADD CONSTRAINT `Command_appId_fkey` FOREIGN KEY (`appId`) REFERENCES `App`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
