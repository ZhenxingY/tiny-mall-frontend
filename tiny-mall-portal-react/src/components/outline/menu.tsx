import { ListItemIcon, ListItemText, MenuItem, MenuList, Box, Collapse, List, ListItemButton, ListSubheader } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import Menu from '../../models/privilege/Menu';
import SingleMenuItem from './singleMenuItem';
import MenuItemGroup from './menuItemGroup';
import _ from 'lodash';
import {  useAppDispatch } from '../../reducers/hooks';
import {updateActiveMenu} from '../../reducers/menuSlice';
import { ActiveMenu } from '../../models/AppState';

const menuListSource: Menu[] =
    [
        {
            id: 1,
            parentId: 0,
            title: '商品',
            level: 1,
            sort: 0,
            name: 'pms',
            icon: 'shopping_bag',
            hidden: false,
            children: []
        },
        {
            id: 2,
            parentId: 1,
            title: '商品列表',
            level: 2,
            sort: 0,
            name: 'product',
            icon: 'format_list_bulleted',
            hidden: false,
            children: []
        },
        {
            id: 3,
            parentId: 1,
            title: '商品分类',
            level: 2,
            sort: 0,
            name: 'product_category',
            icon: 'category',
            hidden: false,
            children: []
        },
        {
            id: 4,
            parentId: 1,
            title: '商品品牌',
            level: 2,
            sort: 0,
            name: 'product_brand',
            icon: 'sell',
            hidden: false,
            children: []
        },
        {
            id: 5,
            parentId: 1,
            title: '添加商品',
            level: 2,
            sort: 0,
            name: 'product_add',
            icon: 'list_alt_add',
            hidden: false,
            children: []
        },
        {
            id: 6,
            parentId: 0,
            title: '权限',
            level: 1,
            sort: 0,
            name: 'ums',
            icon: 'settings',
            hidden: false,
            children: []
        },
        {
            id: 7,
            parentId: 6,
            title: '用户列表',
            level: 2,
            sort: 0,
            name: 'admin',
            icon: 'account_circle',
            hidden: false,
            children: []
        },
        {
            id: 8,
            parentId: 6,
            title: '角色列表',
            level: 2,
            sort: 0,
            name: 'role',
            icon: 'assignment_ind',
            hidden: false,
            children: []
        },
        {
            id: 9,
            parentId: 6,
            title: '菜单列表',
            level: 2,
            sort: 0,
            name: 'menu',
            icon: 'widgets',
            hidden: false,
            children: []
        },
        {
            id: 10,
            parentId: 6,
            title: '资源列表盘',
            level: 2,
            sort: 0,
            name: 'resource',
            icon: 'manage_accounts',
            hidden: false,
            children: []
        }
    ];

// const rootMenu: Menu = {
//     id: 0,
//     parentId: 0,
//     title: 'root',
//     level: 0,
//     sort: 0,
//     name: 'root',
//     icon: 'root',
//     hidden: false,
//     children: [
//         {
//             id: 1,
//             parentId: 0,
//             title: '商品',
//             level: 1,
//             sort: 0,
//             name: 'pms',
//             icon: 'shopping_bag',
//             hidden: false,
//             children: [
//                 {
//                     id: 2,
//                     parentId: 1,
//                     title: '商品列表',
//                     level: 2,
//                     sort: 0,
//                     name: 'product',
//                     icon: 'format_list_bulleted',
//                     hidden: false,
//                     children: []
//                 },
//                 {
//                     id: 3,
//                     parentId: 1,
//                     title: '商品分类',
//                     level: 2,
//                     sort: 0,
//                     name: 'product-category',
//                     icon: 'category',
//                     hidden: false,
//                     children: []
//                 },
//                 {
//                     id: 4,
//                     parentId: 1,
//                     title: '商品品牌',
//                     level: 2,
//                     sort: 0,
//                     name: 'product-brand',
//                     icon: 'sell',
//                     hidden: false,
//                     children: []
//                 },
//                 {
//                     id: 5,
//                     parentId: 1,
//                     title: '添加商品',
//                     level: 2,
//                     sort: 0,
//                     name: 'product-add',
//                     icon: 'list_alt_add',
//                     hidden: false,
//                     children: []
//                 }
//             ]
//         },
//         {
//             id: 6,
//             parentId: 0,
//             title: '权限',
//             level: 1,
//             sort: 0,
//             name: 'ums',
//             icon: 'settings',
//             hidden: false,
//             children: [
//                 {
//                     id: 7,
//                     parentId: 6,
//                     title: '用户列表',
//                     level: 2,
//                     sort: 0,
//                     name: 'admin',
//                     icon: 'account_circle',
//                     hidden: false,
//                     children: []
//                 },
//                 {
//                     id: 8,
//                     parentId: 6,
//                     title: '角色列表',
//                     level: 2,
//                     sort: 0,
//                     name: 'role',
//                     icon: 'assignment_ind',
//                     hidden: false,
//                     children: []
//                 },
//                 {
//                     id: 9,
//                     parentId: 6,
//                     title: '菜单列表',
//                     level: 2,
//                     sort: 0,
//                     name: 'menu',
//                     icon: 'widgets',
//                     hidden: false,
//                     children: []
//                 },
//                 {
//                     id: 10,
//                     parentId: 6,
//                     title: '资源列表盘',
//                     level: 2,
//                     sort: 0,
//                     name: 'resource',
//                     icon: 'manage_accounts',
//                     hidden: false,
//                     children: []
//                 }
//             ]
//         }
//     ]
// }

