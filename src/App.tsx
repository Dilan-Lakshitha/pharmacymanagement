import { useRoutes } from 'react-router-dom';
import router from './router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'sonner';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <Toaster richColors position="bottom-right" />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
