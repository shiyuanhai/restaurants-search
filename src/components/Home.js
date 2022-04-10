import { InstantSearch } from 'react-instantsearch-dom';
import './Home.css';
import { restaurantsIndex, searchClient } from '../utils/algolia';
import { SearchBox } from 'react-instantsearch-dom';
import RSHits from './algolia/RSHits';

const Home = () => {
  return (
    <main>
      <InstantSearch
        searchClient={searchClient}
        indexName={restaurantsIndex.indexName}
      >
        <SearchBox />
        <RSHits />
      </InstantSearch>
    </main>
  );
};

export default Home;