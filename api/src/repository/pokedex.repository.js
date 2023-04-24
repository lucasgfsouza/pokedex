const pool = require('../db');
const RESPONSE_ENUM = require('../enum');

class PokemonsRepository {
    async createPokemon(userId, formattedPokemonDataToCreate) {
        const { personalName, evolutionChain = {}, specieId = 1, lore = '', oficialId, oficialName } = formattedPokemonDataToCreate;
        const query = `
            INSERT INTO pokemons (user_id, oficialNumber, oficialName, personalName, evolutionChain, specieId, lore)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
        `;
        const values = [userId, oficialId, oficialName, personalName, JSON.stringify(evolutionChain), specieId, lore];
        try {
            const result = await pool.query(query, values);
            return { code: RESPONSE_ENUM.SUCCESS, data: result.rows[0] };
        } catch (error) {
            return { code: RESPONSE_ENUM.GENERIC_ERROR, error: error };
        }
    }

    async getPokemonById(userId, id) {
        const query = `
            SELECT * FROM pokemons WHERE id = $1 and user_id = $2;
        `;
        const values = [id, userId];
        try {
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                return { code: RESPONSE_ENUM.SUCCESS, data: result.rows[0] };
            } else {
                return { code: RESPONSE_ENUM.POKEMON_NOT_FOUND_AT_DB };
            }
        } catch (error) {
            return { code: RESPONSE_ENUM.GENERIC_ERROR, error: error };
        }
    }

    async getAllPokemons(userId, queryParams) {
        const { personalName = '', oficialId = '', oficialName = '', limit = '', page = '' } = queryParams;
        const offset = (page - 1) * limit;

        let query = `
          SELECT * FROM pokemons
          WHERE user_id = $1
        `;

        const values = [userId];
        let nextParam = 2;

        if (personalName) {
            query += ` AND LOWER(personalName) LIKE LOWER($${nextParam})`;
            values.push(`%${personalName}%`);
            nextParam++;
        }

        if (oficialId) {
            query += ` AND oficialNumber = $${nextParam}`;
            values.push(oficialId);
            nextParam++;
        }

        if (oficialName) {
            query += ` AND LOWER(oficialName) LIKE LOWER($${nextParam})`;
            values.push(`%${oficialName}%`);
            nextParam++;
        }

        query += ` ORDER BY id LIMIT $${nextParam} OFFSET $${nextParam + 1}`;
        values.push(limit, offset);

        try {
            const result = await pool.query(query, values);
            return { code: RESPONSE_ENUM.SUCCESS, data: result.rows };
        } catch (error) {
            return { code: RESPONSE_ENUM.GENERIC_ERROR, error: error };
        }
    }

    async deleteOnePokemon(userId, personalPokemonId) {
        const query = `
            DELETE FROM pokemons
            WHERE user_id = $1 AND id = $2
        `;

        const values = [userId, personalPokemonId];

        try {
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                return { code: RESPONSE_ENUM.DELETE_SUCCESS };
            } else {
                return { code: RESPONSE_ENUM.POKEMON_NOT_FOUND_AT_DB };
            }
        } catch (error) {
            return { code: RESPONSE_ENUM.GENERIC_ERROR, error: error };
        }
    }


    async editOnePokemon(userId, personalPokemonId, data) {
        const keys = Object.keys(data);
        const values = [userId, personalPokemonId];
        let setClause = '';

        keys.forEach((key, index) => {
            setClause += `${key} = $${index + 3}, `;
            values.push(data[key]);
        });

        // Remove a última vírgula e espaço
        setClause = setClause.slice(0, -2);

        const query = `
            UPDATE pokemons
            SET ${setClause}
            WHERE user_id = $1 AND id = $2
            RETURNING *
        `;

        try {
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                return { code: RESPONSE_ENUM.SUCCESS, data: result.rows[0] };
            } else {
                return { code: RESPONSE_ENUM.POKEMON_NOT_FOUND_AT_DB };
            }
        } catch (error) {
            return { code: RESPONSE_ENUM.GENERIC_ERROR, error: error };
        }
    }




}

module.exports = new PokemonsRepository();
