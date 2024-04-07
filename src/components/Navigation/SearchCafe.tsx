import { useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete, CircularProgress, InputAdornment, TextField, Typography } from "@mui/material";
import { slugify } from "../../Utils/common";
import { RootState } from "../../store";
import { setActualCafe } from "../../store/cafeDetail";
import { Search } from "@mui/icons-material";

type SearchCafeProps = {
  isLoading: boolean;
}

const SearchCafe: FC<SearchCafeProps> = ({ isLoading }) => {
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

  if (isLoading) {
    return ( <CircularProgress color='primary' />)
  }

  return (
    <>
      {
        cafeList ? (
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
        ) : (
          <Typography>{t('dataNotExist')}</Typography>
        )
      }
    </>


  )
}

export default SearchCafe;
