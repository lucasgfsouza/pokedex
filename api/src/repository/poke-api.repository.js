const pokeApi = require('../../../axiosInstance');

class pokemonApiRepository {
    async callPokeApi(path, params, body) {

        const pathQuery = params ? path + '&' + params : path

        const result = await pokeApi.get(`${pathQuery}`)
        return result;
    }

    async callGetPokemon(pokemonNameOrNumber) {
        const result = await pokeApi.get(`pokemon/${pokemonNameOrNumber}`);

        return result;
    }

    async callGetPokemonSpecie(pokemonSpecieId) {
        const result = await pokeApi.get(`pokemon-species/${pokemonSpecieId}`)

        return result;
    }

    async callGetPokemonEvoltuion(pokemonEvolutionId) {
        const result = await pokeApi.get(`evolution-chain/${pokemonEvolutionId}`);

        return result;
    }

}

module.exports = new pokemonApiRepository();