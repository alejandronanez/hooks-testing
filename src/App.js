import './App.css';
import { useRandomPokemon } from './useRandomPokemon';

export default function App() {
  const { pokemon, loading, error } = useRandomPokemon();

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Random Pokemon</h1>
      <h2 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
