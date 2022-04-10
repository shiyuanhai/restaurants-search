import { InstantSearch } from 'react-instantsearch-dom';
import './Home.css';
import { restaurantsIndex, searchClient } from '../utils/algolia';
import { SearchBox, Hits } from 'react-instantsearch-dom';

const Home = () => {
  return (
    <main>
      <InstantSearch
        searchClient={searchClient}
        indexName={restaurantsIndex.indexName}
      >
        <SearchBox />
        <Hits />
      </InstantSearch>
    </main>
  );
};

export default Home;