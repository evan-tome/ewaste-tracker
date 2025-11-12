-- Create database
CREATE DATABASE IF NOT EXISTS ewaste_tracker;
USE ewaste_tracker;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    date_joined DATE DEFAULT NULL,
    points INT DEFAULT 0
);

CREATE TABLE RecyclingCentres (
    centre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    postal_code VARCHAR(20),
    phone VARCHAR(20)
);

CREATE TABLE RecycledItems (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    centre_id INT NOT NULL,
    item_type VARCHAR(100),
    quantity INT,
    weight DECIMAL(6,2),
    date_logged DATE DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (centre_id) REFERENCES RecyclingCentres(centre_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PickupRequests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    centre_id INT NOT NULL,
    request_date DATETIME DEFAULT NULL,
    status ENUM('Requested','In Progress','Completed') DEFAULT 'Requested',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (centre_id) REFERENCES RecyclingCentres(centre_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Rewards (
    reward_id INT AUTO_INCREMENT PRIMARY KEY,
    reward_name VARCHAR(100) NOT NULL,
    description TEXT,
    points_required INT NOT NULL,
    reward_type VARCHAR(50)
);

CREATE TABLE UserRewards (
    user_id INT NOT NULL,
    reward_id INT NOT NULL,
    date_redeemed DATETIME DEFAULT NULL,
    PRIMARY KEY (user_id, reward_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (reward_id) REFERENCES Rewards(reward_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
