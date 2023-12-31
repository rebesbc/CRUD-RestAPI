CREATE DATABASE IF NOT EXISTS booksdb;
USE booksdb;
DROP TABLE IF EXISTS books;
CREATE TABLE books
(
	id 				BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title 			VARCHAR(255) NOT NULL,
    author 			VARCHAR(100) DEFAULT NULL,
    publisher 		VARCHAR(100) DEFAULT NULL,
    isbn 			VARCHAR(13) NOT NULL,
    release_date	DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Books_ISBN UNIQUE (isbn)
) AUTO_INCREMENT = 1;