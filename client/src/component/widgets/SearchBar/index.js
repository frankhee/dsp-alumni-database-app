import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  filterContainer: {
    width: '100%',
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: "25px"
  },
  searchBar: {
    width: '80%'
  }
}));

function SearchBar({ handleSearch }) {
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();
  
  return (
    <div className={classes.filterContainer}>
      <FormControl className={classes.searchBar}>
        <InputLabel htmlFor="standard-adornment-search">Search by name, location, employer, and graduation date</InputLabel>
        <Input
          id="search-bar"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={(event) => {
            if(event.key === 'Enter'){
              handleSearch(searchText.toLowerCase());
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleSearch(searchText.toLowerCase())}
                aria-label="submit-search"
              >
                <SearchOutlined/>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  )
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func
};

export default SearchBar;