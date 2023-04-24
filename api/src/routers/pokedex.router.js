const express = require('express');
const pokedexController = require('../controllers/pokedex.controller');

const router = express.Router();

router.get('/pokedex/pokemon/:id', pokedexController.getOnePokemon);
router.put('/pokedex/pokemon/:id', pokedexController.editPokemon);
router.post('/pokedex/pokemon', pokedexController.createPokemonAtPokedex);
router.delete('/pokedex/pokemon/:id', pokedexController.deletePokemonFromPokedex);
router.get('/pokedex/pokemon', pokedexController.listAllPokemonFromOnePokedex);
router.put('/pokedex/pokemon/evolve-pokemon', pokedexController.evolvePokemon);


module.exports = router
