import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import loginContentImage from '../../../assets/login_content.png';
import mallLogImage from '../../../assets/mall_logo.svg';
import { useTheme } from '@mui/material/styles';


export default function Content() {
  return (
    <Stack
      sx={{ 
        flexDirection: 'column', 
        alignSelf: 'center', 
        gap: 3, 
        maxWidth: 400,
        display:{xs:'none', md:'flex'}
      }}
    >
      <Box>
        <img src={mallLogImage} />
      </Box>
      <img src={loginContentImage}/>
    </Stack>
  );
}
