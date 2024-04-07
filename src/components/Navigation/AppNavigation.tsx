import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


import { Button, IconButton, Grid, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { slugify } from '../../Utils/common';
import { getLocationsData, addNewData } from '../../apiMethods';
import { CafeDetailResponse } from '../../types/cafe';
import { RootState } from '../../store';
import { setLocations, setCurrentLocation } from '../../store/locations';

import AddCafeForm from '../Cafe/AddCafeForm';
import SimpleAlert from '../common/SimpleAlert/SimpleAlert';
import SearchCafe from './SearchCafe';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

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
      setOpenAlert(true);
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
    setIsLoading(true);
    try {
      await addNewData(data, '/api/cafe/create');
    } catch (error) {
      setOpenAlert(true);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SimpleAlert
        severity="error"
        message={t('errors.somethingWrong')}
        open={openAlert}
        onCloseAlert={() => setOpenAlert(false)}
      />
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        rowGap={2}
      >
        <Grid item sx={{ width: 250 }}>
          <SearchCafe isLoading={isLoading} />
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
