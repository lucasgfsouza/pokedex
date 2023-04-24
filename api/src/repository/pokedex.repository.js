const pool = require('../db');

class PokemonsRepository {
    async createPokemon(oficialPokemonId, oficialPokemonName, data) {
        const { personalName, evolutionChain = {}, specieId = 1, lore = '' } = data;
        const query = `
            INSERT INTO pokemons (oficialNumber, oficialName, personalName, evolutionChain, specieId, lore)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;
        const values = [oficialPokemonId, oficialPokemonName, personalName, JSON.stringify(evolutionChain), specieId, lore];
        const result = await pool.query(query, values);
        return result.rows[0].id;
    }

    async getPokemonById(id) {
        const query = `
            SELECT * FROM pokemons WHERE id = $1;
        `;
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

module.exports = new PokemonsRepository();
