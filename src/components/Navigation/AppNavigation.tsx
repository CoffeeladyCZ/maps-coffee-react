import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { slugify } from '../../Utils';

import {Autocomplete, Grid, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';

import {
  useActiveMarkerContext,
  useActualDistrictContent,
  useMarkerDistrictContext,
  useListCafesContext,
  useCurrentCafeContext,
} from '../../contexts/MapsContext';

import './AppNavigation.scss';

type districtType = {
  name: string
}

type cityLocations = districtType[];

const districts: cityLocations = [
  { name: 'All' },
  { name: 'Letná' },
  { name: 'Karlín' },
  { name: 'Dejvice' },
  { name: 'Vinohrady' },
  { name: 'Nusle' },
  { name: 'Centrum' },
];

const SearchCafe = () => {
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
          label='Hledat kavárnu'
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
  const activeContextValue = useActiveMarkerContext();
  const district = useMarkerDistrictContext();
  const actualDistrict = useActualDistrictContent();

  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-start'
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
      <Grid item sx={{ paddingLeft: 24 }}>
        <Link to='form'>
          <AddIcon fontSize='large' />
        </Link>
      </Grid>
    </Grid>
  );
}

export default Navigation;
