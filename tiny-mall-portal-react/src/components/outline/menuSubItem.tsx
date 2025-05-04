import { ListItemButton, ListItemIcon, Icon, ListItemText } from '@mui/material';
import * as React from 'react';
import "../../styles/index.css";
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { setActiveMenuId } from '../../reducers/menuSlice';

interface IMenuSubItemProps {
    id: number;
    name: string;
    icon: string;
    title: string;
    parentId: number;
    parentName: string;
    onClick: (id: number, parentId: number) => void;
}

export default function MenuSubItem(props: IMenuSubItemProps) {

    const activeMenuId = useAppSelector(state => state.menuState.activeMenuId);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setActiveMenuId(props.id));
        props.onClick(props.id, props.parentId);
    }

    return (
        <ListItemButton className={`menuFont subMenuItem ${activeMenuId === props.id ? "is-active" : ""}`}
            sx={{
                ":hover": {
                    backgroundColor: "#001528"
                }
            }}
            onClick={handleClick} >
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