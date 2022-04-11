import { Container } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Container>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}>
        <Header />
        <Home />
      </SnackbarProvider>
    </Container>
  );
}

export default App;
