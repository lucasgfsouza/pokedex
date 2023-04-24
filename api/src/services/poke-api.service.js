const pokeApiRepository = require('../repository/poke-api.repository');

class PokemonApiService {

    async getPokemon(pokemonNameOrNumber) {

        try {
            const { data: result } = await pokeApiRepository.callGetPokemon(pokemonNameOrNumber);

            return result;

        } catch (error) {
            const { response: { status: errorStatus }, config: { baseURL, url } } = error;

            if (errorStatus === 404) {
                throw new Error(`pokeApi return 'not found' for baseUrl ${baseURL + url}, check pokemon number or speeling `);
            }

            throw new Error(`Error returned from pokeapi: ${error}`);
        }
    }

    async getPokemonSpecie(pokemonSpecieId) {

        try {

            const { data: result } = await pokeApiRepository.callGetPokemonSpecie(pokemonSpecieId)

            return result

        } catch (error) {
            const { response: { status: errorStatus }, config: { baseURL, url } } = error;

            throw new Error(`Error returned from pokeapi on route ${baseURL + url}, error message: ${error.message || error}`)
        }
    }

    async getPokemonEvolution(pokemonEvolutionId) {

        try {
            const { data: result } = await pokeApiRepository.callGetPokemonEvoltuion(pokemonEvolutionId);

            return result;

        } catch (error) {
            const { response: { status: errorStatus }, config: { baseURL, url } } = error;

            throw new Error(`Error returned from pokeapi on route ${baseURL + url}, error message: ${error.message || error}`)
        }
    }


}
module.exports = new PokemonApiService();

