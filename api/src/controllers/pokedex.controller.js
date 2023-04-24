const pokedexService = require('../services/pokedex.service');
const { getUserIdFromToken } = require('../auth')
class pokedexController {


    async getOnePokemon(req, res, next) {

        const { params: { id: personalPokemonId } } = req;

        if (!personalPokemonId) {
            res.status(400).send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon");
            return;
        }

        const userId = getUserIdFromToken(req)

        try {
            const result = await pokedexService.getOnePokemon(userId, personalPokemonId)

            res.json(result);

            return result;

        } catch (error) {

            res.status(400).send(error.message);
        }
    }

    async editPokemon(req, res, next) {

        const { body: data } = req;
        const { params: { id: personalPokemonId } } = req;

        if (!personalPokemonId) {
            res.status(400)
            res.send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon")
        }

        const userId = getUserIdFromToken(req)

        try {
            const result = await pokedexService.editOnePokemon(userId, personalPokemonId, data);

            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async createPokemonAtPokedex(req, res, next) {

        const { body: { oficialPokemonId, oficialPokemonName, data } } = req;

        if (!oficialPokemonId && oficialPokemonName) {
            res.status(400)
            res.send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon")
        }

        const userId = getUserIdFromToken(req)

        try {

            const result = await pokedexService.createOnePokemon(userId, oficialPokemonId, oficialPokemonName, data)
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async deletePokemonFromPokedex(req, res, next) {
        const { params: { id: personalPokemonId } } = req;

        if (!personalPokemonId) {
            res.status(400)
            res.send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon")
        }

        const userId = getUserIdFromToken(req);

        try {
            const result = await pokedexService.deleteOnePokemon(userId, personalPokemonId)

            res.status(200).send(result);

        } catch (error) {

            res.status(400).send(error.message)

        }
    }

    async listAllPokemonFromOnePokedex(req, res, next) {
        const userId = getUserIdFromToken(req);

        const queryParams = {
            personalName: req.query.personalName,
            oficialId: req.query.oficialId,
            oficialName: req.query.oficialName,
            limit: req.query.limit || 20,
            page: req.query.page || 1,
        };

        try {
            const result = await pokedexService.getAllPokemons(userId, queryParams);
            res.status(200).json(result);

        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

module.exports = new pokedexController();