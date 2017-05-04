SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `collection` (
  `cid` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` mediumtext,
  `hidden` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `danmaku` (
  `did` bigint(20) UNSIGNED NOT NULL,
  `vid` bigint(20) UNSIGNED NOT NULL,
  `content` varchar(500) NOT NULL,
  `mode` int(11) UNSIGNED NOT NULL,
  `time` mediumint(8) UNSIGNED NOT NULL,
  `color` varchar(6) DEFAULT NULL,
  `size` int(10) UNSIGNED DEFAULT NULL,
  `date` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
DELIMITER $$
CREATE TRIGGER `danmaku_AFTER_DELETE` AFTER DELETE ON `danmaku` FOR EACH ROW BEGIN
	UPDATE `video` SET `danmakuCount`=(SELECT count(*) FROM `danmaku` WHERE `vid`=OLD.vid) WHERE `video`.`vid` =OLD.vid;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `danmaku_AFTER_INSERT` AFTER INSERT ON `danmaku` FOR EACH ROW BEGIN
	UPDATE `video` SET `danmakuCount`=(SELECT count(*) FROM `danmaku` WHERE `vid`=NEW.vid) WHERE `video`.`vid` =NEW.vid;
END
$$
DELIMITER ;

CREATE TABLE `video` (
  `vid` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `address` mediumtext,
  `cover` mediumtext,
  `description` mediumtext,
  `option` mediumtext,
  `playCount` bigint(20) UNSIGNED DEFAULT '0',
  `danmakuCount` bigint(20) DEFAULT '0',
  `date` bigint(20) NOT NULL DEFAULT '0',
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `cid` mediumint(8) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `collection`
  ADD PRIMARY KEY (`cid`,`name`),
  ADD UNIQUE KEY `cid_UNIQUE` (`cid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

ALTER TABLE `danmaku`
  ADD PRIMARY KEY (`did`,`vid`),
  ADD UNIQUE KEY `did_UNIQUE` (`did`),
  ADD KEY `vid_idx` (`vid`);

ALTER TABLE `video`
  ADD PRIMARY KEY (`vid`,`title`),
  ADD UNIQUE KEY `vid_UNIQUE` (`vid`),
  ADD UNIQUE KEY `title_UNIQUE` (`title`),
  ADD KEY `cid_idx` (`cid`);


ALTER TABLE `collection`
  MODIFY `cid` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `danmaku`
  MODIFY `did` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1431;
ALTER TABLE `video`
  MODIFY `vid` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `danmaku`
  ADD CONSTRAINT `vid` FOREIGN KEY (`vid`) REFERENCES `video` (`vid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `video`
  ADD CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `collection` (`cid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
