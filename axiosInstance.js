const axios = require('axios');

const pokeApiAxios = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000
})

module.exports = pokeApiAxios;