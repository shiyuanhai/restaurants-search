import { InstantSearch } from 'react-instantsearch-dom';
import './Home.css';
import { restaurantsIndex, searchClient } from '../utils/algolia';
import RSHits from './algolia/RSHits';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import RSSearchBox from './algolia/RSSearchBox';
import RSPagination from './algolia/RSPagination';
import { Configure } from 'react-instantsearch-dom';

const Home = () => {
  return (
    <main>
      <InstantSearch
        searchClient={searchClient}
        indexName={restaurantsIndex.indexName}
      >
        <Configure hitsPerPage={9}/>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <h2>Filters</h2>
          </Grid>
          <Grid item xs={12} sm={9} spacing={2}>
            <Box sx={{display: 'flex', marginBottom: '16px'}}>
              <Box sx={{ flexGrow: 1 }}>
                <RSSearchBox />
              </Box>
            </Box>
            <Box sx={{marginBottom: '16px'}}>
              <RSHits />
            </Box>
            <RSPagination />
          </Grid>
        </Grid>
      </InstantSearch>
    </main>
  );
};

export default Home;