import { ExpandLess, ExpandMore, Search } from '@mui/icons-material';
import { Button, Checkbox, Chip, Collapse, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import React from 'react';

const RSRefinementList = ({
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
  setShowMore,
  showMore,
  attribute
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box>
      <Box style={{display: 'flex'}}>
        <h2 style={{flexGrow: '1'}}>Filters</h2>
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          {
            !isExpanded ? <ExpandMore /> : <ExpandLess />
          }
        </IconButton>
      </Box>
      
      <Collapse in={isExpanded}>
        <h3 style={{flexGrow: '1'}}>Filter By {attribute}</h3>
        <Box style={{display: 'flex'}}>
          <IconButton disabled>
            <Search />
          </IconButton>
          <InputBase
            placeholder={`search ${attribute}`}
            type="search"
            onChange={event => searchForItems(event.currentTarget.value)}
            style={{flexGrow: '1'}}
          />
        </Box>

        <List disablePadding={true} >
          {items.map(item => {
            return (
              <ListItem 
                disablePadding={true}
                key={item.label}>
                <ListItemButton dense
                  onClick={event => {
                    event.preventDefault();
                    refine(item.value);
                  }} >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.isRefined}
                      tabIndex={-1}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    {item.label}
                    <Chip size="small" variant="outlined" label={item.count} style={{marginLeft: '10px'}}/>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Button onClick={() => setShowMore(!showMore)}>{!showMore ? 'Show more...' : 'Show less...'}</Button>
      </Collapse>
    </Box>
  );
};

export default React.memo(
  connectRefinementList(RSRefinementList)
);