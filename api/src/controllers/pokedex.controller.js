const pokedexService = require('../services/pokedex.service');
class pokedexController {


    async getOnePokemon(req, res, next) {

        const { body: { personalPokemonId } } = req;
        const { headers: { token } } = req;

        if (!personalPokemonId) {
            res.status(400)
            res.send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon")
        }

        try {
            const result = await pokedexService.getOnePokemon(token, personalPokemonId)

            return result;
        } catch (error) {

            res.status(error.code);
            res.send(error.message);
        }
    }

    async editPokemon(req, res, next) {

        const { body: { personalPokemonId, data } } = req;

        const { headers: { token } } = req;

        if (!personalPokemonId) {
            res.status(400)
            res.send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon")
        }

        try {
            const result = await pokedexService.editOnePokemon(token, personalPokemonId, data);

            return result;
        } catch (error) {
            res.status(error.code);
            res.send(error.message);
        }
    }

    async createPokemonAtPokedex(req, res, next) {

        const { body: { oficialPokemonId, oficialPokemonName, data } } = req;

        const { headers: { token } } = req;

        if (!oficialPokemonId && oficialPokemonName) {
            res.status(400)
            res.send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon")
        }
        const { result } = await pokedexService.createOnePokemon(token, oficialPokemonId, oficialPokemonName, data)
        res.status(200)
        res.json()
        res.send(result)
    }

    async deletePokemonFromPokedex(req, res, next) {
        const { body: { personalPokemonId } } = req;
        const { headers: { token } } = req;

        if (!personalPokemonId) {
            res.status(400)
            res.send("Obrigatório paramêtro de id próprio da pokedex para buscar um pokemon")
        }

        try {
            const result = await pokedexService.deleteOnePokemon(token, personalPokemonId)

            return result;
        } catch (error) {

            res.status(error.code);
            res.send(error.message);
        }
    }

    async listAllPokemonFromOnePokedex(req, res, next) {
        const { params: { oficialName, personalName } } = req

        if (oficialName) {
        }

        res.json({ ok: 'ok' })
    }

    async evolvePokemon(req, res, next) {
        res.json({ ok: 'ok' })
    }
}

module.exports = new pokedexController();