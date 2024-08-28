use movieverse;

CREATE TABLE User (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ListType (
    listTypeId INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE List (
    listId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    listTypeId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (listTypeId) REFERENCES ListType(listTypeId)
);

CREATE TABLE ListItem (
    listItemId INT PRIMARY KEY AUTO_INCREMENT,
    listId INT NOT NULL,
    movieId INT NOT NULL,
    contentType VARCHAR(50),
    image VARCHAR(255),
    FOREIGN KEY (listId) REFERENCES List(listId)
);
