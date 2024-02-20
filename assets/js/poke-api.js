const pokeApi = {}

function convertPokeApiDetailToPokemon (pokeDetails) {
    return new Pokemon(
        pokeDetails.id,
        pokeDetails.name,
        pokeDetails.types.map(typeSlot => typeSlot.type.name),
        pokeDetails.sprites.other.dream_world.front_default
    );
};

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
    .then(response => response.json()) // Conversão da requisição para JSON
    .then(jsonBody => jsonBody.results) // Focamos somente nos resultados, a lista de pokemons
    .then(pokemons => pokemons.map(pokemon => pokeApi.getPokemonDetails(pokemon))) // Transformamos a lista de pokemons em uma lista de requisições com os detalhes dos pokemons
    .then(detailRequest => Promise.all(detailRequest)) // Esperamos todas as requisições terminarem. Retorno da função
    .catch(error => console.log(error));
};