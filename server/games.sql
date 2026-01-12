DROP TABLE IF EXISTS games;

CREATE TABLE IF NOT EXISTS games (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  studio TEXT NOT NULL,
  genre TEXT NOT NULL,
  platform TEXT NOT NULL
);

INSERT INTO games (id, title, studio, genre, platform)
VALUES (1, 'Hades', 'Supergiant Games', 'Roguelike', 'pc');

INSERT INTO games (id, title, studio, genre, platform)
VALUES (2, 'The Last of Us Part II', 'Naughty Dog', 'Action', 'ps5');

INSERT INTO games (id, title, studio, genre, platform)
VALUES (3, 'Halo Infinite', '343 Industries', 'FPS', 'xbox');

INSERT INTO games (id, title, studio, genre, platform)
VALUES (4, 'The Legend of Zelda: Breath of the Wild', 'Nintendo', 'Adventure', 'switch');

INSERT INTO games (id, title, studio, genre, platform)
VALUES (5, 'Stardew Valley', 'ConcernedApe', 'Simulation', 'pc');

SELECT * FROM games;