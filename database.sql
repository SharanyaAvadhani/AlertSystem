CREATE DATABASE ALERTSYSTEM;

USE ALERTSYSTEM;

CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

desc users;

CREATE TABLE recipients (
    userid INT,
    recipient_name VARCHAR(255) NOT NULL,
    recipient_phone VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (userid) REFERENCES users(userid)
);

desc recipients;

CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT,
    FOREIGN KEY (user_id) REFERENCES users(userid)
);


desc messages;

CREATE TABLE message_recipients (
    message_id INT,
    recipient_phone_number VARCHAR(20),
    FOREIGN KEY (message_id) REFERENCES messages(message_id),
    FOREIGN KEY (recipient_phone_number) REFERENCES recipients(recipient_phone)
);

desc message_recipients;

