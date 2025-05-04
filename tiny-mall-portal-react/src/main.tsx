import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './styles/index.css'
import SignInSide from './components/login/SignInSide.tsx'
import { ThemeProvider } from '@mui/material'
import blueTheme from './themes/bule.ts'
import Outline from './components/outline/index.tsx';
import TestItem from './components/test/test.tsx';
import { Provider } from 'react-redux';
import { store } from './reducers/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={blueTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignInSide />} />
          <Route element={<Outline />} >
            <Route path="/home" element={<TestItem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
