CREATE TABLE `person` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))) NOT NULL,
	`nickname` text DEFAULT '' NOT NULL
);
