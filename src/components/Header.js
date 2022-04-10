import { AppBar, Container, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex' } }}
          >
            Restaurants Search
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
