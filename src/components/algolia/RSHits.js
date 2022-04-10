import { AttachMoney, Delete, LocationOn, Payment, Phone } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Grid, Typography, Rating, Box, CardActions, IconButton, Tooltip, Button } from '@mui/material';
import { connectHits } from 'react-instantsearch-dom';

const RSHit = ( { hit }) => (
  <Card sx={{ height: '100%', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <CardMedia 
      component='img'
      // height="140"
      image={hit.image_url}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {hit.name}
        <IconButton color="warning">
            <Delete />
        </IconButton>
      </Typography>
      <Typography gutterBottom variant="p" component="div">
        {hit.dining_style}  &#8226; {hit.food_type}  &#8226;  {hit.neighborhood}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={12} lg={6}>
          <Rating name="read-only" value={hit.stars_count} readOnly />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Box>
            {hit.reviews_count} Reviews
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} lg={6}>
          <Rating name="read-only" value={hit.price} icon={<AttachMoney />} emptyIcon={''} readOnly />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} sx={{display: 'flex', alignItems: 'center'}}>
          <Box>
            {hit.price_range}
          </Box>
        </Grid>
      </Grid>
      <CardActions>
        <Grid container>
          <Grid item md={12} lg={7}>
            <Tooltip title={`${hit.address}, ${hit.city}, ${hit.state}, ${hit.postal_code}, ${hit.country}`}>
              <IconButton>
                <LocationOn />
              </IconButton>
            </Tooltip>
            <Tooltip title={`${hit.phone_number}`}>
              <IconButton>
                <Phone />
              </IconButton>
            </Tooltip>
            <Tooltip title={hit.payment_options.join(', ')}>
              <IconButton>
                <Payment />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item md={12} lg={5}>
            <Button variant="outlined" href={hit.reserve_url}>
              Reserve
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </CardContent>
  </Card>
);

const RSHits = ( { hits } ) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {
        hits.map( (hit) => {
          return (
            <Grid key={hit.objectID} item xs={2} sm={4} >
              <RSHit hit={hit} />
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default connectHits(RSHits);