interface ISideMenuProps {
    hideMenu: boolean;
}

export default function SideMenu(props: ISideMenuProps) {

    const { hideMenu } = props;

    const [menuList, setMenuList] = useState<Menu[]>(menuListSource);
    
    const dispatch = useAppDispatch();

    const buildRootMenu = (menuList: Menu[]): Menu => {
        const rootMenu: Menu = new Menu();
        rootMenu.id = 0;
        rootMenu.parentId = 0;
        rootMenu.title = 'root';
        rootMenu.level = 0;
        rootMenu.sort = 0;
        rootMenu.name = 'root';
        rootMenu.icon = 'root';
        rootMenu.hidden = false;
        rootMenu.children = [];

        const topLevelMenus = menuList.filter((menu) => menu.parentId === 0);
        topLevelMenus.forEach((menu) => {
            const menuClone = _.cloneDeep(menu);
            rootMenu.children.push(menuClone);
        });

        // build second level menus
        rootMenu.children.forEach((menu) => {
            const childrenMenus = menuList.filter((subMenu) => subMenu.parentId === menu.id);
            childrenMenus.forEach((childMenu) => {
                const childMenuClone = _.cloneDeep(childMenu);
                menu.children.push(childMenuClone);
            });
        });

        return rootMenu;
    }

    const onMenuClick = (id: number, parentId: number) => {
        console.log(id, parentId);
        const menu = menuList.find(m => m.id === id);
        const parrentMenu = menuList.find(m => m.id === parentId);
        const activeMenu = new ActiveMenu();
        if (menu) {
            activeMenu.menu = menu;
        }
        if (parrentMenu) {
            activeMenu.parrentMenu = parrentMenu;;
        }
        dispatch(updateActiveMenu(activeMenu));
    }

    const rootMenu = buildRootMenu(menuList);

    // ui control variables
    const menuWidth = hideMenu ? "36px" : "180px";
    return (
        <Box sx={{
            width: menuWidth,
            height: '100%',
            backgroundColor: '#304156',
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 1001,
            overflow: 'hidden',
        }}>
            <List
                component="nav"
            >
                {rootMenu.children.map((menu) => {
                    const childrenMenu = menu.children;

                    if (childrenMenu.length === 0) {
                        return (
                            <SingleMenuItem
                                key={menu.id}
                                id={menu.id}
                                icon={menu.icon}
                                title={menu.title}
                                name={menu.name}
                                onClick={onMenuClick} />
                        );
                    } else {
                        return (
                            <MenuItemGroup
                                key={menu.id}
                                id={menu.id}
                                icon={menu.icon}
                                title={menu.title}
                                name={menu.name}
                                subMenus={childrenMenu}
                                onClick={onMenuClick}
                            />
                        )
                    }
                })}
            </List>
        </Box>
    );
};