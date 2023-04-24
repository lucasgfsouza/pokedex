const pokedexRepository = require('../repository/pokedex.repository');
const ENUM = require('../enum');
const pokeApiRepository = require('../repository/poke-api.repository');
const url = require('url')
const dataTransforms = require('../data-transformations/dt.js')

const { POKEMON_NOT_FOUND_AT_DB } = ENUM;

class PokedexService {
    async getOnePokemon(userId, personalPokemonId) {
        const result = await pokedexRepository.getPokemonById(userId, personalPokemonId);

        switch (result.code) {
            case ENUM.SUCCESS:
                return { code: ENUM.SUCCESS, data: result.data };
            case ENUM.POKEMON_NOT_FOUND_AT_DB:
                throw new Error("Pokémon não encontrado no banco de dados");
            case ENUM.GENERIC_ERROR:
            default:
                throw new Error("Ocorreu um erro ao buscar o Pokémon");
        }

    }

    async editOnePokemon(userId, personalPokemonId, data) {
        const result = await pokedexRepository.editOnePokemon(userId, personalPokemonId, data);

        switch (result.code) {
            case ENUM.SUCCESS:
                return { code: ENUM.SUCCESS, data: result.data };
            case ENUM.POKEMON_NOT_FOUND_AT_DB:
                throw new Error("Pokémon não encontrado no banco de dados");
            case ENUM.GENERIC_ERROR:
            default:
                throw new Error("Ocorreu um erro ao editar o Pokémon");
        }
    }

    async deleteOnePokemon(userId, personalPokemonId) {
        const result = await pokedexRepository.deleteOnePokemon(userId, personalPokemonId);

        switch (result.code) {
            case ENUM.DELETE_SUCCESS:
                return { code: ENUM.SUCCESS };
            case ENUM.POKEMON_NOT_FOUND_AT_DB:
                throw new Error("Pokémon não encontrado no banco de dados");
            case ENUM.GENERIC_ERROR:
            default:
                throw new Error("Ocorreu um erro ao excluir o Pokémon");
        }
    }

    async createOnePokemon(userId, oficialPokemonId, oficialPokemonName, payload) {

        try {
            const { data: pokeApiData } = await pokeApiRepository.callGetPokemon(oficialPokemonId || oficialPokemonName);

            const { species: { url: speciesUrl } } = pokeApiData;

            const parsedSpeciesUrl = new url.URL(speciesUrl);
            const speciePathParts = parsedSpeciesUrl.pathname.split('/');
            const specieId = speciePathParts[speciePathParts.length - 2];

            const { data: speciesInfo } = await pokeApiRepository.callGetPokemonSpecie(specieId)

            const { evolution_chain: { url: evolutionUrl } } = speciesInfo

            const parsedEvolutionUrl = new url.URL(evolutionUrl);
            const evoltutionPathParts = parsedEvolutionUrl.pathname.split('/');
            const evolutionId = evoltutionPathParts[evoltutionPathParts.length - 2];

            const { data: evolutionData } = await pokeApiRepository.callGetPokemonEvoltuion(evolutionId);

            const formattedPokemonDataToCreate = dataTransforms.formatPokemonData(payload, pokeApiData, specieId, evolutionData);

            const result = await pokedexRepository.createPokemon(userId, formattedPokemonDataToCreate);

            switch (result.code) {
                case ENUM.SUCCESS:
                    return { code: ENUM.SUCCESS, data: result.data };
                case ENUM.GENERIC_ERROR:
                default:
                    throw new Error("Ocorreu um erro ao criar o Pokémon");
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllPokemons(userId, queryParams) {
        const result = await pokedexRepository.getAllPokemons(userId, queryParams);

        switch (result.code) {
            case ENUM.SUCCESS:
                return { code: ENUM.SUCCESS, data: result.data };
            case ENUM.GENERIC_ERROR:
            default:
                throw new Error("Ocorreu um erro ao buscar todos os Pokémon");
        }
    }
}


module.exports = new PokedexService();