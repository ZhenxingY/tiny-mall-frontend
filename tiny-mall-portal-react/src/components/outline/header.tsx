import { Avatar, Box, Breadcrumbs, Divider, Icon, Link, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import * as React from 'react';
import { useAppSelector } from '../../reducers/hooks';
import translate from "../../utils/i18n/TranslationUtil";
import avatar from "../../assets/avatar.jpg"
import { PersonAdd, Settings, Logout } from '@mui/icons-material';

interface IContentHeaderProps {

}

export default function ContentHeader(props: IContentHeaderProps) {

    const menuState = useAppSelector(state => state.menuState);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const activeMenu = menuState.activeMenu;
    const open = Boolean(anchorEl);

    return (
        <Box>
            <Stack direction="row" spacing={0}>
                <Box>
                    <Icon sx={{
                        fontSize: "32px"
                    }} className='material-icons-outlined'>menu_open</Icon>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: "0 20px"
                }}>
                    <Box>
                        <Breadcrumbs sx={{
                            lineHeight: "2"
                        }} aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                {translate("home", null)}
                            </Link>
                            {activeMenu.parrentMenu !== null && activeMenu.parrentMenu.id !== 0 &&
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href={`/${activeMenu.parrentMenu.name}`}
                                >
                                    {translate(activeMenu.parrentMenu.name, null)}
                                </Link>
                            }
                            {
                                (activeMenu.parrentMenu === null || activeMenu.parrentMenu.id === 0) &&

                                <Link
                                    underline="hover"
                                    color="text.primary"
                                    href={`/${activeMenu.menu.name}`}
                                    aria-current="page"
                                >
                                    {translate(activeMenu.menu.name, null)}
                                </Link>
                            }
                            {
                                (activeMenu.parrentMenu !== null && activeMenu.parrentMenu.id !== 0) &&

                                <Link
                                    underline="hover"
                                    color="text.primary"
                                    href={`/${activeMenu.parrentMenu.name}/${activeMenu.menu.name}`}
                                    aria-current="page"
                                >
                                    {translate(activeMenu.menu.name, null)}
                                </Link>
                            }
                        </Breadcrumbs>
                    </Box>
                    <Box className="avatar-container">
                        <Avatar sx={{
                            width: "32px",
                            height: "32px"
                        }} src={avatar} onClick={handleClick}>

                        </Avatar>
                    </Box>
                </Box>
            </Stack>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Icon className='material-icons-outlined'>settings</Icon>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Icon className='material-icons-outlined'>logout</Icon>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};