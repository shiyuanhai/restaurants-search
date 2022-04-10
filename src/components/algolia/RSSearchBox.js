import { TextField } from '@mui/material';
import { connectSearchBox } from 'react-instantsearch-dom';

const RSSearchBox = ({ currentRefinement, refine }) => (
  <form noValidate action="" role="search">
    <TextField
        placeholder={'search restaurants...'}
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        sx={{width: '100%'}}
      />
  </form>
);

export default connectSearchBox(RSSearchBox);