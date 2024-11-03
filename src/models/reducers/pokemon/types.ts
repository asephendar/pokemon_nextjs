export interface Pokemon {
    name: string;
    url: string;
    image: string;
    types: string[];
    action: string;
  }
  
  export interface PokemonState {
    data: Pokemon[];
    loading: boolean;
    error: string | null;
  }
  
  export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
  export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
  export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';
  
  interface FetchPokemonRequestAction {
    type: typeof FETCH_POKEMON_REQUEST;
  }
  
  interface FetchPokemonSuccessAction {
    type: typeof FETCH_POKEMON_SUCCESS;
    payload: Pokemon[];
  }
  
  interface FetchPokemonFailureAction {
    type: typeof FETCH_POKEMON_FAILURE;
    payload: string;
  }
  
  export type PokemonActionTypes =
    | FetchPokemonRequestAction
    | FetchPokemonSuccessAction
    | FetchPokemonFailureAction;
  