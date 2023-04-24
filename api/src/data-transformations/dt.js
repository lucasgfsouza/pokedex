class Dt {
    formatPokemonData(payload, pokeApiData, specieId, evolutionInfo) {
        const formattedPokemonData = {
            oficialId: pokeApiData.id,
            oficialName: pokeApiData.name,
            specieId,
            evolutionChain: this.formatEvolutionTree(evolutionInfo.chain),
            personalName: payload.personalName,
            lore: payload.lore
        }

        return formattedPokemonData
    }

    formatEvolutionTree(evolutionInfo, result = {}) {

        const evolutionName = evolutionInfo.species.name
        result[evolutionName] = { name: evolutionName}

        for (let z = 0; z < evolutionInfo.evolves_to.length; z++) {
            this.formatEvolutionTree(evolutionInfo.evolves_to[z], result[evolutionName])
        }
        return result;        
    }
}

module.exports = new Dt();