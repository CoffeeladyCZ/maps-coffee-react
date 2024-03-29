import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


import { Alert, Autocomplete, Button, IconButton, Grid, TextField, Tooltip, CircularProgress, InputAdornment, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';

import { slugify } from '../../Utils';
import { getLocationsData, addNewData } from '../../Utils/apiUtils';
import { CafeDetailResponse } from '../../types/cafe';
import { RootState } from '../../store';
import { setLocations, setCurrentLocation } from '../../store/locations';
import { setActualCafe } from '../../store/cafeDetail';


import AddCafeForm from '../Cafe/AddCafeForm';

const SearchCafe = () => {
  const { t } = useTranslation();

  const [ searchCafe, setSearchCafe ] = useState<string>('');
  const history = useHistory();
  const dispatch = useDispatch();

  const cafeList = useSelector((state: RootState) => state.cafeList.cafeList);

  const showChooseCafe = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && cafeList) {
      const value =  (e.target as HTMLInputElement).value;
      const slug = slugify(value);
      history.push(`/cafe/${slug}`)

      for (const item of cafeList) {
        if (item.name === value) {
          dispatch(setActualCafe(item));
        }
      }
    }
  }

  const chooseCafe = (cafe: string) => {
    setSearchCafe(cafe);
  }

  if (!cafeList) {
    return ( <CircularProgress color='primary' />)
  }

  return (
    <Autocomplete
      freeSolo
      id='search-cafes'
      disableClearable
      value={searchCafe}
      options={cafeList.map((option) => option.name)}
      onChange={(e, value) => chooseCafe(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('searchCafe')}
          size='small'
          onKeyDown={showChooseCafe}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <InputAdornment position='end'>
                <Search />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const currentLocation = useSelector((state: RootState) => state.locations.currentLocation);
  const locations = useSelector((state: RootState) => state.locations.locations);

  const getLocations = useCallback(async() => {
    setIsLoading(true);
    try {
      const response = await getLocationsData();
      if (response) {
        dispatch(setLocations(response));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(()=> {
    getLocations();
  }, [getLocations]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addCreateCafe = async (data: CafeDetailResponse) => {
    try {
      await addNewData(data, '/api/create');
    } catch (error) {
      setShowError(true);
      return null;
    }
  };

  return (
    <>
      { showError && (
        <Snackbar autoHideDuration={6000}  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Alert severity="error">
            { t('errors.somethingWrong')}
          </Alert>
        </Snackbar>
      )}
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        rowGap={2}
      >
        <Grid item sx={{ width: 250 }}>
          <SearchCafe />
        </Grid>
        <Grid item>
          <div className='flex-1 m-0'>
            {
              locations && locations.map((item) => {
                const isActive = item === currentLocation;
                return (
                  <Button
                    color={isActive ? 'primary' : 'secondary'}
                    className='cursor-pointer underline uppercase font-semibold text-lg p-2 text-center'
                    key={item}
                    onClick={() => dispatch(setCurrentLocation(item))}
                  >
                    {item}
                  </Button>
                );
              })}
          </div>
        </Grid>
        <Grid item>
          <Tooltip title='Přidat novou kavárnu' placement='top'>
            <IconButton onClick={handleOpenDialog}>
              <AddIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
          <AddCafeForm openDialog={openDialog} onClose={handleCloseDialog} isLoading={isLoading} onFormData={addCreateCafe} />
        </Grid>
      </Grid>
    </>
  );
}

export default Navigation;
