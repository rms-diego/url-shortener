-- CreateTable
CREATE TABLE `url` (
    `id` VARCHAR(191) NOT NULL,
    `baseUrl` VARCHAR(191) NOT NULL,
    `shortedUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
