import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { slugify } from '../../Utils';
import { useTranslation } from 'react-i18next';

import { Alert, Autocomplete, IconButton, Grid, TextField, Tooltip, InputAdornment, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';

import {
  useActiveMarkerContext,
  useActualDistrictContent,
  useMarkerDistrictContext,
  useListCafesContext,
  useCurrentCafeContext,
} from '../../contexts/MapsContext';
import { usePostApi } from '../hooks/apiCalls';

import AddCafeForm from '../Form/AddCafeForm';

import './AppNavigation.scss';

import { FormValues, cityLocations } from '../../types/cafe';

const districts: cityLocations = [
  { name: 'All' },
  { name: 'Letná' },
  { name: 'Karlín' },
  { name: 'Dejvice' },
  { name: 'Vinohrady' },
  { name: 'Nusle' },
  { name: 'Centrum' },
  { name: 'Berlín' }
];

const SearchCafe = () => {
  const { t } = useTranslation();

  const { listCafes } = useListCafesContext();
  const [ searchCafe, setSearchCafe ] = useState<string>('');
  const { setCurrentCafe } = useCurrentCafeContext();
  const history = useHistory();

  const showChooseCafe = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value =  (e.target as HTMLInputElement).value;
      const slug = slugify(value);
      history.push(`/cafe/${slug}`)

      for (const item of listCafes) {
        if (item.name === value) {
          setCurrentCafe(item);
        }
      }
    }
  }

  const chooseCafe = (cafe: string) => {
    setSearchCafe(cafe);
  }

  return (
    <Autocomplete
      freeSolo
      id='search-cafes'
      disableClearable
      value={searchCafe}
      options={listCafes.map((option) => option.name)}
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

  const activeContextValue = useActiveMarkerContext();
  const district = useMarkerDistrictContext();
  const actualDistrict = useActualDistrictContent();
  const [openDialog, setOpenDialog] = useState(false);
  const { isLoading, error, addNewData } = usePostApi();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addCreateCafe = async (data: FormValues) => {
    try {
      console.log('create', data)
      await addNewData(data, '/create');
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  return (
    <>
      { error && (
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
        className='navigation'
      >
        <Grid item sx={{ width: 250 }}>
          <SearchCafe />
        </Grid>
        <Grid item>
          <ul className='navigation-menu'>
            {
              districts.map((item) => {
                const isActive = activeContextValue && item.name === district;
                return (
                  <li
                    className={isActive ? 'active' : ''}
                    key={item.name}
                    onClick={() => actualDistrict(item.name)}>
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </Grid>
        <Grid item>
          <Tooltip title="Přidat novou kavárnu" placement='top'>
            <IconButton onClick={handleOpenDialog}>
              <AddIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
          <AddCafeForm districts={districts} openDialog={openDialog} onClose={handleCloseDialog} isLoading={isLoading} onFormData={addCreateCafe} />
        </Grid>
      </Grid>
    </>
  );
}

export default Navigation;
