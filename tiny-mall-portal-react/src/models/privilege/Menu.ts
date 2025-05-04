export default class Menu {
    public id: number = 0;
    public parentId: number = 0;
    public title: string = "";
    public level: number = 0;
    public sort: number = 0;
    public name: string = "";
    public icon: string = "";
    public hidden: boolean = false;
    public children: Menu[] = [];
}