const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const max = 151;
const limit = 10;
let offset = 0;

loadPokemons(offset, limit);

function convertPokemonToHtmlLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name} image"/>
            </div>
        </li>
    `;
};

function loadPokemons (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtmlLi).join('');
    });
}

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    const records = offset + limit;

    if (records >= max) {
        loadPokemons(offset, max - offset);
        loadMoreBtn.parentElement.removeChild(loadMoreBtn);
    } else loadPokemons(offset, limit);
}) 