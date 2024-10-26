-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 26, 2024 at 08:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teman_top`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `poster` varchar(255) NOT NULL,
  `banner` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `poster`, `banner`, `title`, `createdAt`) VALUES
(3, '50-best-banner-ads-examples.jpg', '50-best-banner-ads-examples.jpg', 'ads1', '2024-09-13 03:08:22'),
(4, 'banner1.png', 'banner1.png', 'ads2', '2024-09-13 03:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(300) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `email`, `status`, `createdAt`) VALUES
(1, 'admin1', '$2b$10$pR5Skr7XmWEQc78gmTJ5AO5vxXGMEv0B7Iruz1mdLudX34HW6l2rO', 'admin1@gmail.com', 1, '2024-08-19 01:57:09');

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `bank_code` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`id`, `name`, `bank_code`, `created_at`, `updated_at`) VALUES
(1, 'Bank Central Asia', 'BCA', '2024-10-23 08:11:06', '2024-10-23 08:11:06'),
(2, 'Bank Mandiri', 'MANDIRI', '2024-10-23 08:11:06', '2024-10-23 08:11:06'),
(3, 'Bank Negara Indonesia', 'BNI', '2024-10-23 08:11:06', '2024-10-23 08:11:06'),
(4, 'Bank Rakyat Indonesia', 'BRI', '2024-10-23 08:11:06', '2024-10-23 08:11:06'),
(5, 'CIMB Niaga', 'CIMB', '2024-10-23 08:11:06', '2024-10-23 08:11:06'),
(7, 'Bank Ekonomi Sejahtra', 'SEA', '2024-10-24 07:27:56', '2024-10-24 07:32:33');

-- --------------------------------------------------------

--
-- Table structure for table `comment_session`
--

CREATE TABLE `comment_session` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `stream_sessionId` int(11) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `currency` varchar(300) DEFAULT NULL,
  `coindesk` varchar(300) DEFAULT NULL,
  `symbol` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `genre` int(11) DEFAULT NULL,
  `gameCode` varchar(300) DEFAULT NULL,
  `gameName` varchar(300) DEFAULT NULL,
  `gameLink` varchar(300) DEFAULT NULL,
  `gameImg` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `genre`, `gameCode`, `gameName`, `gameLink`, `gameImg`, `createdAt`) VALUES
(14, 4, '312', 'Duke Nukem', 'https://archive.org/embed/DukeNukem', 'DukeNukem.png', '2024-08-21 08:49:43'),
(15, 4, '4123', 'Apooge', 'https://archive.org/embed/RiseOfTheTriadDarkWar', 'apooge.png', '2024-08-21 09:08:36'),
(16, 1, '1', 'Tetris Puzzle', 'https://cdn.htmlgames.com/embed.js?game=TetrisPuzzle&amp;bgcolor=white', 'https://www.htmlgames.com/uploaded/game/thumb200/tetrispuzzle200.webp', '2024-08-10 02:42:10'),
(19, 4, '12d', 'Lucky Jackpot', 'https://demo.livegamesstream.com/play/12d', 'luckyjackpot.png', '2024-08-22 15:15:44'),
(20, 4, '1', 'live Game Stream', 'https://demo.livegamesstream.com/', 'lv.png', '2024-08-22 15:19:45'),
(21, 4, '36d', 'Colorful Balls', 'https://demo.livegamesstream.com/play/36d/', 'colorfullball.png', '2024-08-22 15:22:49'),
(22, 1, '123O', 'Flappy Bird', 'https://flappybird.io/', 'flappybird.png', '2024-09-02 04:37:18');

-- --------------------------------------------------------

--
-- Table structure for table `game_result`
--

CREATE TABLE `game_result` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `game_session` int(11) DEFAULT NULL,
  `duration` varchar(300) DEFAULT NULL,
  `total_transaction` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game_session`
--

CREATE TABLE `game_session` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `gameId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `genreName` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `genreName`, `createdAt`) VALUES
(4, 'Action', '2024-08-10 02:30:39'),
(6, 'Adventure', '2024-08-10 02:31:41'),
(7, 'Shooter', '2024-08-10 02:31:46');

-- --------------------------------------------------------

--
-- Table structure for table `gift`
--

CREATE TABLE `gift` (
  `id` int(11) NOT NULL,
  `img` varchar(300) DEFAULT NULL,
  `giftName` varchar(300) DEFAULT NULL,
  `giftLink` varchar(300) DEFAULT NULL,
  `price` decimal(15,6) DEFAULT 0.000000,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gift`
--

INSERT INTO `gift` (`id`, `img`, `giftName`, `giftLink`, `price`, `createdAt`) VALUES
(5, 'chicken.png', 'chicken', 'https://lottie.host/cd6efc08-0404-49f5-b1c8-4f09c924b171/EYyht8e6IU.json', 1000.000000, '2024-08-23 01:06:09'),
(6, 'hamster.png', 'hamster', 'https://lottie.host/b0b71b12-569a-43b9-a6ca-edc016e6535c/7wbtQlHlnn.json', 2000.000000, '2024-08-23 01:11:28'),
(8, 'lego.png', 'Lego', 'https://lottie.host/b41efdc2-5b12-479e-90ba-1b670b88a272/HA5Bkt10Pp.json', 25000.000000, '2024-09-13 03:05:00'),
(9, 'jupiter.png', 'planet', 'https://lottie.host/a39e47b8-def2-40a8-bf07-a9b85c8b8ee3/yas91MzHgT.json', 3000.000000, '2024-09-13 03:05:49');

-- --------------------------------------------------------

--
-- Table structure for table `gift_transaction`
--

CREATE TABLE `gift_transaction` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `receivedId` int(11) NOT NULL,
  `giftId` int(11) NOT NULL,
  `giftName` varchar(300) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gift_transaction`
--

INSERT INTO `gift_transaction` (`id`, `userId`, `receivedId`, `giftId`, `giftName`, `amount`, `description`, `createdAt`) VALUES
(45, 83, 84, 5, 'chicken', 100, 'payment for gift chicken ', '2024-09-12 12:40:42'),
(46, 83, 85, 5, 'chicken', 100, 'payment for gift chicken ', '2024-09-12 15:30:32'),
(47, 86, 85, 7, 'share', 400, 'payment for gift share ', '2024-09-12 15:33:55'),
(48, 86, 84, 9, 'planet', 300, 'payment for gift planet ', '2024-09-13 03:49:02'),
(49, 86, 85, 6, 'hamster', 200, 'payment for gift hamster ', '2024-09-13 03:49:12'),
(50, 86, 85, 9, 'planet', 300, 'payment for gift planet ', '2024-09-13 03:49:20'),
(51, 86, 85, 8, 'Lego', 250, 'payment for gift Lego ', '2024-09-13 03:49:31'),
(52, 86, 84, 9, 'planet', 300, 'payment for gift planet ', '2024-09-13 06:30:02'),
(53, 87, 85, 6, 'hamster', 200, 'payment for gift hamster ', '2024-09-13 07:28:11'),
(54, 87, 85, 5, 'chicken', 100, 'payment for gift chicken ', '2024-09-13 07:28:19'),
(55, 95, 84, 6, 'hamster', 200, 'payment for gift hamster ', '2024-09-18 07:18:05'),
(56, 95, 96, 6, 'hamster', 200, 'payment for gift hamster ', '2024-09-18 08:41:11'),
(57, 95, 96, 9, 'planet', 300, 'payment for gift planet ', '2024-09-18 08:49:59'),
(58, 95, 85, 5, 'chicken', 100, 'payment for gift chicken ', '2024-09-18 10:00:50'),
(59, 95, 84, 5, 'chicken', 100, 'payment for gift chicken ', '2024-09-18 15:22:39'),
(60, 95, 84, 6, 'hamster', 200, 'payment for gift hamster ', '2024-09-18 15:34:49'),
(61, 95, 84, 5, 'chicken', 100, 'payment for gift chicken ', '2024-09-18 15:50:49'),
(62, 97, 85, 6, 'hamster', 200, 'payment for gift hamster ', '2024-09-26 12:14:15'),
(63, 97, 85, 9, 'planet', 300, 'payment for gift planet ', '2024-09-26 14:52:37'),
(64, 97, 85, 6, 'hamster', 2000, 'payment for gift hamster ', '2024-09-26 14:58:14'),
(65, 97, 100, 9, 'planet', 3000, 'payment for gift planet ', '2024-09-26 15:59:57'),
(66, 97, 100, 6, 'hamster', 2000, 'payment for gift hamster ', '2024-10-01 03:02:13'),
(67, 97, 100, 9, 'planet', 3000, 'payment for gift planet ', '2024-10-01 03:02:21'),
(68, 103, 104, 5, 'chicken', 1000, 'payment for gift chicken ', '2024-10-01 05:00:30'),
(69, 97, 104, 8, 'Lego', 25000, 'payment for gift Lego ', '2024-10-01 13:18:22'),
(70, 97, 104, 9, 'planet', 3000, 'payment for gift planet ', '2024-10-01 13:18:31'),
(71, 97, 104, 6, 'hamster', 2000, 'payment for gift hamster ', '2024-10-01 13:18:33'),
(72, 97, 104, 8, 'Lego', 25000, 'payment for gift Lego ', '2024-10-01 13:19:30'),
(73, 97, 100, 9, 'planet', 3000, 'payment for gift planet ', '2024-10-03 04:40:30'),
(74, 97, 100, 6, 'hamster', 2000, 'payment for gift hamster ', '2024-10-03 04:40:39'),
(75, 97, 100, 8, 'Lego', 25000, 'payment for gift Lego ', '2024-10-03 04:40:46'),
(76, 97, 100, 5, 'chicken', 1000, 'payment for gift chicken ', '2024-10-03 04:40:47'),
(77, 97, 100, 9, 'planet', 3000, 'payment for gift planet ', '2024-10-03 04:41:08'),
(78, 97, 100, 8, 'Lego', 25000, 'payment for gift Lego ', '2024-10-03 04:41:11'),
(79, 97, 104, 5, 'chicken', 1000, 'payment for gift chicken ', '2024-10-03 06:05:06'),
(80, 97, 104, 8, 'Lego', 25000, 'payment for gift Lego ', '2024-10-04 14:51:16'),
(81, 0, 84, 0, '', 10000, 'Redeemed voucher PORT(07NJF2WA28GD)', '2024-10-11 09:25:50'),
(82, 0, 84, 0, '', 10000, 'Redeemed voucher PORT(07NJF2WA28GD)', '2024-10-11 09:30:06');

-- --------------------------------------------------------

--
-- Table structure for table `languange`
--

CREATE TABLE `languange` (
  `id` int(11) NOT NULL,
  `languageCode` varchar(300) DEFAULT NULL,
  `languageName` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_activity`
--

