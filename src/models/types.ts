import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from './store';

// Definisikan tipe AppThunk yang umum digunakan untuk fungsi thunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
