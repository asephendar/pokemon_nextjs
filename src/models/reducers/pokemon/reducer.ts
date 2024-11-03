import {
    PokemonState,
    PokemonActionTypes,
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_POKEMON_FAILURE,
  } from './types';
  
  const initialState: PokemonState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const pokemonReducer = (state = initialState, action: PokemonActionTypes): PokemonState => {
    switch (action.type) {
      case FETCH_POKEMON_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_POKEMON_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_POKEMON_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default pokemonReducer;
  