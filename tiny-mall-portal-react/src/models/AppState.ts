import Menu from "./privilege/Menu";

export class AppState {
    uiState: UiState = new UiState();
    menuState: MenuState = new MenuState();
}

export class MenuState {
    activeMenuId: number = 0;
    hideMenu: boolean = false;
    openMenuIds: number[] = [];
    activeMenu: ActiveMenu = new ActiveMenu();
}

export class ActiveMenu {
    menu: Menu = new Menu();
    parrentMenu: Menu | null = null;
}

export class UiState {
    theme: string = 'light';
    language: string = 'en-US';
}