CREATE TABLE pokemons (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  oficialNumber INTEGER CHECK (oficialNumber >= 0 AND oficialNumber <= 9999) NOT NULL,
  oficialName VARCHAR(255) NOT NULL,
  personalName VARCHAR(255),
  evolutionChain JSONB NOT NULL,
  specieId INTEGER CHECK (specieId >= 0 AND specieId <= 999) NOT NULL,
  lore TEXT CHECK (LENGTH(lore) <= 5000),
  FOREIGN KEY (user_id) REFERENCES users(id)
);