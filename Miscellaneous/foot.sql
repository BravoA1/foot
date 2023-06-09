-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 05, 2023 at 07:12 AM
-- Server version: 10.11.2-MariaDB
-- PHP Version: 8.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foot`
--

-- --------------------------------------------------------

--
-- Table structure for table `bet`
--

CREATE TABLE `bet` (
  `pool_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `position1` int(11) DEFAULT NULL,
  `position2` int(11) DEFAULT NULL,
  `position3` int(11) DEFAULT NULL,
  `position4` int(11) DEFAULT NULL,
  `resultBet` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bet`
--

INSERT INTO `bet` (`pool_id`, `user_id`, `position1`, `position2`, `position3`, `position4`, `resultBet`) VALUES
(1, 1, 1, 2, 3, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pool`
--

CREATE TABLE `pool` (
  `id` int(11) NOT NULL,
  `score1` int(11) DEFAULT NULL,
  `score2` int(11) DEFAULT NULL,
  `score3` int(11) DEFAULT NULL,
  `score4` int(11) DEFAULT NULL,
  `tournament_id` int(11) NOT NULL,
  `team_1_id` int(11) NOT NULL,
  `team_2_id` int(11) NOT NULL,
  `team_3_id` int(11) NOT NULL,
  `team_4_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pool`
--

INSERT INTO `pool` (`id`, `score1`, `score2`, `score3`, `score4`, `tournament_id`, `team_1_id`, `team_2_id`, `team_3_id`, `team_4_id`) VALUES
(1, 2, 2, 4, 8, 1, 2, 1, 3, 13),
(2, 0, 0, 0, 0, 1, 12, 16, 4, 15),
(3, 0, 0, 0, 0, 2, 1, 16, 14, 9);

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `tournament_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `resultTournament` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`) VALUES
(1, 'Italy'),
(2, 'France'),
(3, 'Brasil'),
(4, 'Argentina'),
(5, 'Germany'),
(6, 'Mexico'),
(7, 'Spain'),
(8, 'England'),
(9, 'Belgium'),
(10, 'Uruguay'),
(11, 'Serbia'),
(12, 'Switzerland'),
(13, 'Sweden'),
(14, 'Japan'),
(15, 'Croatia'),
(16, 'Portugal');

-- --------------------------------------------------------

--
-- Table structure for table `tournament`
--

CREATE TABLE `tournament` (
  `id` int(11) NOT NULL,
  `dateYear` int(11) DEFAULT NULL,
  `locked` tinyint(1) DEFAULT 0,
  `closed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tournament`
--

INSERT INTO `tournament` (`id`, `dateYear`, `locked`) VALUES
(1, 1998, 1),
(2, 2002, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `superuser` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `superuser`) VALUES
(1, 'Tom', '$2b$08$a6KCKUyHxTYpnahg3hHI9.dXLv6xmEafm6rwJG2stbggn1ZFJYcnm', 'tom@email.com', 1),
(2, 'jean', '$2b$08$B3DXcQW170pziTWmF5dXoOL6w/9Byaq1PQ2/q/x8pkrC4TvJ0deQ6', 'jean@email.com', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bet`
--
ALTER TABLE `bet`
  ADD PRIMARY KEY (`pool_id`,`user_id`),
  ADD KEY `pool_id` (`pool_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pool`
--
ALTER TABLE `pool`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tournament_id` (`tournament_id`),
  ADD KEY `team_1_id` (`team_1_id`),
  ADD KEY `team_2_id` (`team_2_id`),
  ADD KEY `team_3_id` (`team_3_id`),
  ADD KEY `team_4_id` (`team_4_id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`tournament_id`,`user_id`),
  ADD KEY `result_ibfk_1` (`tournament_id`),
  ADD KEY `result_ibfk_2` (`user_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pool`
--
ALTER TABLE `pool`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bet`
--
ALTER TABLE `bet`
  ADD CONSTRAINT `bet_ibfk_1` FOREIGN KEY (`pool_id`) REFERENCES `pool` (`id`),
  ADD CONSTRAINT `bet_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `pool`
--
ALTER TABLE `pool`
  ADD CONSTRAINT `pool_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`),
  ADD CONSTRAINT `pool_ibfk_2` FOREIGN KEY (`team_1_id`) REFERENCES `team` (`id`),
  ADD CONSTRAINT `pool_ibfk_3` FOREIGN KEY (`team_2_id`) REFERENCES `team` (`id`),
  ADD CONSTRAINT `pool_ibfk_4` FOREIGN KEY (`team_3_id`) REFERENCES `team` (`id`),
  ADD CONSTRAINT `pool_ibfk_5` FOREIGN KEY (`team_4_id`) REFERENCES `team` (`id`);

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `result_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`),
  ADD CONSTRAINT `result_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
