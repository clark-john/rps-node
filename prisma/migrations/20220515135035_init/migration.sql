-- CreateTable
CREATE TABLE `History` (
    `gamenumber` INTEGER NOT NULL AUTO_INCREMENT,
    `wins` INTEGER NOT NULL,
    `loses` INTEGER NOT NULL,
    `tie` INTEGER NOT NULL,
    `total_games` INTEGER NOT NULL,
    `dateplayed` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `History_dateplayed_key`(`dateplayed`),
    PRIMARY KEY (`gamenumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `name` VARCHAR(200) NOT NULL,
    `birthdate` SMALLINT NOT NULL,
    `birthmonth` VARCHAR(10) NOT NULL,
    `birthyear` INTEGER NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `highscore` INTEGER NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
