import { Box, Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import Menu from '../../models/privilege/Menu';
import MenuSubItem from './menuSubItem';

import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { setActiveMenuId, updateOpenMenuIds } from '../../reducers/menuSlice';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface IMenuItemGroupProps {
    id: number;
    name: string;
    icon: string;
    title: string;
    subMenus: Menu[];
    onClick: (id: number, parentId: number) => void;
}

export default function MenuItemGroup(props: IMenuItemGroupProps) {
    const { id, name, icon, title, subMenus, onClick } = props;

    const openMenuIds = useAppSelector(state => state.menuState.openMenuIds);
    const dispatch = useAppDispatch();

    const handleParentMenuClick = () => {
        dispatch(updateOpenMenuIds(id));
    };

    const isOpen: boolean = openMenuIds.indexOf(id) >= 0;

    return (
        <Box>
            <ListItemButton className="menuFont menuItem"
                sx={{
                    ":hover": {
                        backgroundColor: "#001528"
                    }
                }}
                onClick={handleParentMenuClick}>
                <ListItemIcon className='menuIcon'>
                    <Icon className='material-icons-outlined'>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={title} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" dense={false} disablePadding>
                    {
                        subMenus === undefined ? null :
                            subMenus.map((itemData) => {
                                return <MenuSubItem
                                    name={itemData.name}
                                    icon={itemData.icon}
                                    title={itemData.title}
                                    id={itemData.id}
                                    parentId={id}
                                    parentName={name}
                                    onClick={onClick}
                                    key={itemData.id} />
                            })
                    }
                </List>
            </Collapse>
        </Box>
    );
}