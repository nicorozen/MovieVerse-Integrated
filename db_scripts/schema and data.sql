CREATE DATABASE  IF NOT EXISTS `movieverse` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `movieverse`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movieverse
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `listitems`
--

DROP TABLE IF EXISTS `listitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listitems` (
  `listItemId` int NOT NULL AUTO_INCREMENT,
  `contentType` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `listId` int DEFAULT NULL,
  `movieId` int NOT NULL,
  PRIMARY KEY (`listItemId`),
  KEY `listId` (`listId`),
  CONSTRAINT `listitems_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `lists` (`listId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listitems`
--

LOCK TABLES `listitems` WRITE;
/*!40000 ALTER TABLE `listitems` DISABLE KEYS */;
INSERT INTO `listitems` VALUES (28,'movie','/kkFn3KM47Qq4Wjhd8GuFfe3LX27.jpg','2024-06-23 01:59:58','2024-06-23 01:59:58',10,653346),(32,'movie','/kkFn3KM47Qq4Wjhd8GuFfe3LX27.jpg','2024-06-23 02:05:50','2024-06-23 02:05:50',12,653346),(35,'movie','/o1nY37L6HC9hwlLSH5sHVzvXt1P.jpg','2024-06-23 02:11:07','2024-06-23 02:11:07',NULL,1375),(36,'movie','/5jI2vEHJReAx8iFDmhC2O3yW37w.jpg','2024-06-23 02:23:14','2024-06-23 02:23:14',NULL,573435),(51,'movie','/uRRTV7p6l2ivtODWJVVAMRrwTn2.jpg','2024-06-24 01:12:25','2024-06-24 01:12:25',13,278),(54,'tv','/u9ruVVPJWGPuzWCv4DDK9DyDebZ.jpg','2024-06-24 02:03:22','2024-06-24 02:03:22',14,1396),(55,'movie','/diEeiB2DmZZadHISkg24RO2n0rT.jpg','2024-06-24 02:04:29','2024-06-24 02:04:29',15,940551),(57,'movie','/5WI0ELIwgVY71loQSZLD5qQ1Q6c.jpg','2024-06-24 02:11:06','2024-06-24 02:11:06',13,1366),(58,'movie','/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg','2024-06-24 02:13:42','2024-06-24 02:13:42',13,346698),(60,'movie','/euAVHzSzZY14H7pnInO2ANXIaKB.jpg','2024-06-25 18:58:01','2024-06-25 18:58:01',13,1016346),(61,'movie','/diEeiB2DmZZadHISkg24RO2n0rT.jpg','2024-06-26 22:27:58','2024-06-26 22:27:58',13,940551),(64,'tv','/z01Dc0Ly2GmCpLe6Scx4d3dPP1S.jpg','2024-06-26 22:30:52','2024-06-26 22:30:52',13,71446),(65,'tv','/z01Dc0Ly2GmCpLe6Scx4d3dPP1S.jpg','2024-06-26 22:30:53','2024-06-26 22:30:53',15,71446),(66,'movie','/ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg','2024-06-26 22:42:32','2024-06-26 22:42:32',13,872585),(67,'tv','/8MaxftF69sEAAD5673vTjIl8yT3.jpg','2024-06-27 01:01:13','2024-06-27 01:01:13',NULL,94997),(68,'movie','/6BcxgP05jDip4Zjh2P5Be2aNi0Z.jpg','2024-06-27 01:02:17','2024-06-27 01:02:17',NULL,519182),(69,'movie','/6BcxgP05jDip4Zjh2P5Be2aNi0Z.jpg','2024-06-27 01:02:21','2024-06-27 01:02:21',NULL,519182),(72,'tv','/6bBgRoW5HniYbjIylWKLCJ5bVL6.jpg','2024-06-27 01:12:17','2024-06-27 01:12:17',NULL,1100),(73,'tv','/6bBgRoW5HniYbjIylWKLCJ5bVL6.jpg','2024-06-27 01:12:48','2024-06-27 01:12:48',NULL,1100),(74,'movie','/2PuAY3xSvbchQWqpSiXw08Yt0NP.jpg','2024-06-27 03:13:08','2024-06-27 03:13:08',13,1022789),(75,'movie','/2PuAY3xSvbchQWqpSiXw08Yt0NP.jpg','2024-06-27 03:13:09','2024-06-27 03:13:09',14,1022789),(76,'movie','/jTlIYjvS16XOpsfvYCTmtEHV10K.jpg','2024-06-27 03:13:41','2024-06-27 03:13:41',13,106646),(77,'tv','/95RVeMWMvk97PBW0msryIJC32XD.jpg','2024-06-27 03:41:32','2024-06-27 03:41:32',15,239526),(78,'tv','/95RVeMWMvk97PBW0msryIJC32XD.jpg','2024-06-27 03:41:33','2024-06-27 03:41:33',14,239526),(79,'movie','/2MHUit4H6OK5adcOjnCN6suCKOl.jpg','2024-06-27 12:57:09','2024-06-27 12:57:09',13,1374),(80,'movie','/2MHUit4H6OK5adcOjnCN6suCKOl.jpg','2024-06-27 12:57:10','2024-06-27 12:57:10',15,1374),(81,'movie','/6BcxgP05jDip4Zjh2P5Be2aNi0Z.jpg','2024-06-27 23:18:59','2024-06-27 23:18:59',NULL,519182),(83,'movie','/6BcxgP05jDip4Zjh2P5Be2aNi0Z.jpg','2024-06-27 23:19:07','2024-06-27 23:19:07',NULL,519182),(84,'movie','/6QR2FOCQr41gSduN70WulRIhJb7.jpg','2024-06-27 23:19:18','2024-06-27 23:19:18',NULL,748783),(85,'movie','/zcORJ8s9zsBjvKxP0k4FASQSjpf.jpg','2024-06-28 01:11:53','2024-06-28 01:11:53',15,9502),(86,'movie','/zcORJ8s9zsBjvKxP0k4FASQSjpf.jpg','2024-06-28 01:12:03','2024-06-28 01:12:03',13,9502);
/*!40000 ALTER TABLE `listitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lists` (
  `listId` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `listTypeId` int DEFAULT NULL,
  PRIMARY KEY (`listId`),
  KEY `userId` (`userId`),
  KEY `listTypeId` (`listTypeId`),
  CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lists_ibfk_2` FOREIGN KEY (`listTypeId`) REFERENCES `listtypes` (`listTypeId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (10,'2024-06-23 00:59:08','2024-06-23 00:59:08',6,1),(11,'2024-06-23 02:02:15','2024-06-23 02:02:15',6,2),(12,'2024-06-23 02:05:50','2024-06-23 02:05:50',6,3),(13,'2024-06-23 23:59:45','2024-06-23 23:59:45',3,1),(14,'2024-06-24 00:04:20','2024-06-24 00:04:20',3,2),(15,'2024-06-24 00:05:24','2024-06-24 00:05:24',3,3);
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listtypes`
--

DROP TABLE IF EXISTS `listtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listtypes` (
  `listTypeId` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`listTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listtypes`
--

LOCK TABLES `listtypes` WRITE;
/*!40000 ALTER TABLE `listtypes` DISABLE KEYS */;
INSERT INTO `listtypes` VALUES (1,'Favoritas','2024-06-11 20:50:42','2024-06-11 20:50:42'),(2,'Por ver','2024-06-11 20:50:42','2024-06-11 20:50:42'),(3,'Vistas','2024-06-11 20:50:42','2024-06-11 20:50:42');
/*!40000 ALTER TABLE `listtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'nicorozen123','nicorozen03@gmail.com','$2a$10$IstStO9D7rIhz81IsLz8/eXGpXQbgOaEFOiwxbW.XN9LJ.hHnu5Yu','2024-06-18 00:23:13','2024-06-28 00:11:33'),(6,'test','test@gmail.com','$2a$10$Hf5oqGwSKsz2ciz4DIpn2.mqYFu73Rdyk2zRGrrgOMXvvV2EdnKrW','2024-06-23 00:38:25','2024-06-23 00:38:25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-28 14:29:01