CREATE TABLE `log_activity` (
  `id` int(11) NOT NULL,
  `adminId` int(11) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merchant`
--

CREATE TABLE `merchant` (
  `id` int(11) NOT NULL,
  `giftName` varchar(300) DEFAULT NULL,
  `giftLink` varchar(300) DEFAULT NULL,
  `img` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `userId`, `title`, `message`, `is_read`, `createdAt`, `updatedAt`) VALUES
(1, 42, 'test', 'hihiiuh', 0, '2024-10-26 02:58:30', '2024-10-26 02:58:30'),
(2, 42, 'test2', 'hihiiuh', 0, '2024-10-26 02:58:37', '2024-10-26 02:58:37'),
(3, 42, 'test3', 'hihiiuh', 1, '2024-10-26 02:58:46', '2024-10-26 02:58:46');

-- --------------------------------------------------------

--
-- Table structure for table `request_stream`
--

CREATE TABLE `request_stream` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session_transaction`
--

CREATE TABLE `session_transaction` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `stream_sessionId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session_transaction`
--

INSERT INTO `session_transaction` (`id`, `userId`, `paid`, `amount`, `createdAt`, `stream_sessionId`, `description`) VALUES
(10, 97, 1, 5000.00, '2024-10-26 01:17:07', 364, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `streamer`
--

CREATE TABLE `streamer` (
  `id` int(11) NOT NULL,
  `email` varchar(300) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `username` varchar(300) DEFAULT NULL,
  `profilePicture` varchar(300) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `stream` int(11) DEFAULT NULL,
  `channelName` varchar(300) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stream_result`
--

CREATE TABLE `stream_result` (
  `id` int(11) NOT NULL,
  `stream_sessionId` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT 0,
  `total_view` int(11) DEFAULT NULL,
  `total_gift` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stream_result`
--

INSERT INTO `stream_result` (`id`, `stream_sessionId`, `duration`, `total_view`, `total_gift`, `createdAt`) VALUES
(326, 364, 51, 1, NULL, '2024-09-12 12:41:01'),
(327, 365, 17, 0, NULL, '2024-09-12 15:28:59'),
(328, 366, 327, 2, NULL, '2024-09-12 15:35:04'),
(329, 368, 373, 1, NULL, '2024-09-13 03:50:11'),
(330, 367, 4973, 2, NULL, '2024-09-13 04:35:27'),
(331, 369, 10, 1, NULL, '2024-09-13 04:35:42'),
(332, 370, 72, 1, NULL, '2024-09-13 04:37:03'),
(333, 371, 43, 1, NULL, '2024-09-13 04:58:58'),
(334, 372, 170, 1, NULL, '2024-09-13 05:02:48'),
(335, 373, 72, 1, NULL, '2024-09-13 06:30:44'),
(336, 374, 309, 2, NULL, '2024-09-13 07:29:21'),
(337, 375, 31, 0, NULL, '2024-09-18 08:30:41'),
(338, 376, 69, 0, NULL, '2024-09-18 08:39:16'),
(339, 377, 119, 0, NULL, '2024-09-18 08:41:27'),
(340, 378, 788, 0, NULL, '2024-09-18 08:58:05'),
(341, 379, 500, 0, NULL, '2024-09-18 09:31:17'),
(342, 380, 71, 0, NULL, '2024-09-18 09:32:49'),
(343, 381, 240, 0, NULL, '2024-09-18 09:44:52'),
(344, 382, 173, 0, NULL, '2024-09-18 09:55:50'),
(345, 383, 80, 0, NULL, '2024-09-18 09:57:36'),
(346, 384, 188, 0, NULL, '2024-09-18 10:01:02'),
(347, 373, 463918, 1, NULL, '2024-09-18 15:21:30'),
(348, 385, 72, 0, NULL, '2024-09-18 15:22:50'),
(349, 386, 77, 0, NULL, '2024-09-18 15:24:46'),
(350, 387, 41, 0, NULL, '2024-09-18 15:35:10'),
(351, 388, 15, 0, NULL, '2024-09-18 15:38:40'),
(352, 389, 91, 0, NULL, '2024-09-18 15:41:24'),
(353, 390, 611, 0, NULL, '2024-09-18 15:51:37'),
(354, 391, 62, 0, NULL, '2024-09-26 04:56:12'),
(355, 392, 40, 0, NULL, '2024-09-26 06:35:40'),
(356, 393, 33, 0, NULL, '2024-09-26 06:37:32'),
(357, 394, 41, 0, NULL, '2024-09-26 06:54:27'),
(358, 395, 47, 0, NULL, '2024-09-26 06:59:12'),
(359, 396, 441, 0, NULL, '2024-09-26 07:34:39'),
(360, 397, 407, 0, NULL, '2024-09-26 07:47:22'),
(361, 398, 37, 0, NULL, '2024-09-26 07:48:30'),
(362, 399, 23, 0, NULL, '2024-09-26 07:49:57'),
(363, 400, 12, 0, NULL, '2024-09-26 07:53:41'),
(364, 402, 31, 0, NULL, '2024-09-26 08:06:12'),
(365, 403, 25, 0, NULL, '2024-09-26 08:08:05'),
(366, 407, 19, 0, NULL, '2024-09-26 08:28:18'),
(367, 408, 28, 0, NULL, '2024-09-26 08:38:38'),
(368, 409, 16, 0, NULL, '2024-09-26 08:40:12'),
(369, 410, 52, 0, NULL, '2024-09-26 08:42:28'),
(370, 412, 38, 0, NULL, '2024-09-26 08:52:02'),
(371, 413, 63, 0, NULL, '2024-09-26 08:57:43'),
(372, 414, 30, 0, NULL, '2024-09-26 08:59:15'),
(373, 421, 5, 0, NULL, '2024-09-26 09:52:13'),
(374, 422, 63, 0, NULL, '2024-09-26 09:57:50'),
(375, 423, 5, 0, NULL, '2024-09-26 09:59:31'),
(376, 425, 49, 0, NULL, '2024-09-26 10:10:47'),
(377, 426, 19, 0, NULL, '2024-09-26 10:12:45'),
(378, 427, 198, 1, NULL, '2024-09-26 10:16:25'),
(379, 428, 320, 1, NULL, '2024-09-26 10:23:35'),
(380, 429, 210, 1, NULL, '2024-09-26 16:01:08'),
(381, 430, 115, 1, NULL, '2024-10-01 03:03:38'),
(382, 431, 105, 1, NULL, '2024-10-01 03:18:58'),
(383, 432, 15, 0, NULL, '2024-10-01 03:43:43'),
(384, 433, 7, 0, NULL, '2024-10-01 03:44:13'),
(385, 434, 6, 0, NULL, '2024-10-01 03:44:39'),
(386, 435, 7, 0, NULL, '2024-10-01 03:45:12'),
(387, 436, 427, 1, NULL, '2024-10-01 05:00:41'),
(388, 437, 10793, 2, NULL, '2024-10-01 08:01:36'),
(389, 438, 902, 1, NULL, '2024-10-01 08:16:40'),
(390, 439, 292, 0, NULL, '2024-10-01 08:21:33'),
(391, 440, 2252, 2, NULL, '2024-10-01 08:59:09'),
(392, 441, 5729, 0, NULL, '2024-10-01 10:34:41'),
(393, 442, 8, 0, NULL, '2024-10-01 10:44:41'),
(394, 443, 46, 0, NULL, '2024-10-01 10:47:44'),
(395, 444, 295, 2, NULL, '2024-10-01 10:53:22'),
(396, 445, 414, 1, NULL, '2024-10-01 13:22:00'),
(397, 446, 54, 1, NULL, '2024-10-02 09:27:55'),
(398, 447, 95, 0, NULL, '2024-10-02 09:45:18'),
(399, 448, 20, 0, NULL, '2024-10-02 23:24:44'),
(400, 449, 756, 1, NULL, '2024-10-03 04:51:23'),
(401, 450, 198, 1, NULL, '2024-10-03 06:05:29'),
(402, 451, 108, 1, NULL, '2024-10-04 14:51:55');

-- --------------------------------------------------------

--
-- Table structure for table `stream_session`
--

CREATE TABLE `stream_session` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `thumbnail` varchar(300) DEFAULT NULL,
  `title` varchar(300) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `duration` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stream_session`
--

INSERT INTO `stream_session` (`id`, `userId`, `thumbnail`, `title`, `status`, `token`, `createdAt`, `duration`) VALUES
(364, 84, 'avatardefault7.png', '', 1, ' ', '2024-09-12 12:40:10', 0),
(365, 85, 'avatardefault7.png', '', 0, ' ', '2024-09-12 15:28:42', 0),
(366, 85, 'avatardefault7.png', '', 0, ' ', '2024-09-12 15:29:37', 0),
(367, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-13 03:12:34', 0),
(368, 85, 'profilePicture-1726193433198-613101132-tob.png', '', 0, ' ', '2024-09-13 03:43:58', 0),
(369, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-13 04:35:32', 0),
(370, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-13 04:35:51', 0),
(371, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-13 04:58:15', 0),
(372, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-13 04:59:58', 0),
(373, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-13 06:29:32', 0),
(374, 85, 'profilePicture-1726212202770-226322645-tob.png', '', 0, ' ', '2024-09-13 07:24:12', 0),
(375, 96, 'avatardefault1.png', '', 0, ' ', '2024-09-18 08:30:10', 0),
(376, 96, 'avatardefault1.png', '', 0, ' ', '2024-09-18 08:38:07', 0),
(377, 96, 'avatardefault1.png', '', 0, ' ', '2024-09-18 08:39:28', 0),
(378, 96, 'avatardefault1.png', '', 0, ' ', '2024-09-18 08:44:57', 0),
(379, 96, 'avatardefault1.png', '', 0, ' ', '2024-09-18 09:22:57', 0),
(380, 96, 'avatardefault1.png', '', 0, ' ', '2024-09-18 09:31:38', 0),
(381, 85, 'profilePicture-1726212202770-226322645-tob.png', '', 0, ' ', '2024-09-18 09:40:52', 0),
(382, 85, 'profilePicture-1726652929135-212850002-tob.png', '', 0, ' ', '2024-09-18 09:52:57', 0),
(383, 85, 'profilePicture-1726652929135-212850002-tob.png', '', 0, ' ', '2024-09-18 09:56:16', 0),
(384, 85, 'profilePicture-1726652929135-212850002-tob.png', '', 0, ' ', '2024-09-18 09:57:54', 0),
(385, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-18 15:21:38', 0),
(386, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-18 15:23:29', 0),
(387, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-18 15:34:29', 0),
(388, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-18 15:38:25', 0),
(389, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-18 15:39:53', 0),
(390, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-18 15:41:26', 0),
(391, 85, 'profilePicture-1726652929135-212850002-tob.png', '', 0, ' ', '2024-09-26 04:55:10', 0),
(392, 85, 'profilePicture-1727332468912-856530433-ph.png', '', 0, ' ', '2024-09-26 06:35:00', 0),
(393, 85, 'profilePicture-1727332468912-856530433-ph.png', '', 0, ' ', '2024-09-26 06:36:59', 0),
(394, 85, 'profilePicture-1727332468912-856530433-ph.png', '', 0, ' ', '2024-09-26 06:53:46', 0),
(395, 85, 'profilePicture-1727332468912-856530433-ph.png', '', 0, ' ', '2024-09-26 06:58:25', 0),
(396, 85, 'profilePicture-1727335227884-202886100-game.png', '', 0, ' ', '2024-09-26 07:27:18', 0),
(397, 85, 'profilePicture-1727335227884-202886100-game.png', '', 0, ' ', '2024-09-26 07:40:35', 0),
(398, 85, 'profilePicture-1727335227884-202886100-game.png', '', 0, ' ', '2024-09-26 07:47:53', 0),
(399, 85, 'profilePicture-1727335227884-202886100-game.png', '', 0, ' ', '2024-09-26 07:49:34', 0),
(400, 85, 'profilePicture-1727335227884-202886100-game.png', '', 0, ' ', '2024-09-26 07:53:29', 0),
(401, 85, 'profilePicture-1727335227884-202886100-game.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IACMNxWd3tXdS5wBx0CrjcRhxCxQElqsP59kmsqKwPB2LgAAAAAnavUAEADi5BIso2T2ZgEAAQAzIfVm', '2024-09-26 07:54:11', 0),
(402, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-26 08:05:41', 0),
(403, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-26 08:07:40', 0),
(404, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IACN8jKWwh4vHRL6LSPhxpBu32D+vg7sWPRA6VdJBcbAdQAAAACxWvJ3EADrl/WN9mf2ZgEAAQCGJPVm', '2024-09-26 08:08:22', 0),
(405, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IACUcqjKQKVVDmFyMiR5P5fsEPhqBiWYh1AaKyVsZGMLFgAAAACxWvJ3EADrl/WNnmj2ZgEAAQAuJfVm', '2024-09-26 08:11:10', 0),
(406, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IADtMGAQyJlkGK89QkQRQ2Xnq0Ton5xFcJXFz1Cy+aP+1B2qCumxWvJ3EADrl/WNPmz2ZgEAAQDOKPVm', '2024-09-26 08:26:38', 0),
(407, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-26 08:27:59', 0),
(408, 101, 'avatardefault5.png', '', 0, ' ', '2024-09-26 08:38:10', 0),
(409, 101, 'avatardefault5.png', '', 0, ' ', '2024-09-26 08:39:56', 0),
(410, 102, 'avatardefault2.png', '', 0, ' ', '2024-09-26 08:41:36', 0),
(411, 102, 'avatardefault2.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IAAw7b0oBfiNHAKej5jWGIJzlRby+jdMGfpTg4bsiWJspgAAAADGMXnNEADn8L+0mHD2ZgEAAQAoLfVm', '2024-09-26 08:45:12', 0),
(412, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-26 08:51:24', 0),
(413, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-26 08:56:40', 0),
(414, 84, 'avatardefault7.png', '', 0, ' ', '2024-09-26 08:58:44', 0),
(415, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IAA90QiDjK87gGpcU2Qviq0qhKFYZq62+ZRieq9IAxTm0gAAAACxWvJ3EADn8L+0kXX2ZgEAAQAhMvVm', '2024-09-26 09:06:25', 0),
(416, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IAA/fkRmIj5WybV/8zyJGmTfrPf86w6XxsIjvq8Y6ZISWAAAAACxWvJ3EADn8L+0m3f2ZgEAAQArNPVm', '2024-09-26 09:15:07', 0),
(417, 101, 'avatardefault5.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IAD8ASb3noPk2js2WWL8fgTAOGRnKz2NpfrDh2BVX/Eh1AAAAAB8YHBUEADn8L+0LHj2ZgEAAQC8NPVm', '2024-09-26 09:17:32', 0),
(418, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IAAS+Y4aBlg9xEktzUxUh8NpiglWY6dOQPV1EvUgmEHZ1AAAAACxWvJ3EADn8L+0Bnr2ZgEAAQCWNvVm', '2024-09-26 09:25:26', 0),
(419, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IADLn4JBmnzFU9cSDpWjNGpIIbxULMLVqp+U/ym5BzdPzgAAAACxWvJ3EADn8L+0xXr2ZgEAAQBVN/Vm', '2024-09-26 09:28:37', 0),
(420, 84, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IACCf0pVEILRYrCTyN/5KUmDcTFaKdz36x4QYSoZcKMZgAAAAACxWvJ3EADn8L+0w3/2ZgEAAQBTPPVm', '2024-09-26 09:49:55', 0),
(421, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 09:52:08', 0),
(422, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 09:56:47', 0),
(423, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 09:59:26', 0),
(424, 100, 'avatardefault7.png', '', 0, '006490e5e40aa1341e8aecf54dd1f40b8b6IAAq3qd3sCXCdwSXJxp3hHawkPraBAA0LrqmsyPeBYU9NgAAAADqUHcjEAD1JZ2OCIT2ZgEAAQCYQPVm', '2024-09-26 10:08:08', 0),
(425, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 10:09:58', 0),
(426, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 10:12:26', 0),
(427, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 10:13:07', 0),
(428, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 10:18:15', 0),
(429, 100, 'avatardefault7.png', '', 0, ' ', '2024-09-26 15:57:38', 0),
(430, 100, 'avatardefault7.png', '', 0, ' ', '2024-10-01 03:01:42', 0),
(431, 100, 'avatardefault7.png', '', 0, ' ', '2024-10-01 03:17:13', 0),
(432, 105, 'avatardefault7.png', '', 0, ' ', '2024-10-01 03:43:28', 0),
(433, 100, 'avatardefault7.png', '', 0, ' ', '2024-10-01 03:44:06', 0),
(434, 106, 'avatardefault2.png', '', 0, ' ', '2024-10-01 03:44:33', 0),
(435, 107, 'avatardefault1.png', '', 0, ' ', '2024-10-01 03:45:05', 0),
(436, 104, 'avatardefault5.png', '', 0, ' ', '2024-10-01 04:53:34', 0),
(437, 104, 'avatardefault5.png', '', 0, ' ', '2024-10-01 05:01:43', 0),
(438, 104, 'avatardefault5.png', '', 0, ' ', '2024-10-01 08:01:38', 0),
(439, 104, 'avatardefault5.png', '', 0, ' ', '2024-10-01 08:16:41', 0),
(440, 104, 'avatardefault5.png', '', 0, ' ', '2024-10-01 08:21:37', 0),
(441, 104, 'avatardefault5.png', '', 0, ' ', '2024-10-01 08:59:12', 0),
(442, 104, 'avatardefault5.png', '', 0, ' ', '2024-10-01 10:44:33', 0),
(443, 104, 'profilePicture-1727779532361-598916709-IMG-20240922-WA0007.jpg', '', 0, ' ', '2024-10-01 10:46:58', 0),
(444, 104, 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', '', 0, ' ', '2024-10-01 10:48:27', 0),
(445, 104, 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', '', 0, ' ', '2024-10-01 13:15:06', 0),
(446, 104, 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', '', 0, ' ', '2024-10-02 09:27:01', 0),
(447, 104, 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', '', 0, ' ', '2024-10-02 09:43:43', 0),
(448, 104, 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', '', 0, ' ', '2024-10-02 23:24:24', 0),
(449, 100, 'avatardefault7.png', '', 0, ' ', '2024-10-03 04:38:47', 0),
(450, 104, 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', '', 0, ' ', '2024-10-03 06:02:11', 0),
(451, 104, 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', '', 0, ' ', '2024-10-04 14:50:07', 0);

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist`
--

CREATE TABLE `token_blacklist` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token_blacklist`
--

INSERT INTO `token_blacklist` (`id`, `token`, `user_id`, `createdAt`) VALUES
(77, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRaUU1yaGNqYy5nQW9EdGY2dTM3QmIuelVRUzM0TUR3a3o4VTlzenouemx6ZS90dlNLb3FCLiIsInVzZXJuYW1lIjoiYXJ5YUpveW8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxNTQ5NjE0NzgtMjYxMzg1Mzk2LUlNRy0yMDI0MDkwOS1XQTAwMDguanBnIiwic3RyZWFtIjoxLCJjaGFubmVsTmFtZSI6ImFyeWFKb3lvIiwiYmFsYW5jZSI6IjUwMC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6Mjg6MTEuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MX0sImlhdCI6MTcyNjE4OTQzMiwiZXhwIjoxNzI2Mjc1ODMyfQ.ireA9fjWJohCnsHCumpdMgZC0J1NqIBtnRiO3M1cyig', 85, '2024-09-13 01:46:44'),
(78, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODYsImVtYWlsIjoicGFlc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6bnVsbCwidXNlcm5hbWUiOiJwYWVzIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Mi5wbmciLCJzdHJlYW0iOjAsImNoYW5uZWxOYW1lIjoicGFlcyIsImJhbGFuY2UiOiIxMC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6MzM6MDEuMDAwWiIsInBsYXllcl9pZCI6Inp4Y3Zibm0iLCJvbmxpbmUiOjB9LCJpYXQiOjE3MjYxNTUxODEsImV4cCI6MTcyNjI0MTU4MX0.N7l7z5w0BXssxYsEqiYdupAnXxCVKTyNjL28r40T-Mc', 86, '2024-09-13 03:11:26'),
(79, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODcsImVtYWlsIjoibWFyY2VsaW5vQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGQ1aXRreDRWS1lscGh3UHB1YkhtZS5RVktGcFEzS3Vxb1lhdllEdWJLcTIzNEYwWkFyMnYyIiwidXNlcm5hbWUiOiJtYXJjZWxpbm8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTY4MTEwNjQtNjM1OTA2NTU2LTIwMjJUaW1uYXNHYXJ1ZGFMb2dvLnBuZyIsInN0cmVhbSI6MCwiY2hhbm5lbE5hbWUiOiJtYXJjZWxpbm8iLCJiYWxhbmNlIjoiNy4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTNUMDI6NTM6MzEuMDAwWiIsInBsYXllcl9pZCI6InN5SHNKNzBvIiwib25saW5lIjoxfSwiaWF0IjoxNzI2MTk3MTAxLCJleHAiOjE3MjYyODM1MDF9.1q-Z7nb-aqZLceGcpQEf9rQsPcDaVW786Ns0Hb4VOrE', 87, '2024-09-13 03:14:28'),
(80, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRaUU1yaGNqYy5nQW9EdGY2dTM3QmIuelVRUzM0TUR3a3o4VTlzenouemx6ZS90dlNLb3FCLiIsInVzZXJuYW1lIjoiYXJ5YUpveW8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxNTQ5NjE0NzgtMjYxMzg1Mzk2LUlNRy0yMDI0MDkwOS1XQTAwMDguanBnIiwic3RyZWFtIjoxLCJjaGFubmVsTmFtZSI6ImFyeWFKb3lvIiwiYmFsYW5jZSI6IjUwMC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6Mjg6MTEuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MH0sImlhdCI6MTcyNjE5MjIxMiwiZXhwIjoxNzI2Mjc4NjEyfQ.Uj_2eophJqkH7Jp8t1XoVnavbF_F9j8KEAVYOj0U8L0', 85, '2024-09-13 04:06:23'),
(81, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQxNklNdXB5ZWUvRWFhSFdkY0s1MmwueUFIaXczelE5UlJSb3h4bUhNN01Dd1p1YWdHaVJaMiIsInVzZXJuYW1lIjoiTWJha0F5dXNzaXMiLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTM0MzMxOTgtNjEzMTAxMTMyLXRvYi5wbmciLCJzdHJlYW0iOjEsImNoYW5uZWxOYW1lIjoiTWJha0F5dXNzaXMiLCJiYWxhbmNlIjoiMTI1MC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6Mjg6MTEuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MH0sImlhdCI6MTcyNjIwMDM5NiwiZXhwIjoxNzI2Mjg2Nzk2fQ.lnbC6cXvVrFq0Lsh2hN6mX1NSXiQYMzthQ9_6FYHfNI', 85, '2024-09-13 04:06:46'),
(82, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODYsImVtYWlsIjoicGFlc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6bnVsbCwidXNlcm5hbWUiOiJwYWVzIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Mi5wbmciLCJzdHJlYW0iOjAsImNoYW5uZWxOYW1lIjoicGFlcyIsImJhbGFuY2UiOiIxOTYxMC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6MzM6MDEuMDAwWiIsInBsYXllcl9pZCI6Inp4Y3Zibm0iLCJvbmxpbmUiOjB9LCJpYXQiOjE3MjYxOTc0NjMsImV4cCI6MTcyNjI4Mzg2M30.NZ3-yGfyODLTBDD6DEDfZqpuOpY3krbq1qhngsaWhrU', 86, '2024-09-13 04:32:48'),
(83, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODksImVtYWlsIjoiamF5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZSI6ImpheSIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIiwic3RyZWFtIjowLCJjaGFubmVsTmFtZSI6ImpheSIsImJhbGFuY2UiOiIwLjAwMDAwMCIsInN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyNC0wOS0xM1QwNDozNToxNi4wMDBaIiwicGxheWVyX2lkIjoiell4ZHJhZHoiLCJvbmxpbmUiOjB9LCJpYXQiOjE3MjYyMDIxMTYsImV4cCI6MTcyNjI4ODUxNn0.H8UPT4vfL1hljQ16hGwimrJw5eHbbiMKcltW7oEsfEg', 89, '2024-09-13 06:40:05'),
(84, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODksImVtYWlsIjoiamF5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZSI6ImpheSIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIiwic3RyZWFtIjowLCJjaGFubmVsTmFtZSI6ImpheSIsImJhbGFuY2UiOiIwLjAwMDAwMCIsInN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyNC0wOS0xM1QwNDozNToxNi4wMDBaIiwicGxheWVyX2lkIjoiell4ZHJhZHoiLCJvbmxpbmUiOjB9LCJpYXQiOjE3MjYyMDk2MTYsImV4cCI6MTcyNjI5NjAxNn0.D-mg2JsEAFpDXOAmzSKK0ls8GV_fXaFIwJYEknM9A08', 89, '2024-09-13 06:43:35'),
(85, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQxNklNdXB5ZWUvRWFhSFdkY0s1MmwueUFIaXczelE5UlJSb3h4bUhNN01Dd1p1YWdHaVJaMiIsInVzZXJuYW1lIjoiTWJha0F5dXNzaXMiLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTM0MzMxOTgtNjEzMTAxMTMyLXRvYi5wbmciLCJzdHJlYW0iOjEsImNoYW5uZWxOYW1lIjoiTWJha0F5dXNzaXMiLCJiYWxhbmNlIjoiMTI1MC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6Mjg6MTEuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MH0sImlhdCI6MTcyNjIwMDQzMywiZXhwIjoxNzI2Mjg2ODMzfQ.k8QMwz9C47rcgon0_L1dPH7821roHZBpyNObt66R3PU', 85, '2024-09-13 06:50:01'),
(86, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTEsImVtYWlsIjoibmFydXRvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEVCM0pKS0lKYUJ2dHFxZEVCUDRzc3VwaWZ5b3IvaDBNNmlnTzBtTndLNGI5SmkuRDFNaUZXIiwidXNlcm5hbWUiOiJuYXJ1dG8iLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQ1LnBuZyIsInN0cmVhbSI6MSwiY2hhbm5lbE5hbWUiOiJuYXJ1dG8iLCJiYWxhbmNlIjoiMC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTNUMDc6MDQ6MTcuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MH0sImlhdCI6MTcyNjIxMTA3NCwiZXhwIjoxNzI2Mjk3NDc0fQ.GciuWbKScGbAR0xlBosj4omKUE_6whhPwuOVQHwvANU', 91, '2024-09-13 07:05:49'),
(87, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ2QUxNejlIQ3lXQnJURThMQ2RKRXplTlhxRHVpV0piSm5GalRHeEVJLm5vYmFhclN5T3psMiIsInVzZXJuYW1lIjoiQXJ5YSIsInByb2ZpbGVQaWN0dXJlIjoicHJvZmlsZVBpY3R1cmUtMTcyNjIwOTIxMDI4Mi03NDgyMDU3Njgtc3BhY2UuanBnIiwic3RyZWFtIjoxLCJjaGFubmVsTmFtZSI6IkFyeWEiLCJiYWxhbmNlIjoiMTI1MC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6Mjg6MTEuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MH0sImlhdCI6MTcyNjIxMTIzMCwiZXhwIjoxNzI2Mjk3NjMwfQ.816grt5Wk3bov5cHKBhPHtn-oBDsU_XJnIe2pKrPQ94', 85, '2024-09-13 07:08:00'),
(88, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODksImVtYWlsIjoiamF5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZSI6ImpheSIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIiwic3RyZWFtIjowLCJjaGFubmVsTmFtZSI6ImpheSIsImJhbGFuY2UiOiIwLjAwMDAwMCIsInN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyNC0wOS0xM1QwNDozNToxNi4wMDBaIiwicGxheWVyX2lkIjoiell4ZHJhZHoiLCJvbmxpbmUiOjB9LCJpYXQiOjE3MjYyMTE0ODQsImV4cCI6MTcyNjI5Nzg4NH0.5lOBL0-loRehHWyCkxvaeVfARm6id9ukuoO3eaJSZ3w', 89, '2024-09-13 07:11:32'),
(89, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ2QUxNejlIQ3lXQnJURThMQ2RKRXplTlhxRHVpV0piSm5GalRHeEVJLm5vYmFhclN5T3psMiIsInVzZXJuYW1lIjoiQXJ5YSIsInByb2ZpbGVQaWN0dXJlIjoicHJvZmlsZVBpY3R1cmUtMTcyNjIwOTIxMDI4Mi03NDgyMDU3Njgtc3BhY2UuanBnIiwic3RyZWFtIjoxLCJjaGFubmVsTmFtZSI6IkFyeWEiLCJiYWxhbmNlIjoiMTI1MC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTJUMTU6Mjg6MTEuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MH0sImlhdCI6MTcyNjIxMjEzNywiZXhwIjoxNzI2Mjk4NTM3fQ.5JTmc2J6hPvlFOuW_eq0lzLKvpn2XeryZwvLN6SnXgg', 85, '2024-09-13 07:23:52'),
(90, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODcsImVtYWlsIjoibWFyY2VsaW5vQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGQ1aXRreDRWS1lscGh3UHB1YkhtZS5RVktGcFEzS3Vxb1lhdllEdWJLcTIzNEYwWkFyMnYyIiwidXNlcm5hbWUiOiJtYXJjZWxpbm8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTY4MTEwNjQtNjM1OTA2NTU2LTIwMjJUaW1uYXNHYXJ1ZGFMb2dvLnBuZyIsInN0cmVhbSI6MCwiY2hhbm5lbE5hbWUiOiJtYXJjZWxpbm8iLCJiYWxhbmNlIjoiNy4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMTNUMDI6NTM6MzEuMDAwWiIsInBsYXllcl9pZCI6InN5SHNKNzBvIiwib25saW5lIjowfSwiaWF0IjoxNzI2MTk3NDU0LCJleHAiOjE3MjYyODM4NTR9.tsER6MWquX6VEhoALcvfAslNBB6N0GE00XjPJXw7e3c', 87, '2024-09-13 08:56:29'),
(91, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTMsImVtYWlsIjoibXVseW9ub0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im11bHlvbm8iLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyIsImJhbGFuY2UiOiIwLjAwMDAwMCJ9LCJpYXQiOjE3MjY1Mzk0OTIsImV4cCI6MTcyNjYyNTg5Mn0.ryb8YhAIajGp3MUO55DzP-mo6ueb_QFKcRFAw-8naZo', 93, '2024-09-17 02:18:30'),
(92, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTMsImVtYWlsIjoibXVseW9ub0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im11bHlvbm8iLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyIsImJhbGFuY2UiOiIwLjAwMDAwMCJ9LCJpYXQiOjE3MjY1Mzk1MTQsImV4cCI6MTcyNjYyNTkxNH0.GWirsozEK-CYbotDBGnejnT38uBdKQiOUe2G-b-yU9w', 93, '2024-09-17 04:51:21'),
(93, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODcsImVtYWlsIjoibWFyY2VsaW5vQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibWFyY2VsaW5vIiwicGxheWVyX2lkIjoic3lIc0o3MG8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTY4MTEwNjQtNjM1OTA2NTU2LTIwMjJUaW1uYXNHYXJ1ZGFMb2dvLnBuZyIsImJhbGFuY2UiOiI5OTcwNy4wMDAwMDAifSwiaWF0IjoxNzI2NTM5NTkxLCJleHAiOjE3MjY2MjU5OTF9.hb5rYBOuaC3uyV0RpAt8ZHj_8N5VNs3afxoWokjDT8c', 87, '2024-09-17 04:52:38'),
(94, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODcsImVtYWlsIjoibWFyY2VsaW5vQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibWFyY2VsaW5vIiwicGxheWVyX2lkIjoic3lIc0o3MG8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTY4MTEwNjQtNjM1OTA2NTU2LTIwMjJUaW1uYXNHYXJ1ZGFMb2dvLnBuZyIsImJhbGFuY2UiOiI5OTcwNy4wMDAwMDAifSwiaWF0IjoxNzI2NTQ4ODA2LCJleHAiOjE3MjY2MzUyMDZ9.MMeibG58W8-1gx-k99IWxG8RREBbJkHJxd5qznRMZHU', 87, '2024-09-17 04:54:12'),
(95, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODgsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0My5wbmciLCJiYWxhbmNlIjoiNjM1MzI3NDIuOTgwMDAwIn0sImlhdCI6MTcyNjU1NDU4NCwiZXhwIjoxNzI2NjQwOTg0fQ.rkQLhYhMNIyvXC2kFVPGieFYoFrsX8TCIdb1Z7GlGno', 88, '2024-09-17 06:30:06'),
(96, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODgsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0My5wbmciLCJiYWxhbmNlIjoiNjM1MzI3NDIuOTgwMDAwIn0sImlhdCI6MTcyNjU1NDYxMCwiZXhwIjoxNzI2NjQxMDEwfQ.7bHv-JzoD8lHRigonQZc1ECYwFw4JqWgBle0ktoIui8', 88, '2024-09-17 06:34:27'),
(97, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODgsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0My5wbmciLCJiYWxhbmNlIjoiNjM1MzI3NDIuOTgwMDAwIn0sImlhdCI6MTcyNjU1NTI4MCwiZXhwIjoxNzI2NjQxNjgwfQ.Ytrpe1i82rzWvSsu2mQXSVUm1HpBKQVxWvjY6Xp7Usk', 88, '2024-09-17 06:42:43'),
(98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODgsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0My5wbmciLCJiYWxhbmNlIjoiNjM1MzI3NDIuOTgwMDAwIn0sImlhdCI6MTcyNjU1NTM2NiwiZXhwIjoxNzI2NjQxNzY2fQ.lONEgr534FwQ9WgNnYmrglQy1W1J_LMq3s5yu2YoZlQ', 88, '2024-09-17 06:45:07'),
(99, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODgsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0My5wbmciLCJiYWxhbmNlIjoiNjM1MzI3NDIuOTgifSwiaWF0IjoxNzI2NTU2NDUxLCJleHAiOjE3MjY2NDI4NTF9.IOJTNUqlOcaIW9v756awzKDf6jFP1VFVIAxgyBE_z2c', 88, '2024-09-17 07:01:30'),
(100, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODgsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0My5wbmciLCJiYWxhbmNlIjoiNjM1MzI3NDIuOTgifSwiaWF0IjoxNzI2NTU2NjI2LCJleHAiOjE3MjY2NDMwMjZ9.mu8VlGB76Dn8ap17wSH7kcxcT9XAA2J9UVeC__W3Law', 88, '2024-09-17 07:06:53'),
(101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTQsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ni5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU1ODQ0NCwiZXhwIjoxNzI2NjQ0ODQ0fQ._rCuxiY2sWto0b-raEPRUvyr4GnwSfzx93xL0JYr47Q', 94, '2024-09-17 07:34:44'),
(102, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTQsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ni5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU1ODY2NiwiZXhwIjoxNzI2NjQ1MDY2fQ.JlMCxAZMOVyKISeA71ve2M_Ym5pUG5XADyXRCYSIE8M', 94, '2024-09-17 07:38:11'),
(103, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU1ODcxNywiZXhwIjoxNzI2NjQ1MTE3fQ.9YWe5SR1MuZyXUsVIUL9770C36MB6Cq54kb_t5PHsws', 95, '2024-09-17 07:38:53'),
(104, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTMsImVtYWlsIjoibXVseW9ub0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im11bHlvbm8iLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyIsImJhbGFuY2UiOiIwLjAwMDAwMCJ9LCJpYXQiOjE3MjY1NjA1MTEsImV4cCI6MTcyNjY0NjkxMX0.uXGHOVc4mKQ0UB0IpDipxLIOVu0HFUm8pc7pknFF0j8', 93, '2024-09-17 08:08:50'),
(105, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU1ODc3OSwiZXhwIjoxNzI2NjQ1MTc5fQ.P8h8UvJFSX4Y6K0ZIbzwvIcg5_5Z6bGUxfPRJuNnLMM', 95, '2024-09-17 08:21:03'),
(106, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2MTI3OCwiZXhwIjoxNzI2NjQ3Njc4fQ.aR6C_4rIarkMezFWfITN9iLX-u87UQEn6Fmy5W0UnpU', 95, '2024-09-17 08:27:20'),
(107, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2MTY0NiwiZXhwIjoxNzI2NjQ4MDQ2fQ.4RrGRgN_QldHjg5ApDtG9bLvYmpJ8f31iG9f5mAvtGE', 95, '2024-09-17 08:48:43'),
(108, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2MjkyNywiZXhwIjoxNzI2NjQ5MzI3fQ.twwl0lYdrpfZwQsi1UWupGMVG0KMT6-b5HRuEtNKzMc', 95, '2024-09-17 09:26:54'),
(109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2NTIxOSwiZXhwIjoxNzI2NjUxNjE5fQ.UWAE3RoGTbNoHpnIz0vgUB8QpoR-R4DQP2HEkDTQ7RY', 95, '2024-09-17 09:32:03'),
(110, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2NTUyOCwiZXhwIjoxNzI2NjUxOTI4fQ.d-rZ5ngAsfuL8dmo-QfUkwSVaSfnrh_ocEV9cTZLbsk', 95, '2024-09-17 09:36:43'),
(111, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2NTgwNywiZXhwIjoxNzI2NjUyMjA3fQ.8mq4SFCT6GR6RWfzO8K4nsIDhWSYIqUMhB12LLjis4g', 95, '2024-09-17 09:39:52'),
(112, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2NTk5NywiZXhwIjoxNzI2NjUyMzk3fQ.Bv9xkCprH07i3ZANIhc_uZMYFZpuh0dIBnvsKHvQ06Y', 95, '2024-09-17 09:52:12'),
(113, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2NjczNywiZXhwIjoxNzI2NjUzMTM3fQ.53E2AduGTuACfvUSq7f8ivAy0rMWZMvSs5tTRDxM_Lg', 95, '2024-09-17 09:57:16'),
(114, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2NzA1MSwiZXhwIjoxNzI2NjUzNDUxfQ.ZgRLEYhzF1VTHv8FgkHHiTDSxJX5xy5AmmAy1y8v844', 95, '2024-09-17 10:02:20'),
(115, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjU2NzM0NSwiZXhwIjoxNzI2NjUzNzQ1fQ.0oFq18o6s04NTAcFumAtM3zVrvJATfCXQ-rmTZLUnDo', 95, '2024-09-17 10:04:07'),
(116, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjYzMjA4NiwiZXhwIjoxNzI2NzE4NDg2fQ.oi2XyPBgTv3v7NBo8ADvDN1UsRX5KMe20M3RB6HOaEg', 95, '2024-09-18 04:12:32'),
(117, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjYzMjc1NywiZXhwIjoxNzI2NzE5MTU3fQ.kss6bYjxSFvG_tNmczVAVwrIV98Hqk-4f-WbE-Yiw7Y', 95, '2024-09-18 05:39:17'),
(118, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjYzNzk5NSwiZXhwIjoxNzI2NzI0Mzk1fQ.eE7YO3U-mwDuOpMxtYTCppFV-hxJHXVhRVSaTgeCKgY', 95, '2024-09-18 05:42:22'),
(119, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjc0Mi45OH0sImlhdCI6MTcyNjYzODE0NiwiZXhwIjoxNzI2NzI0NTQ2fQ.23KW8kFdUEXv_CG7b2Zx14cMwK8Srt1eLHj31zsnDkg', 95, '2024-09-18 08:08:31'),
(120, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTYsImVtYWlsIjoiYWppQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJERrQkxKaWNLRmxMM09RZWJXM0ZpSnVTd3BhU2pQTTRqbmx1UTNxVlQwRUFkWGpsRElNUXlTIiwidXNlcm5hbWUiOiJhamkiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQxLnBuZyIsInN0cmVhbSI6MSwiY2hhbm5lbE5hbWUiOiJhamkiLCJiYWxhbmNlIjoiMC4wMDAwMDAiLCJzdGF0dXMiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMThUMDg6MjQ6MzcuMDAwWiIsInBsYXllcl9pZCI6IiIsIm9ubGluZSI6MSwiand0X3Rva2VuIjpudWxsLCJpc19sb2dnZWRfaW4iOjB9LCJpYXQiOjE3MjY2NDg2NzcsImV4cCI6MTcyNjczNTA3N30.rRWkzPwJryCONniXG-DMow9xhdNXey-5CEBXh98LUds', 96, '2024-09-18 09:32:55'),
(121, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMjU0Mi45OH0sImlhdCI6MTcyNjY0NjkzMSwiZXhwIjoxNzI2NzMzMzMxfQ.vsid4O-fIpAOWr0TDJyEUwqQt-azZlPT3I0MSBu2Q8k', 95, '2024-09-18 14:54:56'),
(122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTk0Mi45OH0sImlhdCI6MTcyNjY3MjA4NSwiZXhwIjoxNzI2NzU4NDg1fQ.cmGtkd6gIDCI3c27Mf4VS04PpE0tSFPVxRzRsGstYZU', 95, '2024-09-19 06:50:02'),
(123, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgxMzk3MywiZXhwIjoxNzI2OTAwMzczfQ.W0JM7fsRsel7rUYWHpde2y4i3zK5YGqQ6MaZERIXr7M', 95, '2024-09-20 06:33:29'),
(124, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgxNTc1MywiZXhwIjoxNzI2OTAyMTUzfQ.GcmVUSdsynOYklpKqxgpIqg8ThmmLKFvJHLIunivc00', 95, '2024-09-20 07:03:10'),
(125, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMDcyNywiZXhwIjoxNzI2OTA3MTI3fQ.E0a4QKhJhmK5ptv17YY3zT21j0w3l5-GltQyC11beGk', 95, '2024-09-20 08:33:25'),
(126, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMTIxMSwiZXhwIjoxNzI2OTA3NjExfQ.fNQ4ptjBUmsWkPD0t4vFbPuWdx75LX0ndZcF2elj4Nc', 95, '2024-09-20 08:33:54'),
(127, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMTIzNCwiZXhwIjoxNzI2OTA3NjM0fQ.08h1rHw-VMrSp20G4muB1B7BAty1_0CSGJeZra9dBpI', 95, '2024-09-20 08:34:19'),
(128, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMTI2MCwiZXhwIjoxNzI2OTA3NjYwfQ.xcLblGRcnPTiTaO36bf_a2xTdmt1meIIVUwykBqMsJo', 95, '2024-09-20 08:35:17'),
(129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMTMxNywiZXhwIjoxNzI2OTA3NzE3fQ.ZRzHeIobu_Ke7SgimR-jJOIsc1mbUKwguaaqlexOWac', 95, '2024-09-20 08:35:38'),
(130, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMTMzOCwiZXhwIjoxNzI2OTA3NzM4fQ.-cQG7MoM-fvAwdjkBezHvA7PFt-EUzdJjYgPaa4SCbk', 95, '2024-09-20 08:39:29'),
(131, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMTU2OSwiZXhwIjoxNzI2OTA3OTY5fQ.ToQENkiRQe_TLySZ1JXkHztNVlw9GRdRUOpMdRWBR7o', 95, '2024-09-20 08:51:37'),
(132, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMzA4OCwiZXhwIjoxNzI2OTA5NDg4fQ.2tesBS8HR14xzVVFiYBmlodX71eVzlON4Cl3412v7JA', 95, '2024-09-20 09:06:09'),
(133, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyMzY3OCwiZXhwIjoxNzI2OTEwMDc4fQ.sH_1yKktkEqnWQe4m_0KiJ_InMcmEnjPxjJHcydj4pI', 95, '2024-09-20 09:15:11'),
(134, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyNDA0OCwiZXhwIjoxNzI2OTEwNDQ4fQ.xOx8g6A9UdXj4pQLfmUPrQbfMpbtVhZNCszk40CSIcc', 95, '2024-09-20 09:21:35'),
(135, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyNDUwMSwiZXhwIjoxNzI2OTEwOTAxfQ.brsdI29y7lCezChawWOJgXRYTxYydVjgE0qIEya4gzk', 95, '2024-09-20 09:31:38'),
(136, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyNTMwOCwiZXhwIjoxNzI2OTExNzA4fQ.AG6yG-XX1Nc8GgjwTREfw1tV_bFCWn0-ZGds0jda9-U', 95, '2024-09-20 09:42:16'),
(137, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyNjk3MSwiZXhwIjoxNzI2OTEzMzcxfQ.Tc5pjGo1GDyyZIof_R0VvxWM4gViS0xvsOJsQvXC_ZI', 95, '2024-09-20 10:10:17'),
(138, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyNzEwMywiZXhwIjoxNzI2OTEzNTAzfQ.dFlHBFVhED0r5QQ-KD6T7Qqd1GwLm-TmAVWGl2-ByAE', 95, '2024-09-20 10:12:20'),
(139, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjgyNzI4NiwiZXhwIjoxNzI2OTEzNjg2fQ.sjB-6_TMOli2e5yKHLh8p1yD4lM7xbz_SFmbrJHvqYM', 95, '2024-09-20 10:15:06'),
(140, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjg0MDMwMCwiZXhwIjoxNzI2OTI2NzAwfQ.qi0V_s6JlMKFLGHM-63unQ1-FhzxPQ3GNf6DZvdUm6E', 95, '2024-09-20 13:51:41'),
(141, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjg0MDMwMiwiZXhwIjoxNzI2OTI2NzAyfQ.8BYzW6WnscrcX3NfWQIR9FJ5VrnJOQUkvIpsscLO4mQ', 95, '2024-09-20 13:51:44'),
(142, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjg0MDMwNSwiZXhwIjoxNzI2OTI2NzA1fQ.hUpwlLUtGZqJPx7vxdBSl6E81gk7OyHfYS-6RNlWwss', 95, '2024-09-20 13:51:45'),
(143, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjg0MDMwNSwiZXhwIjoxNzI2OTI2NzA1fQ.hUpwlLUtGZqJPx7vxdBSl6E81gk7OyHfYS-6RNlWwss', 95, '2024-09-20 13:51:46'),
(144, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo2MzUzMTU0Mi45OH0sImlhdCI6MTcyNjg0MDMwNywiZXhwIjoxNzI2OTI2NzA3fQ.nTsNRybVJPZKVSM9fj0uD0PoblYfKAqp_MH26fktvs4', 95, '2024-09-20 13:52:27'),
(145, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo1NzMyNzA0Mi45OH0sImlhdCI6MTcyNzExMTc0OSwiZXhwIjoxNzI3MTk4MTQ5fQ.qLEtcSI4XCJbYjf1D_-6GY5HJIdbLiuICEwzmMQSdGE', 95, '2024-09-23 17:15:50'),
(146, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo1NzMyNzA0Mi45OH0sImlhdCI6MTcyNzExMTc1MSwiZXhwIjoxNzI3MTk4MTUxfQ.phYQkAHBfai5_fQ_0Ed3wogUEHLsDceATLhFDhkfhxk', 95, '2024-09-23 17:15:53'),
(147, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo1NzMyNzA0Mi45OH0sImlhdCI6MTcyNzExMTc1MywiZXhwIjoxNzI3MTk4MTUzfQ.FXAiwH67SXHsnFEoesh72EzDAsQ52OicLfoZjagH1mU', 95, '2024-09-24 01:21:44'),
(148, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo1NzMyNzA0Mi45OH0sImlhdCI6MTcyNzE0MDkwNSwiZXhwIjoxNzI3MjI3MzA1fQ.f7v2XGSFFs-MS-R2KS73TeQWLpQyfLudZtt4Usn8ZaU', 95, '2024-09-24 01:21:57'),
(149, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTUsImVtYWlsIjoiZXN0ZXJjNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVzdGVyYzYiLCJwbGF5ZXJfaWQiOiI4ZHh3ODZ4dzZ1MDI3IiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0OS5wbmciLCJiYWxhbmNlIjo1NzMyNzA0Mi45OH0sImlhdCI6MTcyNzE0MDkxNywiZXhwIjoxNzI3MjI3MzE3fQ.2iSiaQiNLqhh0QUsolNFD8chC41zdbx3sRXLFWQxgmc', 95, '2024-09-24 01:32:53'),
(150, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODcsImVtYWlsIjoibWFyY2VsaW5vQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibWFyY2VsaW5vIiwicGxheWVyX2lkIjoic3lIc0o3MG8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTY4MTEwNjQtNjM1OTA2NTU2LTIwMjJUaW1uYXNHYXJ1ZGFMb2dvLnBuZyIsImJhbGFuY2UiOiI5OTcwNy4wMDAwMDAifSwiaWF0IjoxNzI3MzIyMTc2LCJleHAiOjE3Mjc0MDg1NzZ9._LF_rmPtos4bJx_bJKiIzbDvVJTWupMKNNMipGxMf0Y', 87, '2024-09-26 04:52:01'),
(151, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmciLCJiYWxhbmNlIjoiMC4wMDAwMDAifSwiaWF0IjoxNzI3MzMzMjkxLCJleHAiOjE3Mjc0MTk2OTF9.dppV0Qhugkf6wiVa2emgWDJhJ5gcurzf7Xjxl5SYxX4', 97, '2024-09-26 06:50:13'),
(152, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODcsImVtYWlsIjoibWFyY2VsaW5vQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibWFyY2VsaW5vIiwicGxheWVyX2lkIjoic3lIc0o3MG8iLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjYxOTY4MTEwNjQtNjM1OTA2NTU2LTIwMjJUaW1uYXNHYXJ1ZGFMb2dvLnBuZyIsImJhbGFuY2UiOiI5OTcwNy4wMDAwMDAifSwiaWF0IjoxNzI3MzI2OTUwLCJleHAiOjE3Mjc0MTMzNTB9.0HZsDFL94gW8zecJxkbMZZWWIJXjYGTmHbpprPLeblE', 87, '2024-09-26 07:12:37'),
(153, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzMzNDEzLCJleHAiOjE3Mjc0MTk4MTN9.uzW-IXA3uNgqJ92p4-ODnCY9z06X7xkmmyOLjpliGsA', 97, '2024-09-26 07:14:18'),
(154, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzM0ODcxLCJleHAiOjE3Mjc0MjEyNzF9.uDAiFbBCzyvYtjrtHhMYS9Qsm-78HFHtS1kvxmbwdcM', 97, '2024-09-26 07:14:34'),
(155, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTgsImVtYWlsIjoiamFtZXRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJqYW1ldCIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDYucG5nIn0sImlhdCI6MTcyNzMzNDkxNCwiZXhwIjoxNzI3NDIxMzE0fQ.4q-Y-VZR2PBJTT1Dx-zTFT5t5y17h-nw8UoRmFj3T9o', 98, '2024-09-26 07:16:13'),
(156, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik5hcnV0b_CfppZzIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI3MzM1MjI3ODg0LTIwMjg4NjEwMC1nYW1lLnBuZyJ9LCJpYXQiOjE3MjczMzcyMDIsImV4cCI6MTcyNzQyMzYwMn0.3TAdtxFX_U9IgebzMVm1dlGsKdB5h4IQwBFOj8h-VX8', 85, '2024-09-26 08:00:47'),
(157, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik5hcnV0b_CfppZzIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI3MzM1MjI3ODg0LTIwMjg4NjEwMC1nYW1lLnBuZyJ9LCJpYXQiOjE3MjczMzc2NDcsImV4cCI6MTcyNzQyNDA0N30.0tM9JH6DUR6ltV9l58NqemmNMtz4YYiftXdVkXfZVtk', 85, '2024-09-26 08:02:35'),
(158, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzM3OTMyLCJleHAiOjE3Mjc0MjQzMzJ9.m-3YtfIGH73SzScHPsDX_U2fRvHE3oC_FRFcq0R4MTE', 84, '2024-09-26 08:10:11'),
(159, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzM1Nzc5LCJleHAiOjE3Mjc0MjIxNzl9.9fXZOkfvbuCYhqy9aSGS-ceKjQZf7zOgF6y9zm_T2vw', 97, '2024-09-26 08:17:10'),
(160, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTgsImVtYWlsIjoiamFtZXRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJyYXNlbmdnYW4iLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6InByb2ZpbGVQaWN0dXJlLTE3MjczMzQ5Njg1MTgtNDQ5NjEyNTUxLUdyb3VwLnBuZyJ9LCJpYXQiOjE3MjczMzQ5NzksImV4cCI6MTcyNzQyMTM3OX0._SAIXRtDFScIVKKWojDxyrPVaVQ_K-ffwbmCJpuuKdM', 98, '2024-09-26 08:27:00'),
(161, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzM4MjExLCJleHAiOjE3Mjc0MjQ2MTF9.w0nFIGEu4xVB2fZa-VPhVOK7g0S6oxtX8mJNoS8ta3s', 84, '2024-09-26 08:28:22'),
(162, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAxLCJlbWFpbCI6ImtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia28iLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQ1LnBuZyJ9LCJpYXQiOjE3MjczMzk2NDksImV4cCI6MTcyNzQyNjA0OX0.2Sm759kTHi0xf2R8w0SfcYzLo4RRIvRw4_eyGc8LGMM', 101, '2024-09-26 08:34:15'),
(163, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzM4NjMwLCJleHAiOjE3Mjc0MjUwMzB9.0tNsLd7lGticfhCkDw8awK_QeEcCJIGHrxddjSs-PLI', 97, '2024-09-26 08:38:59'),
(164, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAxLCJlbWFpbCI6ImtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia28iLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQ1LnBuZyJ9LCJpYXQiOjE3MjczMzk4NzQsImV4cCI6MTcyNzQyNjI3NH0.T8g6XwfLB_0nThh1OiSZau2mwt28qZElmwGmBD15wu8', 101, '2024-09-26 08:40:26'),
(165, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzM5OTM5LCJleHAiOjE3Mjc0MjYzMzl9.dzp9OhVos3tsqFPzcs5cc5W5j8oNLpeR_IZNI_40sIQ', 97, '2024-09-26 08:40:55'),
(166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAyLCJlbWFpbCI6Im5hcnV0bzIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibmFydXRvc3NzIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Mi5wbmcifSwiaWF0IjoxNzI3MzQwMDkxLCJleHAiOjE3Mjc0MjY0OTF9.5jWzUL8OF03bQxb4JOu1yxKf7WwItKrEVnUPQ-YrNbE', 102, '2024-09-26 08:45:05'),
(167, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQwMzAzLCJleHAiOjE3Mjc0MjY3MDN9._fOYvpLv55H84mrKOZOjeng0zlDmFI6MGX6XQ3-s080', 97, '2024-09-26 08:45:14'),
(168, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQwMzk2LCJleHAiOjE3Mjc0MjY3OTZ9.HZkW2soHqHUj95YHjPWyL_8BrpWlmiLJ8MGpPryMLwA', 97, '2024-09-26 08:46:37'),
(169, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQwMzk3LCJleHAiOjE3Mjc0MjY3OTd9.avgl1Y_SSrulxzYc4zv5NY41LaR9MK1t0giqteED7lY', 97, '2024-09-26 08:46:38'),
(170, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQwMzk4LCJleHAiOjE3Mjc0MjY3OTh9.-vWAP4Y3KzZEiXQ6HB3-ZQa1evj4EwyNTwd5e7yu3YQ', 97, '2024-09-26 08:46:40'),
(171, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQwNDAwLCJleHAiOjE3Mjc0MjY4MDB9.D90DVDc4sfmPssnAU9ebz3gCIR2_w1AIJ_D3F39k-NA', 97, '2024-09-26 08:46:47'),
(172, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQwNDIxLCJleHAiOjE3Mjc0MjY4MjF9.9My30i7abuU9eKtZPjJBBb--T6do4uad0bYKX9UOIrc', 97, '2024-09-26 08:47:01'),
(173, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQwNjczLCJleHAiOjE3Mjc0MjcwNzN9.DKxYroM_Jz5w3C4zbuM9Qq479r5MaikVvQb-gqdUPGg', 84, '2024-09-26 08:56:34'),
(174, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQwNDIxLCJleHAiOjE3Mjc0MjY4MjF9.9My30i7abuU9eKtZPjJBBb--T6do4uad0bYKX9UOIrc', 97, '2024-09-26 08:58:21'),
(175, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQxMTAxLCJleHAiOjE3Mjc0Mjc1MDF9.KIUSNWzWIUPOvS0ydUzy7vGvehczLuJ8wRVFtr8HXjk', 97, '2024-09-26 08:58:47'),
(176, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQxMTI3LCJleHAiOjE3Mjc0Mjc1Mjd9.IE9cA1_XH7teMzgnbuJvV4N21BwT6FLwOEm3C6Wmwk8', 97, '2024-09-26 09:00:09'),
(177, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQwOTk0LCJleHAiOjE3Mjc0MjczOTR9.-9k26-9n49InDroHENgM8lSKVzf444R3JDzZUKQUlt0', 84, '2024-09-26 09:00:29'),
(178, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQxMjA5LCJleHAiOjE3Mjc0Mjc2MDl9.q5C_oOgLv3IAHXAxaOWV9KsKom3EwWZnu0Ah3T0ZbN0', 97, '2024-09-26 09:02:59'),
(179, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQxMzc5LCJleHAiOjE3Mjc0Mjc3Nzl9.guCDodN2afEKtcCN-ohrW6FjtBPZQZj72I5PViUvviI', 97, '2024-09-26 09:03:34'),
(180, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQxNDE0LCJleHAiOjE3Mjc0Mjc4MTR9.wRSQGdv1QvT0LlrRl6_dsA42BHEPTIGwa0lRcP9uoD8', 97, '2024-09-26 09:06:04'),
(181, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQxMjI5LCJleHAiOjE3Mjc0Mjc2Mjl9.hotqx63RKYZhihK5hOlIBuFs63aukVm_TB2GwTfeUnc', 84, '2024-09-26 09:06:15'),
(182, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQxNTc1LCJleHAiOjE3Mjc0Mjc5NzV9.qymP0FlizwaHMOCChP81cqimGbz5iCuAtXvfnMdXXuY', 84, '2024-09-26 09:08:31'),
(183, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQxNzExLCJleHAiOjE3Mjc0MjgxMTF9.SnTzEGzCrYVIy8Da5ltI54VecAw0ybg_8MTluattAro', 84, '2024-09-26 09:14:46'),
(184, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQyMDg2LCJleHAiOjE3Mjc0Mjg0ODZ9.xi6NV-LYVIFLolitlGK_BbHmTa6AaF5HnaPRgoYsIcA', 84, '2024-09-26 09:16:49'),
(185, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQxOTA2LCJleHAiOjE3Mjc0MjgzMDZ9.kH5k8-kufxzFSrmsvo1MSaeGyuZFtKzjFHNHTnhlF7I', 97, '2024-09-26 09:22:11'),
(186, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQyNjg3LCJleHAiOjE3Mjc0MjkwODd9.1qAdcMVa1020ynFQizynQrdEyVg4JNfnSfh8b0mwGhs', 84, '2024-09-26 09:27:43'),
(187, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQyODYzLCJleHAiOjE3Mjc0MjkyNjN9.yTbLwtft-XEkgs8tL6IBtbSyHVjw_n_NYM2uBWtDkNU', 84, '2024-09-26 09:31:00'),
(188, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQyNTMxLCJleHAiOjE3Mjc0Mjg5MzF9.HQ-NVNE6lANxuavcwFQ2OnR8km7565fYQxucdRtSC94', 97, '2024-09-26 09:32:10'),
(189, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQzMTMwLCJleHAiOjE3Mjc0Mjk1MzB9.0fuXkulVFJXl1uO-r9kBamR-CIfeUvyZ4HaEa11t2QA', 97, '2024-09-26 09:32:13'),
(190, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQzMDYwLCJleHAiOjE3Mjc0Mjk0NjB9.-zm1kTPBsRxqYLpZ8v--cX9pqb_fjK8vApAR74tPAGk', 84, '2024-09-26 09:32:56'),
(191, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQzMzc1LCJleHAiOjE3Mjc0Mjk3NzV9.sdc9FOdgkna_MiWlByghDdtfKsD4IthQERAjo33wJ-M', 97, '2024-09-26 09:36:19'),
(192, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzM0MzQ1MSwiZXhwIjoxNzI3NDI5ODUxfQ.sgwXhGvzdUfOiIWka8_GUQ_i-kmuaYuxirHcGns8Ddk', 100, '2024-09-26 09:37:34'),
(193, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik5hcnV0b_CfppZzYXNkIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI3MzM1MjI3ODg0LTIwMjg4NjEwMC1nYW1lLnBuZyJ9LCJpYXQiOjE3MjczNDM2NTYsImV4cCI6MTcyNzQzMDA1Nn0.RlLa6Bg0wMv3qIBFBfj4yqHl-DS86Hjm13kkSHJXv14', 85, '2024-09-26 09:43:37'),
(194, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzM0NDA1MCwiZXhwIjoxNzI3NDMwNDUwfQ.rln6Z9xNXRNxVT4mj7WInvxf_xRcZ1GCz_Fi2HduSAo', 100, '2024-09-26 09:49:15'),
(195, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI3MzQzMTc2LCJleHAiOjE3Mjc0Mjk1NzZ9.52PG-S7OtbdJrrfH-E5EVOUfTriHHb8QTWMIQp9V3zE', 84, '2024-09-26 09:49:41'),
(196, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzM0NDE1NSwiZXhwIjoxNzI3NDMwNTU1fQ.uwGzF1WWBDbGTFrVMzzUsA6I_l9t2V1jrT-TbPHaXCo', 100, '2024-09-26 09:51:55'),
(197, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzM0NDMxNSwiZXhwIjoxNzI3NDMwNzE1fQ.H58TfcIX2pqJyMFZ3Yl9fmz0r7I4tSYOK5b2SFLJN_E', 100, '2024-09-26 10:07:25'),
(198, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzM0NTI2NiwiZXhwIjoxNzI3NDMxNjY2fQ.JZHsEcDBf3CIKWrC_xKjZSZQBXWiB2B3YdJ8j2Db1EQ', 100, '2024-09-26 10:08:41'),
(199, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAzLCJlbWFpbCI6ImNvbm55QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY29ubnkiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyJ9LCJpYXQiOjE3MjczNDM1NDIsImV4cCI6MTcyNzQyOTk0Mn0.VZaigRa_bznU6VCskvSdzTEq97zTHszFz-yUzUtzNTg', 103, '2024-09-26 10:10:02'),
(200, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAzLCJlbWFpbCI6ImNvbm55QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY29ubnkiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyJ9LCJpYXQiOjE3MjczNDU0MDIsImV4cCI6MTcyNzQzMTgwMn0.5cA6V5ENwjGz9Rdb--bttg0NSW73rYWuHaPUeUeri7k', 103, '2024-09-26 10:10:51'),
(201, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAzLCJlbWFpbCI6ImNvbm55QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY29ubnkiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyJ9LCJpYXQiOjE3MjczNDU0NTEsImV4cCI6MTcyNzQzMTg1MX0.MDi3G6sXQVkrtt5QKxw8rWIwEEEf3zvsdnzc04YNcXw', 103, '2024-09-26 10:13:35'),
(202, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAzLCJlbWFpbCI6ImNvbm55QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY29ubnkiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyJ9LCJpYXQiOjE3MjczNDU2MTUsImV4cCI6MTcyNzQzMjAxNX0.BBQmh0_4oVHGnGWnF9fLaKfvBKGabYspp7--CMBoaaM', 103, '2024-09-26 10:14:57'),
(203, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQ1NzA4LCJleHAiOjE3Mjc0MzIxMDh9.e6OgDuJ0Hgx1uIHD7y95MiBT-OHWA11fhO8n5h8pmas', 97, '2024-09-26 10:17:39'),
(204, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQ1ODY4LCJleHAiOjE3Mjc0MzIyNjh9.rv7wSZlGMt28rTrRcYtc51lxa_foTZHcKsod4bG9Dvs', 97, '2024-09-26 10:18:06'),
(205, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQ1ODg2LCJleHAiOjE3Mjc0MzIyODZ9.NDw3o7WCExcyNIVE730bc2SlMKa_mLxlhlQbn6n9mBE', 97, '2024-09-26 10:18:18'),
(206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQ1ODk4LCJleHAiOjE3Mjc0MzIyOTh9.tOD0elB-I4p02D6unXBXHyk8aoAsMyQqZ4HPWtIQHcY', 97, '2024-09-26 10:20:11'),
(207, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQ2MDExLCJleHAiOjE3Mjc0MzI0MTF9.l1os4MqNyShnJoJRSnvFKtWLYSQqINDzFnLwgOWGrIk', 97, '2024-09-26 10:22:20'),
(208, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQ2MTQwLCJleHAiOjE3Mjc0MzI1NDB9.0HtSazTG59TFSrXE24XQ9a0q0L3FkajVAWIn6oxWEEo', 97, '2024-09-26 10:24:43');
INSERT INTO `token_blacklist` (`id`, `token`, `user_id`, `createdAt`) VALUES
(209, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzM0NTMzMywiZXhwIjoxNzI3NDMxNzMzfQ.aLzwbSC2BhrkP_7ylId6etX7qtwluroWRiGc1zowImw', 100, '2024-09-26 10:29:37'),
(210, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTksImVtYWlsIjoia2lsbHVhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia2lsbHVhIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0MS5wbmcifSwiaWF0IjoxNzI3MzQxMzMyLCJleHAiOjE3Mjc0Mjc3MzJ9.7BtYhg6xNEF_QcpmzvOdPCLZ4X5aSp4u94UmPr8Rmu0', 99, '2024-09-26 10:34:03'),
(211, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTksImVtYWlsIjoia2lsbHVhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia2lsbHVhIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0MS5wbmcifSwiaWF0IjoxNzI3MzQ2ODQzLCJleHAiOjE3Mjc0MzMyNDN9.yKX9pA9DUpeDCW-6PHLi0GBp411wUxuhPYV-A8pV6YQ', 99, '2024-09-26 10:56:03'),
(212, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzQ2MjgzLCJleHAiOjE3Mjc0MzI2ODN9.KAQEmjzt1t1ewDvkA6k6wgIs43UCUbVzCSGJDYhIKmo', 97, '2024-09-26 12:12:58'),
(213, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzUyNzc4LCJleHAiOjE3Mjc0MzkxNzh9._p9en8pPMOUM8DA90bSTQxk62ZdcA8m7Q0jpZmf0hBU', 97, '2024-09-26 12:25:03'),
(214, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzUzNTAzLCJleHAiOjE3Mjc0Mzk5MDN9.-zCUmGQIKTko9kjpA14ItgjJ3C9i501-sGqLg0vz89I', 97, '2024-09-26 12:44:38'),
(215, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzU0Njc4LCJleHAiOjE3Mjc0NDEwNzh9.eQgKF7bcnjCVRjqT5NAD96g9mtniRJEeoUlzIqSr0ko', 97, '2024-09-26 12:50:48'),
(216, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzU1MDQ4LCJleHAiOjE3Mjc0NDE0NDh9.fAXLj601moO4wW-PEDTXMREfL5Dj5miixLz0uprUfX4', 97, '2024-09-26 13:53:09'),
(217, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzU4Nzg5LCJleHAiOjE3Mjc0NDUxODl9.umyThGTjiE11IiQELz-UoHNEU1FjV6IYjTMqElpDCAY', 97, '2024-09-26 14:02:05'),
(218, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzU5MzMxLCJleHAiOjE3Mjc0NDU3MzF9.myiKes12Tq_UJByRCBL4ZMtWsB2giZWlud8b7-XekyI', 97, '2024-09-26 14:11:33'),
(219, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzU5ODkzLCJleHAiOjE3Mjc0NDYyOTN9.17gnUibOYoXpvOFJbGNHzOSgEo4v5h58iDCFaniePIY', 97, '2024-09-26 14:16:26'),
(220, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzYwMTg2LCJleHAiOjE3Mjc0NDY1ODZ9.gEoVjJ25SwWtLLVlBnj3qybtMNLHLBtOMEJxE_nly2U', 97, '2024-09-26 14:58:00'),
(221, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzYyNjgwLCJleHAiOjE3Mjc0NDkwODB9.nsF2R5GVmLnpXWQQQjY_Mbay2YGY6ZB-t6O65h2x7sg', 97, '2024-09-26 15:05:54'),
(222, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzYzMTU0LCJleHAiOjE3Mjc0NDk1NTR9.v-Ok6z-WNWDdoSb8J4R2sBQEaPzwif42wvAaL77TGRU', 97, '2024-09-26 15:58:58'),
(223, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzY2MzM4LCJleHAiOjE3Mjc0NTI3Mzh9.4QG2Dfvst0yiILuHs5IN8VsQJ9mhEkPukCILh3agTzk', 97, '2024-09-26 16:04:00'),
(224, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3MzY2NjQwLCJleHAiOjE3Mjc0NTMwNDB9.nSRr5BOYUZRhZ-Tf6_Fb9tPnsyXZfviynRLa-f6V7yI', 97, '2024-09-27 00:19:19'),
(225, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3NzUxMjI2LCJleHAiOjE3Mjc4Mzc2MjZ9.DSEj14BjQDK4_AmUUk9mP71aTfDGIBYV0jZJ2JZq5ZY', 97, '2024-10-01 03:00:14'),
(226, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3NzUxNjE0LCJleHAiOjE3Mjc4MzgwMTR9.DSy_TQwKyTDH_nxhN9xu4rMse3TXyyhJMkar5qr881g', 97, '2024-10-01 03:00:44'),
(227, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3NzUxNzE4LCJleHAiOjE3Mjc4MzgxMTh9.OrZVUefn3AA8mRbrqB1aW6CU91gXxmxRERwDHyZxcdY', 97, '2024-10-01 03:02:34'),
(228, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzc1MTY1OCwiZXhwIjoxNzI3ODM4MDU4fQ.bJux2dhgfHiKF4ZUST1CtUaLudJWQF0ITWcttT-5fZs', 100, '2024-10-01 03:17:04'),
(229, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3NzUyNjU4LCJleHAiOjE3Mjc4MzkwNTh9.CS_US39kCYorKn7Ya7YyUHlYDq3CCoO5eS2Ko-QBTyM', 97, '2024-10-01 03:18:49'),
(230, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA0LCJlbWFpbCI6Im1pa2FlbGFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtaWthZWxhIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3NzU0MTc1LCJleHAiOjE3Mjc4NDA1NzV9.tZdtNkEOqIjnzhMPhw5nE99R0ZfmuqxUiYIkdFyoS4k', 104, '2024-10-01 03:43:02'),
(231, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA1LCJlbWFpbCI6ImtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia28iLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQ3LnBuZyJ9LCJpYXQiOjE3Mjc3NTQxOTcsImV4cCI6MTcyNzg0MDU5N30.aY5kBURCcMiMuqwSZ94bR9ojgkGnjPYWzIHpb2c4Lvw', 105, '2024-10-01 03:43:46'),
(232, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzc1MjYyNCwiZXhwIjoxNzI3ODM5MDI0fQ.CWFT3ZzpQbXghMOkRBqNyKJSPIGZyeGdWVBEqYbb1DQ', 100, '2024-10-01 03:43:59'),
(233, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzc1NDIzOSwiZXhwIjoxNzI3ODQwNjM5fQ.nBqKUhyV1lsTRfloJpJvUUMEn2UguT_DlZUmeLpN1rY', 100, '2024-10-01 03:44:15'),
(234, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA2LCJlbWFpbCI6InJ1c21hbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJ1c21hbiIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDIucG5nIn0sImlhdCI6MTcyNzc1NDI2NywiZXhwIjoxNzI3ODQwNjY3fQ.0dtqAiwDAza__NdQiSIdXQxdbxACxUyAH-x-xXggcBo', 106, '2024-10-01 03:44:41'),
(235, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA3LCJlbWFpbCI6Imtlbm55QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia2VubnkiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQxLnBuZyJ9LCJpYXQiOjE3Mjc3NTQyOTUsImV4cCI6MTcyNzg0MDY5NX0.GeO1Bq-yX0oT6ap3R-Ryjh8CLDtrXLtQ3fLJsc6ZcUM', 107, '2024-10-01 03:45:14'),
(236, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA4LCJlbWFpbCI6ImpheUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImpheSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzc1NDU5MCwiZXhwIjoxNzI3ODQwOTkwfQ.B7YZmWaG01Q-sttvEzESqT5ZrO2_MWD7m-vCIkd71Ug', 108, '2024-10-01 03:50:12'),
(237, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAzLCJlbWFpbCI6ImNvbm55QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY29ubnkiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyJ9LCJpYXQiOjE3Mjc3NTQ2MzUsImV4cCI6MTcyNzg0MTAzNX0.Ohvjaj8exAL5Hev09dAu4rqDvtTRMtWh0uSLlkMb6hM', 103, '2024-10-01 03:50:56'),
(238, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA5LCJlbWFpbCI6ImFraWxhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWtpbGEiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQzLnBuZyJ9LCJpYXQiOjE3Mjc3NTQ3MDYsImV4cCI6MTcyNzg0MTEwNn0.VXNBH436g3w7Dnek31khsp3RPgB4XfUZ3Gm_oLonO8A', 109, '2024-10-01 03:54:47'),
(239, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAzLCJlbWFpbCI6ImNvbm55QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY29ubnkiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQyLnBuZyJ9LCJpYXQiOjE3Mjc3NTg3MDMsImV4cCI6MTcyNzg0NTEwM30.mCTHmq02KE3rsvUS52KycCGpO39xv4i_oSF2m07o_r0', 103, '2024-10-01 08:16:33'),
(240, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA5LCJlbWFpbCI6ImFraWxhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWtpbGEiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQzLnBuZyJ9LCJpYXQiOjE3Mjc3Njk1OTMsImV4cCI6MTcyNzg1NTk5M30.vonMAGVUYj4KbNpaK3YuJXwldqvJwJng0prMtnqv2LY', 109, '2024-10-01 08:17:17'),
(241, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3NzcyODAyLCJleHAiOjE3Mjc4NTkyMDJ9.iRQ0YEPDolNeED_S0qusnD6qGALcLaKcnJTuNhY8SQw', 97, '2024-10-01 08:56:19'),
(242, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA5LCJlbWFpbCI6ImFraWxhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWtpbGEiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQzLnBuZyJ9LCJpYXQiOjE3Mjc3Nzk1OTYsImV4cCI6MTcyNzg2NTk5Nn0.0ww4QYqQbYrHhEFfojgK9K_Bm7-_5Pq9WVz4TwdukYw', 109, '2024-10-01 10:46:47'),
(243, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA5LCJlbWFpbCI6ImFraWxhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWtpbGEiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQzLnBuZyJ9LCJpYXQiOjE3Mjc3Nzk2MDcsImV4cCI6MTcyNzg2NjAwN30.hl74rgyznbGj9JKrFcl8y1utYVJQ-KVZhsotirz-CXs', 109, '2024-10-01 10:48:40'),
(244, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3Nzg3ODAxLCJleHAiOjE3Mjc4NzQyMDF9.AZt-8fKgm_314dsoDhrLScWgRBZY9BRhmtmqMhmxH_w', 97, '2024-10-01 13:07:05'),
(245, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3Nzg4MDQ0LCJleHAiOjE3Mjc4NzQ0NDR9.7_m3MzWXs0RVrbTXPT6112XnYxMCiw2XDq--45pD6Do', 97, '2024-10-01 14:16:31'),
(246, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3Nzk0MTcyLCJleHAiOjE3Mjc4ODA1NzJ9._Wo8zHALsdoa0UUY38oDrsts0hWKgvEkS1fl30LW6o8', 97, '2024-10-01 15:07:41'),
(247, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3ODM5ODAzLCJleHAiOjE3Mjc5MjYyMDN9.9Gp7IGnuep7UbUzVn9WgfMo3C2LTA915WToHQpyAbcU', 97, '2024-10-03 01:22:37'),
(248, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3OTE4NTU3LCJleHAiOjE3MjgwMDQ5NTd9.03iBB6CW1_kN4iIazGL8pqOlfgmXFnPGEUibGMhKx-g', 97, '2024-10-03 04:34:54'),
(249, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3OTMwMDk0LCJleHAiOjE3MjgwMTY0OTR9.kYEMEe382yeUoeQrsjTBrIBU2Gxa8B3rPBdjUFgZGbA', 97, '2024-10-03 04:37:07'),
(250, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3OTMwMjI3LCJleHAiOjE3MjgwMTY2Mjd9.DGdvfaSdlF-FEaFOMTVcpV-UeSLZcFqTs4fGP2TUtTY', 97, '2024-10-03 04:37:59'),
(251, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzkzMDI4MywiZXhwIjoxNzI4MDE2NjgzfQ.gIZWfBNl0FaHynkx9xdRwlC7DsAupXfg7Jg4su-lTrQ', 100, '2024-10-03 04:38:40'),
(252, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3OTMwMjc5LCJleHAiOjE3MjgwMTY2Nzl9.JKlE0cdHh388gIWkWze1Da0UVjIy4NLX0_xx65iXC9w', 97, '2024-10-03 04:39:05'),
(253, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAwLCJlbWFpbCI6ImxhYnVidUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxhYnVidSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzkzMDMyMCwiZXhwIjoxNzI4MDE2NzIwfQ.v-OXUqE1MxwoCQErZZY05WVKQEjw1AmJxqS0usGv0Wk', 100, '2024-10-03 04:51:28'),
(254, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3OTMwMzQ1LCJleHAiOjE3MjgwMTY3NDV9.D164pltQ3S9SxIh7B0AAL1z37l3YLWP7h602bE3OaTg', 97, '2024-10-03 06:04:05'),
(255, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3OTM1NDQ1LCJleHAiOjE3MjgwMjE4NDV9.-sQundrGRMY4-j39saSVV65A5coGZ1WSEO4lsrnft6k', 97, '2024-10-03 09:38:21'),
(256, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI3OTQ4MzAxLCJleHAiOjE3MjgwMzQ3MDF9.dk-hBf389tKxBpqv9CbF8yztXFJRygxYXnrZCd89UYo', 97, '2024-10-04 08:29:46'),
(257, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI4MDMwNTg2LCJleHAiOjE3MjgxMTY5ODZ9.iwGASiW8wsx1w95Y9ewb2xz_TAhMKpkuHQ5FP3rYMGI', 97, '2024-10-04 09:35:17'),
(258, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI4MDM2MzMyLCJleHAiOjE3MjgxMjI3MzJ9.OYX9cqr85CsS8KUG9RTBjYJksmQvtpPtkG0ZvwL_SPE', 97, '2024-10-04 10:09:35'),
(259, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI4MDUzNDUzLCJleHAiOjE3MjgxMzk4NTN9.X-KeTgaeIwQUY7ufhAdA9eLgt7pLBFk7PTi8Y2IenNE', 97, '2024-10-04 14:51:43'),
(260, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI4NjMyNjQyLCJleHAiOjE3Mjg3MTkwNDJ9.S_ratjlU5fzToIlcSDHF1EtYG5phSnDofxPlrhGPLT8', 84, '2024-10-11 09:20:07'),
(261, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI5ODM4MjM1LCJleHAiOjE3Mjk5MjQ2MzV9.CW_6Xj_Yovg9kXe1QpkWLCwbSHugTlm4VfkmBWiN6ec', 97, '2024-10-25 06:37:35'),
(262, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI5ODM4MjU1LCJleHAiOjE3Mjk5MjQ2NTV9.71mvTOu35hvDU0VPB2BptMhBIMjbcNf0MovDZYfh2JA', 97, '2024-10-25 06:38:14'),
(263, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI5ODM4Mjk0LCJleHAiOjE3Mjk5MjQ2OTR9.gtK69bMp49xtt5NYjeGQGMOiNob5t8Zt2Y-gJPwqJkE', 97, '2024-10-25 06:41:53'),
(264, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0NS5wbmcifSwiaWF0IjoxNzI5ODM4NTEzLCJleHAiOjE3Mjk5MjQ5MTN9.yljIeCYttYsjXbz_w3Z0inHYsFew-IzakSaDI5rJ1Vk', 97, '2024-10-25 09:44:34'),
(265, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5ODQ5NDc0LCJleHAiOjE3Mjk5MzU4NzR9.o2cTV_RnIkMjDaCbGmfzjGUijYd95vjn6oQl8HbaOi4', 97, '2024-10-26 03:44:59'),
(266, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTE0MzAwLCJleHAiOjE3MzAwMDA3MDB9.qyEEDP2W7VCh5YqRqn0_fzBaqON1yGG9TqBzWKELnq0', 97, '2024-10-26 04:06:01'),
(267, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTE1NTYxLCJleHAiOjE3MzAwMDE5NjF9.sQMCTtwR_sYjXpnEEFRQEb4zRv8RnQAzlX0Dx_Cm_-M', 97, '2024-10-26 04:22:05'),
(268, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTE2NTI1LCJleHAiOjE3MzAwMDI5MjV9.otUNuhdd7DaqZbS0UNDPv-L1atfg6GUj_E2U2JtvfzI', 97, '2024-10-26 04:38:49'),
(269, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTE3NTI5LCJleHAiOjE3MzAwMDM5Mjl9.tLZfjvUUZLugWXr7C8a2Oik7WTwUUZlgu1b94v18grs', 97, '2024-10-26 04:57:46'),
(270, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTE4NjY2LCJleHAiOjE3MzAwMDUwNjZ9.jY8ftmHs3Lgv1vyX6R7CbjY3whvFsC7buHx3cNhDEFw', 97, '2024-10-26 04:59:00'),
(271, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTE4NzQwLCJleHAiOjE3MzAwMDUxNDB9.sH7evnrQxSvA29FE0-oXS0cnurxzKYogINWZSMJSxAY', 97, '2024-10-26 05:00:56'),
(272, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTE4ODU2LCJleHAiOjE3MzAwMDUyNTZ9.PmOOajz0rjlmYuGoR7-vO654GBCfEgn1VBtJ047_qUc', 97, '2024-10-26 06:18:31');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `transactionType` enum('session_transaction','gift_transaction','withdraw_transaction') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `transactionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `userId`, `transactionType`, `createdAt`, `transactionId`) VALUES
(1, 97, 'gift_transaction', '2024-10-26 01:15:58', 62),
(2, 97, 'session_transaction', '2024-10-26 01:18:41', 10),
(3, 97, 'withdraw_transaction', '2024-10-26 01:24:21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(300) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `username` varchar(300) DEFAULT NULL,
  `profilePicture` varchar(300) DEFAULT NULL,
  `stream` int(11) DEFAULT 0,
  `channelName` varchar(300) DEFAULT NULL,
  `balance` decimal(15,6) DEFAULT 0.000000,
  `status` int(11) DEFAULT 1,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `player_id` varchar(300) NOT NULL,
  `online` tinyint(1) DEFAULT 0,
  `jwt_token` text DEFAULT NULL,
  `is_logged_in` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `username`, `profilePicture`, `stream`, `channelName`, `balance`, `status`, `createdAt`, `player_id`, `online`, `jwt_token`, `is_logged_in`) VALUES
(84, 'rae@gmail.com', '$2b$10$lRZqWkImbIoDiR452CB09.SB71RLkPaZRwE8p9sWMOuZOLgmRzbfG', 'rae', 'avatardefault7.png', 1, 'rae', 120000.000000, 1, '2024-09-12 12:39:51', 'asdf12', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODQsImVtYWlsIjoicmFlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmFlIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Ny5wbmcifSwiaWF0IjoxNzI5NzQyMTI1LCJleHAiOjE3Mjk4Mjg1MjV9.3ATeFXylaxseE3gLuB0lw0ycjJs8FtRsbprufehH8sg', 1),
(85, 'arya@gmail.com', '$2b$10$Dpk/GUmGZnWBnCgNj5/XWeU3sbJVUAV3nST339q.mAGX6iIGBXWza', 'Naruto🦖sasd', 'profilePicture-1727335227884-202886100-game.png', 1, 'Naruto🦖sasd', 4150.000000, 1, '2024-09-12 15:28:11', '123ws', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6ODUsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik5hcnV0b_CfppZzYXNkIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI3MzM1MjI3ODg0LTIwMjg4NjEwMC1nYW1lLnBuZyJ9LCJpYXQiOjE3MjczNDM4MTcsImV4cCI6MTcyNzQzMDIxN30.NihiSrXVZNLCsvJ076bhQaMTWFU6_Ol3-FvuwNAWNhk', 1),
(86, 'paes@gmail.com', NULL, 'paes', 'avatardefault2.png', 0, 'paes', 18260.000000, 1, '2024-09-12 15:33:01', 'zxcvbnm', 1, NULL, 0),
(91, 'naruto@gmail.com', '$2b$10$EB3JJKIJaBvtqqdEBP4ssupifyor/h0M6igO0mNwK4b9Ji.D1MiFW', 'naruto', 'avatardefault5.png', 1, 'naruto', 0.000000, 1, '2024-09-13 07:04:17', '', 0, NULL, 0),
(92, 'adzkiyameysa387@gmail.com', '$2b$10$FXFZGfjmpQF1G0QqeXmZGeTSpo48gmLLGtVB78UU6RIw/f5/fnEEO', 'azazelia', 'avatardefault5.png', 0, 'azazelia', 0.000000, 1, '2024-09-13 07:39:45', '', 1, NULL, 0),
(93, 'mulyono@gmail.com', '$2a$10$1BKradJ.AgR9P5hXJZkTVuSxljsfFsrIOSQqwzgQMetjk3ChqUPZq', 'mulyono', 'avatardefault2.png', 0, 'mulyono', 0.000000, 1, '2024-09-17 02:18:02', '', 0, NULL, 0),
(95, 'esterc6@gmail.com', NULL, 'esterc6', 'avatardefault9.png', 0, 'esterc6', 57327042.980000, 1, '2024-09-17 07:38:37', '8dxw86xw6u027', 0, NULL, 0),
(96, 'aji@gmail.com', '$2a$10$DkBLJicKFlL3OQebW3FiJuSwpaSjPM4jnluQ3qVT0EAdXjlDIMQyS', 'aji', 'avatardefault1.png', 1, 'aji', 500.000000, 1, '2024-09-18 08:24:37', '', 0, NULL, 0),
(97, 'gon@gmail.com', '$2a$10$YCEQO595dfklZyNUR3kLDeijtfKHLyBu5HNDhFgL2pS7yaqeZV3zy', 'gon', 'profilePicture-1729849148699-761385498-Logo_(2).png', 0, 'gon', 5000.000000, 1, '2024-09-26 06:48:08', '', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6OTcsImVtYWlsIjoiZ29uQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZ29uIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI5ODQ5MTQ4Njk5LTc2MTM4NTQ5OC1Mb2dvXygyKS5wbmcifSwiaWF0IjoxNzI5OTIzNTExLCJleHAiOjE3MzAwMDk5MTF9.uykqjenZ_ggiq0_UhE9VAr-XBbbX9CazEQCKc_gZRBk', 1),
(99, 'killua@gmail.com', '$2a$10$wQKDemKlE34icaMTvk4bHeJ8xuhJlPOc/nHzdv10mpgMzs9MZmThe', 'killua', 'avatardefault1.png', 1, 'killua', 0.000000, 1, '2024-09-26 08:04:18', '', 0, NULL, 0),
(100, 'labubu@gmail.com', '$2a$10$6zd14w5QuzTw4GxXXKOTP.wTCZ0d2j/HntQ0rx.J/gz3zcgXbu.FW', 'labubu', 'avatardefault7.png', 1, 'labubu', 67000.000000, 1, '2024-09-26 08:29:49', '', 0, NULL, 0),
(102, 'naruto23@gmail.com', '$2a$10$P8aVKV1Z1Y3hAhGkI0vMEuiacNZrNEddZEFnpGrKGl8/JwKSPAKEK', 'narutosss', 'avatardefault2.png', 1, 'narutosss', 0.000000, 1, '2024-09-26 08:41:03', '', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTAyLCJlbWFpbCI6Im5hcnV0bzIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibmFydXRvc3NzIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJhdmF0YXJkZWZhdWx0Mi5wbmcifSwiaWF0IjoxNzI3MzQwMzA1LCJleHAiOjE3Mjc0MjY3MDV9.wYYJbYXIgGxLKddY5cnbrT9Y6ahjgL-iX-Bue4qF9jo', 1),
(103, 'conny@gmail.com', '$2a$10$RCN4oxq1ljAbHd6YgeKHSOiNo6wA6RgCOyahRrzkimMzWNRleLTjy', 'conny', 'avatardefault2.png', 0, 'conny', 199000.000000, 1, '2024-09-26 09:38:57', '', 0, NULL, 0),
(104, 'mikaela@gmail.com', '$2a$10$7t5e0KGm11k/frLB1aDFd.EJOfpsTQCjvNa5wjsOcJi0l.I9wxm3O', 'mikaela', 'profilePicture-1727779702610-297805501-IMG-20241001-WA0002.jpg', 1, 'mikaela', 82000.000000, 1, '2024-10-01 03:27:17', '', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA0LCJlbWFpbCI6Im1pa2FlbGFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtaWthZWxhIiwicGxheWVyX2lkIjoiIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWxlUGljdHVyZS0xNzI3Nzc5NzAyNjEwLTI5NzgwNTUwMS1JTUctMjAyNDEwMDEtV0EwMDAyLmpwZyJ9LCJpYXQiOjE3MjgwNTM0MDQsImV4cCI6MTcyODEzOTgwNH0.-aNmlyZGYU9ULxly7WCpl0HG9GsdOKkdwJ23Rbe5vFc', 1),
(105, 'ko@gmail.com', '$2a$10$IS8JA9IEcV9yeoSBKpzps.b2YiH/0MPDWXDfxUTZ2ACnDpNMoEX3K', 'ko', 'avatardefault7.png', 1, 'ko', 0.000000, 1, '2024-10-01 03:29:42', '', 0, NULL, 0),
(106, 'rusman@gmail.com', '$2a$10$612rdEFjyRvVSQOCflmwFu6HLJU9JQ8N0GyT5xLB2eof5yDgPwdd6', 'rusman', 'avatardefault2.png', 1, 'rusman', 0.000000, 1, '2024-10-01 03:30:37', '', 0, NULL, 0),
(107, 'kenny@gmail.com', '$2a$10$rnlB.vhxFo7AiGBBoh3jP.mgdUDZzjzPdNpTzDAREYWDqzD/VNPcq', 'kenny', 'avatardefault1.png', 1, 'kenny', 0.000000, 1, '2024-10-01 03:32:07', '', 0, NULL, 0),
(108, 'jay@gmail.com', '$2a$10$0uNldHmDRNtVEI4lNuiwee7zAmTchv.L9pFa1tCe0GnnvraT2eKqK', 'jay', 'avatardefault7.png', 0, 'jay', 0.000000, 1, '2024-10-01 03:49:42', '', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA4LCJlbWFpbCI6ImpheUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImpheSIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDcucG5nIn0sImlhdCI6MTcyNzc3OTkyNiwiZXhwIjoxNzI3ODY2MzI2fQ.QyMXSMDTLiKo48JTImDZbJg5Vwq0P1ueyrL43QqYUQI', 1),
(109, 'akila@gmail.com', '$2a$10$OpFX9nWmw0YhExAwvHbaxOW6ALKWnqnkansgU3WoghxVB9uSFKQxK', 'akila', 'avatardefault3.png', 0, 'akila', 0.000000, 1, '2024-10-01 03:51:34', '', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTA5LCJlbWFpbCI6ImFraWxhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWtpbGEiLCJwbGF5ZXJfaWQiOiIiLCJwcm9maWxlUGljdHVyZSI6ImF2YXRhcmRlZmF1bHQzLnBuZyJ9LCJpYXQiOjE3Mjc3Nzk3MjAsImV4cCI6MTcyNzg2NjEyMH0.SBLKzULykNGF_ip4fV0rDqGq7GYDGbnYrXPjDOnFEus', 1),
(110, 'ibot13@gmail.com', '$2a$10$.NMzixE0DtgIbugdZ61p6uR2/RjFkz8/95ItTnYdzJufgJuRfeYre', 'ibot13', 'avatardefault3.png', 0, 'ibot13', 0.000000, 1, '2024-10-01 03:55:04', '', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MTEwLCJlbWFpbCI6Imlib3QxM0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imlib3QxMyIsInBsYXllcl9pZCI6IiIsInByb2ZpbGVQaWN0dXJlIjoiYXZhdGFyZGVmYXVsdDMucG5nIn0sImlhdCI6MTcyNzc1NDkxMSwiZXhwIjoxNzI3ODQxMzExfQ.qqIJzkUFDa2qQhE5WXUeRtEkOfR66og27RXFgDso87E', 1),
(111, '', '$2a$10$ZEH0qfxCgd4gOX5i.rawXehTlfpHR8vdGzK/ZNhxDiYv8lWhTRigu', 'admin1', '', 1, NULL, 0.000000, 1, '2024-10-01 10:39:10', '', 0, NULL, 0),
(112, 'admin2@gmail.com', '$2a$10$lTNhu8u8X7MPO3BukON5ruxfe8Xt1j9/5OB/cShUFisX0zV8mi3li', 'admin2', NULL, 0, NULL, 0.000000, 1, '2024-10-11 10:49:35', '', 0, NULL, 0),
(113, 'admin2@gmail.com', '$2a$10$zCblLV/Rr1SgPSe6Geb67eEfJzuOPdLiS7p3sPC9ukuIFNlaTEEya', 'admin2', NULL, 0, NULL, 0.000000, 1, '2024-10-11 10:49:36', '', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `usertest`
--

CREATE TABLE `usertest` (
  `id` int(11) NOT NULL,
  `username` varchar(300) DEFAULT NULL,
  `balance` decimal(15,6) DEFAULT 0.000000,
  `player_id` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertest`
--

INSERT INTO `usertest` (`id`, `username`, `balance`, `player_id`, `createdAt`, `email`, `password`) VALUES
(9, 'rara', 99800.000000, 'qwerty ', '2024-09-12 10:36:51', NULL, NULL),
(10, 'paes', 18260.000000, 'zxcvbnm', '2024-09-12 15:32:11', NULL, NULL),
(11, 'rungkad', 0.000000, 'BUEInSqO', '2024-09-12 16:51:51', 'rungkad@gmail.com', '$2b$10$NsBOPBgQoKwwdXBxCd8o0.yOwO29xY1KGWwzQP4uXorg08uaWsdJ2'),
(12, 'marcelino', 99707.000000, 'syHsJ70o', '2024-09-13 02:23:00', 'marcelino@gmail.com', '$2b$10$/uzdyY0L.MX5EaFBvchamunvU2QHFHkL0BIEWYUNktI2sfdrEyKSO'),
(13, 'paes', 110000.000000, 'TiIDyEi6', '2024-09-13 03:15:58', 'paes@gmail.com', '$2b$10$qFZt4ts39OF2ZiwIbs.MIeygq00GIXHQqPzn12qq2pmPgrUn/buoe'),
(14, 'jay', 0.000000, 'zYxdradz', '2024-09-13 04:33:09', 'jay@gmail.com', '$2b$10$QtkExa5fE.3KVn1Gn5x/8Oy4BBr2CicvRJ9njVEk9U9zsJDWA0Dje');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_log`
--

CREATE TABLE `user_login_log` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `view_session`
--

CREATE TABLE `view_session` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `stream_sessionId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `view_session`
--

INSERT INTO `view_session` (`id`, `userId`, `stream_sessionId`, `createdAt`) VALUES
(3, 83, 364, '2024-09-12 12:40:32'),
(4, 83, 366, '2024-09-12 15:29:50'),
(5, 86, 366, '2024-09-12 15:33:42'),
(6, 87, 367, '2024-09-13 03:12:39'),
(7, 86, 367, '2024-09-13 03:17:45'),
(8, 86, 368, '2024-09-13 03:44:01'),
(9, 89, 369, '2024-09-13 04:35:35'),
(10, 89, 370, '2024-09-13 04:35:54'),
(11, 86, 371, '2024-09-13 04:58:18'),
(12, 86, 372, '2024-09-13 05:00:01'),
(13, 86, 373, '2024-09-13 06:29:34'),
(14, 83, 374, '2024-09-13 07:24:22'),
(15, 87, 374, '2024-09-13 07:26:57'),
(16, 97, 404, '2024-09-26 08:17:37'),
(17, 98, 405, '2024-09-26 08:24:59'),
(18, 97, 427, '2024-09-26 10:15:10'),
(19, 97, 428, '2024-09-26 10:22:34'),
(20, 97, 364, '2024-09-26 12:01:03'),
(21, 97, 364, '2024-09-26 12:01:03'),
(22, 97, 367, '2024-09-26 12:02:30'),
(23, 97, 367, '2024-09-26 12:02:30'),
(24, 97, 366, '2024-09-26 12:14:11'),
(25, 97, 429, '2024-09-26 15:59:11'),
(26, 97, 430, '2024-10-01 03:02:00'),
(27, 97, 431, '2024-10-01 03:17:46'),
(28, 103, 436, '2024-10-01 04:58:42'),
(29, 103, 437, '2024-10-01 05:22:18'),
(30, 109, 437, '2024-10-01 08:00:10'),
(31, 109, 438, '2024-10-01 08:10:47'),
(32, 110, 440, '2024-10-01 08:48:22'),
(33, 97, 440, '2024-10-01 08:53:45'),
(34, 109, 444, '2024-10-01 10:48:51'),
(35, 108, 444, '2024-10-01 10:52:26'),
(36, 97, 445, '2024-10-01 13:15:13'),
(37, 108, 446, '2024-10-02 09:27:07'),
(38, 97, 449, '2024-10-03 04:39:08'),
(39, 97, 450, '2024-10-03 06:04:16'),
(40, 97, 451, '2024-10-04 14:50:55');

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `unique_code` varchar(255) DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` decimal(10,2) DEFAULT 0.00,
  `redeem_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id`, `name`, `unique_code`, `is_used`, `createdAt`, `price`, `redeem_by`) VALUES
(3, 'PORT', '07NJF2WA28GD', 1, '2024-10-11 09:23:31', 10000.00, 84),
(6, '.htacces', 'F2ZBGET4S8ND', 0, '2024-10-11 09:33:23', 200000.00, NULL),
(7, 'Bank Ekonomi', NULL, 0, '2024-10-24 07:13:16', NULL, NULL),
(8, 'Bank Ekonomi', NULL, 0, '2024-10-24 07:13:31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `withdraw`
--

CREATE TABLE `withdraw` (
  `id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `account_number` varchar(20) NOT NULL,
  `account_name` varchar(100) NOT NULL,
  `bankId` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `withdraw`
--

INSERT INTO `withdraw` (`id`, `amount`, `account_number`, `account_name`, `bankId`, `status`, `created_at`, `updated_at`, `userId`) VALUES
(1, 1000000.00, '1234567890', 'John Doe', 1, 'pending', '2024-10-23 08:11:06', '2024-10-23 08:11:06', NULL),
(2, 2500000.00, '0987654321', 'Jane Smith', 2, 'approved', '2024-10-23 08:11:06', '2024-10-23 08:11:06', NULL),
(3, 1500000.00, '1122334455', 'Alice Johnson', 3, 'rejected', '2024-10-23 08:11:06', '2024-10-23 08:11:06', NULL),
(4, 3000000.00, '6677889900', 'Robert Brown', 4, 'pending', '2024-10-23 08:11:06', '2024-10-23 08:11:06', NULL),
(5, 5000000.00, '1231231234', 'Maria Garcia', 5, 'approved', '2024-10-23 08:11:06', '2024-10-23 08:11:06', NULL),
(9, 15000.00, '77277127', 'BACA', 1, 'approved', '2024-10-24 04:00:45', '2024-10-24 09:31:07', 84);

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_transaction`
--

CREATE TABLE `withdraw_transaction` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `amount` decimal(10,6) NOT NULL,
  `description` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `withdraw_transaction`
--

INSERT INTO `withdraw_transaction` (`id`, `userId`, `amount`, `description`, `createdAt`) VALUES
(1, 97, 2000.000000, 'Withdraw 200', '2024-10-26 01:23:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment_session`
--
ALTER TABLE `comment_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_result`
--
ALTER TABLE `game_result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_session`
--
ALTER TABLE `game_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gift`
--
ALTER TABLE `gift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gift_transaction`
--
ALTER TABLE `gift_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languange`
--
ALTER TABLE `languange`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_activity`
--
ALTER TABLE `log_activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_stream`
--
ALTER TABLE `request_stream`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session_transaction`
--
ALTER TABLE `session_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `streamer`
--
ALTER TABLE `streamer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stream_result`
--
ALTER TABLE `stream_result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stream_session`
--
ALTER TABLE `stream_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertest`
--
ALTER TABLE `usertest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_login_log`
--
ALTER TABLE `user_login_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `view_session`
--
ALTER TABLE `view_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_code` (`unique_code`);

--
-- Indexes for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bankId` (`bankId`);

--
-- Indexes for table `withdraw_transaction`
--
ALTER TABLE `withdraw_transaction`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gift`
--
ALTER TABLE `gift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `gift_transaction`
--
ALTER TABLE `gift_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `languange`
--
ALTER TABLE `languange`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log_activity`
--
ALTER TABLE `log_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merchant`
--
ALTER TABLE `merchant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `request_stream`
--
ALTER TABLE `request_stream`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `session_transaction`
--
ALTER TABLE `session_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `stream_result`
--
ALTER TABLE `stream_result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=403;

--
-- AUTO_INCREMENT for table `stream_session`
--
ALTER TABLE `stream_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=452;

--
-- AUTO_INCREMENT for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `usertest`
--
ALTER TABLE `usertest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_login_log`
--
ALTER TABLE `user_login_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `view_session`
--
ALTER TABLE `view_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `withdraw`
--
ALTER TABLE `withdraw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `withdraw_transaction`
--
ALTER TABLE `withdraw_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD CONSTRAINT `withdraw_ibfk_1` FOREIGN KEY (`bankId`) REFERENCES `bank` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
