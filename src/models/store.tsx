import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Gunakan 'thunk' tanpa kurung kurawal
import pokemonReducer from './reducers/pokemon/reducer';

// Buat store
const store = createStore(
  pokemonReducer,
  compose(applyMiddleware(thunk))
);

// Export tipe RootState langsung dari store
// export interface RootState {
//   pokemon: PokemonState; 
// }
export type RootState = ReturnType<typeof pokemonReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
