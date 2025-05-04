import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { setActiveMenuId, updateOpenMenuIds } from '../../reducers/menuSlice';
import Icon from '@mui/material/Icon';
import "../../styles/index.css";

interface ISingleMenuItemProps {
    id: number;
    name: string;
    icon: string;
    title: string;
    onClick: (id: number, parentId: number) => void;
}

export default function SingleMenuItem(props: ISingleMenuItemProps) {

    const activeMenuId = useAppSelector(state => state.menuState.activeMenuId);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setActiveMenuId(props.id));
        props.onClick(props.id, 0);
    }

    return (
        <ListItemButton className="menuFont menuItem" sx={{
            ":hover": {
                backgroundColor: "#001528"
            }
        }} onClick={handleClick} >
            <ListItemIcon sx={{
                minWidth: "36px",
                color: activeMenuId === props.id ? "#409EFF" : "#bfcbd9"
            }}>
                <Icon className='material-icons-outlined'>{props.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={props.title} />
        </ListItemButton>
    );
}
