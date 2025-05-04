import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiState } from '../models/AppState';

const initialState: UiState = {
    theme : 'light',
    language: 'en-US'
}

const uiSlice = createSlice({
    name: 'uiState',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    }
});

export const {setTheme,setLanguage} = uiSlice.actions;
export default uiSlice.reducer;