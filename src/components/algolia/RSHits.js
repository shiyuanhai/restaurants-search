import { AttachMoney, Delete, LocationOn, Payment, Phone } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Grid, Typography, Rating, Box, CardActions, IconButton, Tooltip, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Backdrop, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { deleteRestaurant } from '../../utils/algolia';

const RSHits = ( { hits, setRefresh } ) => {
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [hitToDelete, setHitToDelete] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  
  const handleClickOpen = (hit) => {
    setHitToDelete(hit);
    setOpen(true);
  };

  const handleClose = () => {
    setHitToDelete(null);
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpenBackdrop(true);
    const res = await deleteRestaurant(hitToDelete.objectID);
    setOpenBackdrop(false);

    if (res.success) {
      setRefresh(true);
      enqueueSnackbar(`${hitToDelete.name} is deleted.`, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(`something is wrong... ${res.msg}`, {
        variant: 'error',
      });
    }
    
    handleClose();
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {
        hits.map( (hit) => {
          return (
            <Grid key={hit.objectID} item xs={2} sm={4} >
              <Card sx={{ height: '100%', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardMedia 
                  component='img'
                  // height="140"
                  image={hit.image_url}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hit.name}
                    <IconButton color="warning" onClick={() => handleClickOpen(hit)}>
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
                        <Tooltip enterTouchDelay={0} title={`${hit.address}, ${hit.city}, ${hit.state}, ${hit.postal_code}, ${hit.country}`}>
                          <IconButton>
                            <LocationOn />
                          </IconButton>
                        </Tooltip>
                        <Tooltip enterTouchDelay={0} title={`${hit.phone_number}`}>
                          <IconButton>
                            <Phone />
                          </IconButton>
                        </Tooltip>
                        <Tooltip enterTouchDelay={0} title={hit.payment_options.join(', ')}>
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
            </Grid>
          );
        })
      }
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Delete A Restaurant
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete {hitToDelete ? hitToDelete.name : ''}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleConfirm}>Yes</Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </Grid>
  );
};

export default connectHits(RSHits);