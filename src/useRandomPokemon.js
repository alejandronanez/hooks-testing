import { useEffect, useState } from 'react';
import { getPokemon, getRandomPost } from './api';

export function useRandomPokemon() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonId, setPokemonId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPokemonId() {
      try {
        const randomPokemonId = await getRandomPost();
        setPokemonId(randomPokemonId);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    }

    getPokemonId();
  }, []);

  useEffect(() => {
    async function getPokemonInfo(id) {
      try {
        const pokemon = await getPokemon(id);

        setPokemon(pokemon);
      } catch (e) {
        setError(true);
        setPokemon({});
      } finally {
        setLoading(false);
      }
    }

    if (pokemonId) {
      getPokemonInfo(pokemonId);
    }
  }, [pokemonId]);

  return { pokemon, loading, error };
}
