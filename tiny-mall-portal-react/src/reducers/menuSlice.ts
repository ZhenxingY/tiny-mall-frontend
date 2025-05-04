import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  ActiveMenu, MenuState } from '../models/AppState';

const initialState: MenuState = {
    activeMenuId: 0,
    hideMenu: false,
    openMenuIds: [],
    activeMenu: new ActiveMenu()
};

const menuSlice = createSlice({
    name: 'menuSate',
    initialState,
    reducers: {
        setActiveMenuId: (state, action: PayloadAction<number>) => {
            state.activeMenuId = action.payload;
        },
        setHideMenu: (state, action: PayloadAction<boolean>) => {
            state.hideMenu = action.payload;
        },
        updateOpenMenuIds: (state, action: PayloadAction<number>) => {
            const index = state.openMenuIds.indexOf(action.payload);
            if (index >= 0) {
                state.openMenuIds.splice(index, 1);
            } else {
                state.openMenuIds.push(action.payload);
            }
        },
        updateActiveMenu: (state, action: PayloadAction<ActiveMenu>) => {
            state.activeMenu.menu = action.payload.menu;
            state.activeMenu.parrentMenu = action.payload.parrentMenu;
        }
    }
});

export const {setActiveMenuId, setHideMenu, updateOpenMenuIds,updateActiveMenu} = menuSlice.actions;
export default menuSlice.reducer;