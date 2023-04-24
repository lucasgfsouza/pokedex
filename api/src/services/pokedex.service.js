const pokedexRepository = require('../repository/pokedex.repository');
const ENUM = require('../enum');

const { POKEMON_NOT_FOUND_AT_DB } = ENUM;

class PokedexService {
    async getOnePokemon(token, personalPokemonId) {
        const { result, result: { code } } = pokedexRepository.getOnePokemon(token, personalPokemonId);

        if (code === POKEMON_NOT_FOUND_AT_DB) {
            return {
                message: 'Pokemon não encontrado, verifique se informou o id pessoal do pokemon.',
                status: 404,
                personalPokemonId
            };
        }

        return result;

    }

    async editOnePokemon(token, personalPokemonId) {
        const { result, result: { code } } = pokedexRepository.editOnePokemon(token, personalPokemonId, data);

        if (code === POKEMON_NOT_FOUND_AT_DB) {
            return {
                message: 'Pokemon não encontrado, verifique se informou o id pessoal do pokemon.',
                status: 404,
                personalPokemonId
            };
        }

        return result;
    }

    async deleteOnePokemon(token, personalPokemonId) {
        const { result, result: { code } } = pokedexRepository.deleteOnePokemon(token, personalPokemonId);

        if (code === POKEMON_NOT_FOUND_AT_DB) {
            return {
                message: 'Pokemon não encontrado, verifique se informou o id pessoal do pokemon.',
                status: 404,
                personalPokemonId
            };
        }

        return result;
    }

    async createOnePokemon(token, oficialPokemonId, oficialPokemonName, data) {
        try {

            const result = await pokedexRepository.createPokemon(oficialPokemonId, oficialPokemonName, data)

            return { result }
        } catch (error) {
            throw new Error(JSON.stringify({
                status: 500,
                message: error
            }))
        }

    }
}


module.exports = new PokedexService();