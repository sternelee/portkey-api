CREATE TABLE `configs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`userId` text,
	`apiKey` text,
	`config` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `prompts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`userId` text,
	`content` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`userId` text,
	`apiKey` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `user_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`firstName` text,
	`lastName` text,
	`email` text,
	`password` text,
	`role` text,
	`plan` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE INDEX `configUserIdIndex` ON `configs` (`userId`);--> statement-breakpoint
CREATE INDEX `promptUserIdIndex` ON `prompts` (`userId`);--> statement-breakpoint
CREATE INDEX `providerUserIdIndex` ON `providers` (`userId`);