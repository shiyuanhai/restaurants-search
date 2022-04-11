# Restaurants Search

## Tech Stack

React + React InstantSearch(Algolia) + MUI + notistack

## Get Started

```shell
# set up an index on Algolia
# rename .env.sample  to .env.local
# fill in your own app id, api key and index name
yarn
yarn start
```

Tips: You can use "Fill For Test" button to auto fill the form when you try to add a restaurant.

## Gotchas

- Configure 'Searchable attributes' in Index configuration to set a list of attributes to be searchable from SearchBox.
- Configure 'Facets' in Index configuration in order to filter by 'food_type'.
- use .wait() to wait for aynsc operations sent to index.

## Future Improvements

- for small screen(mobile), use a popover to display filter
- move styles to css file
- react instantsearch hook + nextjs

## References

https://www.algolia.com/doc/guides/building-search-ui/getting-started/react/

https://www.algolia.com/doc/api-reference/api-methods/wait-task/
