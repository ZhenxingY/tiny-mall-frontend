import * as React from 'react';
import { useState } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import ContentHeader from './header';
import { Outlet } from 'react-router';
import SideMenu from './menu';

export default function Outline() {

    const [hideMenu, setHideMenu] = useState(false);

    const menuWidth = hideMenu ? 36 : 180;
    return (
        <Box>
            <Stack direction="row" spacing={0}>
                <Box>
                    <SideMenu hideMenu={hideMenu}></SideMenu>
                </Box>
                <Box sx={{
                    width: `calc(100% - ${menuWidth}px)`,
                    marginLeft: `${menuWidth}px`,
                    height: '100%',
                }}>
                    <Stack direction="column" spacing={0}>
                        <ContentHeader/>
                        <Divider />
                        <Outlet/>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};
