import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { AppState, MenuState, UiState } from '../models/AppState';
import uiSlice from './uiSlice.ts';
import menuSlice from './menuSlice.ts';

const initialState: AppState= {
  uiState : new UiState(),
  menuState : new MenuState()
};

export const store = configureStore({
  reducer: {
    uiState: uiSlice,
    menuState: menuSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: initialState
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store