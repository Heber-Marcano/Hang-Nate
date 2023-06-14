--mysql -u root -p
DROP DATABASE IF EXISTS hangnate_db;
CREATE DATABASE hangnate_db;

-- use hangnate_db;


-- CREATE TABLE `user` (
--   `id` integer PRIMARY KEY,
--   `username` varchar(255),
--   `password` varchar(255),
--   `created_at` timestamp
-- );

-- CREATE TABLE `words` (
--   `id` integer PRIMARY KEY,
--   `word` varchar(255)
-- );

-- ALTER TABLE `games` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- ALTER TABLE `games` ADD FOREIGN KEY (`word_id`) REFERENCES `words` (`id`);


-- -- Seed data for the 'users' table
-- -- INSERT INTO `user` (`id`, `name`, `password`, `email`) VALUES
-- -- (1, 'alice', 'password123','bob@hotmail'),
-- -- (2, 'bob', 'supersecret','alice@hotmail'),
-- -- (3, 'charlie', 'mypassword','charlie@hotmail');

-- -- Seed data for the 'words' table
-- INSERT INTO `words` (`id`, `word`) VALUES
-- (1, 'banana'),
-- (2, 'elephant'),
-- (3, 'guitar'),
-- (4, 'hangman');

-- Seed data for the 'games' table
-- INSERT INTO `games` (`id`, `user_id`, `date`, `word_id`, `won`) VALUES
-- (1, 1, '2023-06-08 08:00:00', 1, true),
-- (2, 1, '2023-06-08 08:30:00', 2, false),
-- (3, 2, '2023-06-08 09:00:00', 3, true),
-- (4, 3, '2023-06-08 10:00:00', 4, false);
