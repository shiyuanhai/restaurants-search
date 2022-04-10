import { InstantSearch } from 'react-instantsearch-dom';
import './Home.css';
import { restaurantsIndex, searchClient } from '../utils/algolia';
import RSHits from './algolia/RSHits';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import RSSearchBox from './algolia/RSSearchBox';
import RSPagination from './algolia/RSPagination';
import { Configure } from 'react-instantsearch-dom';
import RSRefinementList from './algolia/RSRefinementList';
import { useCallback, useState } from 'react';

const Home = () => {
  const [showMore, setShowMore] = useState(false);
  const setShowMoreMemo = useCallback(() => setShowMore(s => s), [setShowMore]);

  return (
    <main>
      <InstantSearch
        searchClient={searchClient}
        indexName={restaurantsIndex.indexName}
      >
        <Configure hitsPerPage={9}/>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <RSRefinementList 
              attribute='food_type' 
              searchable
              limit={6}
              showMore={showMore}
              showMoreLimit={100}
              setShowMore={setShowMoreMemo}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
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