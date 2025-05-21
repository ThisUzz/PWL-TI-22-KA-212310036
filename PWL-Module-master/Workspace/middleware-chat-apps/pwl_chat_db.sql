-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2024 at 02:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pwl_chat_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `messengers`
--

CREATE TABLE `messengers` (
  `id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `messages` text DEFAULT NULL,
  `to_user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messengers`
--

INSERT INTO `messengers` (`id`, `from_id`, `messages`, `to_user_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Hallooooo', 6, '2024-05-10 06:41:58', '2024-05-10 06:41:58'),
(2, 6, 'good morning', 1, '2024-05-27 04:19:11', '2024-05-27 04:19:11'),
(3, 6, 'how\'s your day ?', 1, '2024-05-27 04:21:29', '2024-05-27 04:21:29'),
(12, 6, 'i\'m so starving, life like in hell', 1, '2024-05-27 05:38:34', '2024-05-27 05:38:34'),
(16, 6, 'good evening', 2, '2024-05-27 10:55:45', '2024-05-27 10:55:45'),
(21, 6, 'jakarta is in full bloom, **** the weather is mild and breezy', 1, '2024-05-27 12:02:26', '2024-05-27 12:02:26');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240331091226-create-users.js'),
('20240331091937-create-messegers.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nip` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nip`, `fullname`, `createdAt`, `updatedAt`) VALUES
(1, 'septian.cahyadi', 'test123', '321654789', 'Septian Cahyadi', '2024-05-10 06:11:21', '2024-05-10 06:11:21'),
(2, 'jemi.arieswanto', 'test123', '123456', 'Jemi Arieswanto', '2024-05-10 06:11:44', '2024-05-10 06:11:44'),
(3, 'edi.kaprod', 'test123', '987654', 'Edi Kaprodi TI', '2024-05-10 06:12:10', '2024-05-10 06:12:10'),
(4, 'isnan.ajah', 'test123', '456132', 'Isnan Master MTK', '2024-05-10 06:12:31', '2024-05-10 06:12:31'),
(5, 'anton.sekprodi', 'test123', '321456', 'Anton Sekprodi TI', '2024-05-10 06:12:53', '2024-05-10 06:12:53'),
(6, 'febry.fairuz', 'test123', '4560255', 'Febry D Fairuz', '2024-05-10 06:22:10', '2024-05-10 06:22:10'),
(7, 'rizky.aditya', 'test123', '789123', 'Rizky Aditya', '2024-05-10 06:41:08', '2024-05-10 06:41:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messengers`
--
ALTER TABLE `messengers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from_id` (`from_id`),
  ADD KEY `to_user_id` (`to_user_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messengers`
--
ALTER TABLE `messengers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messengers`
--
ALTER TABLE `messengers`
  ADD CONSTRAINT `messengers_ibfk_1` FOREIGN KEY (`from_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `messengers_ibfk_2` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
