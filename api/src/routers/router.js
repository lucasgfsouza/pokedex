const express = require('express');
const pokedexController = require('../controllers/pokedex.controller');
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../auth')


const router = express.Router();

router.post('/user', userController.signup);
router.post('/login', userController.login);
router.put('/user', authenticateToken, userController.update);
router.delete('/user', authenticateToken, userController.deleteUser);

router.get('/pokedex/pokemon/:id', authenticateToken, pokedexController.getOnePokemon);
router.put('/pokedex/pokemon/:id', authenticateToken, pokedexController.editPokemon);
router.post('/pokedex/pokemon', authenticateToken, pokedexController.createPokemonAtPokedex);
router.delete('/pokedex/pokemon/:id', authenticateToken, pokedexController.deletePokemonFromPokedex);
router.get('/pokedex/pokemon', authenticateToken, pokedexController.listAllPokemonFromOnePokedex);


module.exports = router
