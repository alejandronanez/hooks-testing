import sample from 'lodash.sample';

export async function getRandomPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  const { id } = sample(data);

  return id;
}

export async function getPokemon(pokemonId) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );

  return await response.json();
}
