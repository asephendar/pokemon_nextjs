import { Dispatch } from 'redux';
import axios from 'axios';
import {
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  PokemonActionTypes,
} from './types';

const fetchPokemon = () => async (dispatch: Dispatch<PokemonActionTypes>) => {
  dispatch({ type: FETCH_POKEMON_REQUEST });

  try {
    // Fetch the list of Pokémon names and URLs
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemonList = response.data.results;

    // Fetch each Pokémon's details to get the Dream World image
    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon: { name: string; url: string }) => {
        const details = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: details.data.sprites.other.dream_world.front_default,
          types: details.data.types.map((type: { type: { name: string } }) => type.type.name),
        };
      })
    );

    // Dispatch success action with the Pokémon names and images
    dispatch({
      type: FETCH_POKEMON_SUCCESS,
      payload: pokemonData,
    });
  } catch (error) {
    dispatch({
      type: FETCH_POKEMON_FAILURE,
      payload: 'Failed to fetch Pokémon data',
    });
  }
};

export { fetchPokemon };
