# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



# Get the current DB connection
connection = ActiveRecord::Base.connection();


connection.execute("INSERT INTO `users` (`id`, `account_name`, `username`, `email`, `password`, `bio`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'bshen', NULL, 'bshen@gmail.com', '$2a$10$IxQ038q/bxVLLU1BZjKz5OYNxjSusuTlhSPGQQXcTfEiLuktVhb/W', NULL, 'a1.jpg', '2014-12-08 13:49:48', '2014-12-10 20:56:28'),
(3, 'cecile shen', 'cecile shen', 'cecile.shen@gmail.com', '$2a$10$qwi7AxH8tcs7jnYK67wlnueoXCo1SCYxszlNwj9gyWeExiUwKOh3.', NULL, 'default_avatar.png', '2014-12-09 15:56:32', '2014-12-09 15:56:32'),
(4, 'maria', 'maria', 'maria@gmail.com', '$2a$10$pcC7ghElexVitIetgTHXm.EqdUgKGT3XuvtbL1Na4vqUuzhosq.Pa', NULL, 'miss.jpg', '2014-12-11 09:19:54', '2014-12-11 09:20:41'),
(5, 'guillaume', 'guillaume', 'gnomine@gmail.com', '$2a$10$IeRCuYDs4fP7kBOeV34/0eE.mUt9Gq/DkiwdblpvLHuagI90kQPXG', NULL, 'guillaume_nomine.jpg', '2014-12-11 09:21:11', '2014-12-11 09:21:24'),
(6, 'Billy', 'Billy', 'bshendev@gmail.com', '$2a$10$Qu62zZGGSyqP3V6stXa2seFoyjtAQgOWkDasu3/uAbMaPUBVZ4P/S', NULL, 'billy_shen.jpg', '2014-12-11 09:22:00', '2014-12-11 09:22:16'),
(7, 'Marion', 'Marion', 'marion@gmail.com', '$2a$10$vFTOJQ27x2KVRhRsc080quGhm4/ZzPJhFhdeu0mvfACpd1xwYpGZu', NULL, 'miss2.png', '2014-12-11 09:27:52', '2014-12-11 09:28:09')");


connection.execute("INSERT INTO `posts` (`id`, `user_id`, `content`, `image`, `created_at`, `updated_at`) VALUES
(47, 6, 'Awesome workspace', 'bg3.jpeg', '2014-12-11 09:23:01', '2014-12-11 09:23:01'),
(48, 6, 'Beautiful landscape !', 'bg1.jpg', '2014-12-11 09:23:16', '2014-12-11 09:23:16'),
(49, 4, 'What do we know about the earth?', 'bg2.jpeg', '2014-12-11 09:23:41', '2014-12-11 09:23:41'),
(50, 5, 'I should live there', 'bg.jpg', '2014-12-11 09:24:25', '2014-12-11 09:24:25'),
(51, 6, 'Nature''s power', 'bg5.jpeg', '2014-12-11 09:25:09', '2014-12-11 09:25:09'),
(52, 7, 'The road leading to nowhere...', 'bg4.jpeg', '2014-12-11 09:28:46', '2014-12-11 09:28:46')");