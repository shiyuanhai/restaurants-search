import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { addRestaurant } from '../../utils/algolia';

const testRestaurant = {
  "name": "",
  "dining_style": "Casual Dining",
  "food_type": "American",
  "neighborhood": "Downtown / Gaslamp",
  "image_url": "https://www.opentable.com/img/restimages/99943.jpg",
  "reserve_url": "http://www.opentable.com/single.aspx?rid=99943",
  "mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=99943",
  "payment_options": [
    "AMEX",
    "Discover",
    "MasterCard",
    "Visa"
  ],
  "price": 2,
  "price_range": "$30 and under",
  "phone": "6192327581",
  "stars_count": 3.9,
  "reviews_count": 186,
  
  "address": "861 West Harbor Dr",
  "area": "San Diego",
  "city": "San Diego",
  "country": "US",
  "state": "CA",
  "postal_code": "92101",

  "_geoloc": {
      "lat": 32.708708,
      "lng": -117.171296
  }
};

const RenderInputController = ({ name, control, label, rules, type = 'text' }) => {
  return (
    <Controller 
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField 
          onChange={onChange} 
          value={value} 
          label={label}
          error={!!error}
          type={type}
          helperText={error ? error.message : null} />
      )}
      rules={rules}
    />
  );
};

const AddRestaurant = ({ setRefresh }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      "name": "",
      "dining_style": "",
      "food_type": "",
      "neighborhood": "",
      "image_url": "",
      "reserve_url": "",
      "mobile_reserve_url": "",
      "payment_options": [],
      "price": 0,
      "price_range": "",
      "phone": "",
      "stars_count": 0,
      "reviews_count": 0,
      
      "address": "",
      "area": "",
      "city": "",
      "country": "",
      "state": "",
      "postal_code": "",
      
      "_geoloc": {
          "lat": 0,
          "lng": 0
      }
    }
  });
  const [open, setOpen] = useState(false);

  const fillForTest = () => {
    for (var field in testRestaurant) {
      setValue(field, testRestaurant[field]);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (restaurant) => {
    // set phone_number and rounded_stars_count
    restaurant.phone_number = restaurant.phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1)$2-$3");
    restaurant.rounded_stars_count = Math.round(restaurant.stars_count);

    // console.log(restaurant);

    setOpenBackdrop(true);
    const res = await addRestaurant(restaurant);
    setOpenBackdrop(false);

    if (res.success) {
      setRefresh(true);
      enqueueSnackbar(`${restaurant.name} is added.`, {
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
    <>
      <Button variant="contained" onClick={handleClickOpen}>Add Restaurant</Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Grid container>
            <Grid item>
              Add Restaurant
            </Grid>
            <Grid container item direction="row-reverse" flex={1}>
              <Button onClick={fillForTest} variant="contained" color="success">Fill For Test</Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Stack sx={{marginTop: '10px'}} direction={'column'} spacing={2}>
            <RenderInputController 
              name='name'
              control={control}
              label={"Name"}
              rules={{ required: 'Name is required.' }}
            />
            <RenderInputController 
              name='dining_style'
              control={control}
              label={"Dining Style"}
              rules={{ required: 'Dining Style is required.' }}
            />
            <RenderInputController 
              name='food_type'
              control={control}
              label={"Food Type"}
              rules={{ required: 'Food Type is required.' }}
            />
            <RenderInputController 
              name='neighborhood'
              control={control}
              label={"Neighborhood"}
              rules={{ required: 'Neighborhood is required.' }}
            />
            <RenderInputController 
              name='image_url'
              control={control}
              label={"Image Url"}
              rules={{ required: 'Image Url is required.' }}
            />
            <RenderInputController 
              name='reserve_url'
              control={control}
              label={"Reserve Url"}
              rules={{ required: 'Reserve Url is required.' }}
            />
            <RenderInputController 
              name='mobile_reserve_url'
              control={control}
              label={"Mobile Reserve Url"}
              rules={{ required: 'Mobile Reserve Url is required.' }}
            />
            {/* payment options */}
            <RenderInputController 
              name='price'
              type='number'
              control={control}
              label={"Price"}
              rules={{ required: 'Price is required.' }}
            />
            <RenderInputController 
              name='price_range'
              control={control}
              label={"Price Range"}
              rules={{ required: 'Price Range is required.' }}
            />
            <RenderInputController 
              name='phone'
              control={control}
              label={"Phone"}
              rules={{ required: 'Phone is required.' }}
            />
            <RenderInputController 
              name='stars_count'
              type='number'
              control={control}
              label={"Stars Count"}
              rules={{ required: 'Stars Count is required.' }}
            />
            <RenderInputController 
              name='reviews_count'
              type='number'
              control={control}
              label={"Reviews Count"}
              rules={{ required: 'Reviews Count is required.' }}
            />

            <RenderInputController 
              name='address'
              control={control}
              label={"Address"}
              rules={{ required: 'Address is required.' }}
            />
            <RenderInputController 
              name='area'
              control={control}
              label={"Area"}
              rules={{ required: 'Area is required.' }}
            />
            <RenderInputController 
              name='city'
              control={control}
              label={"City"}
              rules={{ required: 'City is required.' }}
            />
            <RenderInputController 
              name='state'
              control={control}
              label={"State"}
              rules={{ required: 'State is required.' }}
            />
            <RenderInputController 
              name='postal_code'
              control={control}
              label={"Postal Code"}
              rules={{ required: 'Postal Code is required.' }}
            />
            <RenderInputController 
              name='country'
              control={control}
              label={"Country"}
              rules={{ required: 'Country is required.' }}
            />

            <RenderInputController 
              name='_geoloc.lat'
              type="number"
              control={control}
              label={"Latitude"}
              rules={{ required: 'Latitude is required.' }}
            />
            <RenderInputController 
              name='_geoloc.lng'
              type="number"
              control={control}
              label={"Longitude"}
              rules={{ required: 'Longitude is required.' }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button variant="contained" onClick={handleClose} color='warning'>Close</Button>
        </DialogActions>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </>
  );
};

export default AddRestaurant;