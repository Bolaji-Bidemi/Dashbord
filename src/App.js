import { CssBaseline, ThemeProvider} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import { useMemo } from 'react';
import {themeSettings} from './theme'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector} from 'react-redux'
import Dashboard from './Pages/Dashboard';
import Product from './Pages/Product';
import Layout from './Pages/Layout';
import Customers from './Pages/Customers';
import Transactions from './Pages/Transactions';
import Geography from './Pages/Geography';
import Overview from './Pages/OverView';
import Daily from './Pages/Daily'
import Monthly from './Pages/Monthly'
import Breakdown from './Pages/Breakdown'
import Admins from './Pages/Admins'

function App() {
  const mode = useSelector(state=> state.global.mode)
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode])
  return (
    <Router>
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Navigate to="/dashboard" replace/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transaction" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admins />} />
          </Route>
        </Routes>

      </ThemeProvider>
    </div>
    </Router>
  );
}

export default App;
