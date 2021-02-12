import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { useRandomPokemon } from './useRandomPokemon';
import { jsonServerMock, pokemonResponseMock } from './apiMocks';

const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon/:pokemonId', (req, res, ctx) => {
    return res(ctx.json(pokemonResponseMock));
  }),
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(ctx.json(jsonServerMock));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('useRandomPokemon', () => {
  it('returns a Pokemon', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRandomPokemon());
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.pokemon.id).toEqual(1);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(false);
  });

  it('errors out if something bad happens', async () => {
    server.use(
      rest.get(
        'https://pokeapi.co/api/v2/pokemon/:pokemonId',
        (req, res, ctx) => {
          return res.networkError();
        }
      )
    );
    const { result, waitForNextUpdate } = renderHook(() => useRandomPokemon());
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.loading).toEqual(false);
    expect(result.current.pokemon).toEqual({});
    expect(result.current.error).toEqual(true);
  });
});
