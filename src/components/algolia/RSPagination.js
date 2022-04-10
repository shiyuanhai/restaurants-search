import { Pagination } from '@mui/material';
import { connectPagination } from 'react-instantsearch-dom';

const RSPagination = ({ currentRefinement, nbPages, refine, createURL }) => (
  <Pagination
        count={nbPages}
        size="large"
        page={currentRefinement}
        variant="outlined"
        color="primary"
        onChange={(e, p) => refine(p)}
      />
);

export default connectPagination(RSPagination);