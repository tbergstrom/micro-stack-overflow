DROP DATABASE IF EXISTS micro_stack_overflow;
CREATE DATABASE micro_stack_overflow;
USE micro_stack_overflow;

DROP TABLE IF EXISTS app_user_role;
DROP TABLE IF EXISTS app_role;
DROP TABLE IF EXISTS app_user;
-- DROP TABLE IF EXISTS post;
-- DROP TABLE IF EXISTS reply;

CREATE TABLE app_user (
    app_user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(2048) NOT NULL,
    enabled BIT NOT NULL DEFAULT(1)
);

CREATE TABLE app_role (
    app_role_id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE app_user_role (
    app_user_id INT NOT NULL,
    app_role_id INT NOT NULL,
    CONSTRAINT pk_app_user_role
        PRIMARY KEY (app_user_id, app_role_id),
    CONSTRAINT fk_app_user_role_user_id
        FOREIGN KEY (app_user_id)
        REFERENCES app_user(app_user_id),
    CONSTRAINT fk_app_user_role_role_id
        FOREIGN KEY (app_role_id)
        REFERENCES app_role(app_role_id)
);

CREATE TABLE post (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    author_id INT NOT NULL,
    CONSTRAINT fk_post_author_id
        FOREIGN KEY (author_id)
        REFERENCES app_user(app_user_id)
);

CREATE TABLE reply (
    reply_id INT PRIMARY KEY AUTO_INCREMENT,
    body VARCHAR(255) NOT NULL,
    post_id INT NOT NULL,
    author_id INT NOT NULL,
    CONSTRAINT fk_reply_post_id
        FOREIGN KEY (post_id)
        REFERENCES post(post_id),
    CONSTRAINT fk_reply_author_id
        FOREIGN KEY (author_id)
        REFERENCES app_user(app_user_id)
);

INSERT INTO app_role (`name`) VALUES
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
INSERT INTO app_user (username, password_hash, enabled)
    VALUES
    ('Johnnyboy', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('Sally-Jo', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

INSERT INTO app_user_role
    VALUES
    (1, 2),
    (2, 1);

INSERT INTO post (title, body, author_id)
    VALUES
    ('Lorem ipsum', 'yadda yadda yadda', 1),
    ('Ipsum lorem', 'yadda yadda yadda yadda yadda yadda', 2),
    ('Losum iprem', 'yadda yadda yadda yadda  yadda', 2);

INSERT INTO reply (body, post_id, author_id)
    VALUES
    ('Wowee!', 2, 2),
    ('Zowee...', 3, 1),
    ('Hoowee', 1, 1);

SELECT * FROM app_user;
SELECT * FROM reply where post_id = 1;
SELECT * FROM post where post_id = 1;