CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`message` text NOT NULL,
	`favorite` integer,
	`created_at` integer NOT NULL,
	`user_id` text NOT NULL
);
