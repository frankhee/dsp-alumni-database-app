import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../component/ui/Header";
import SearchBar from "../../component/widgets/SearchBar"
import AlumniCard from "../../component/widgets/AlumniCard";
import { makeStyles, Grid, Button, Typography } from '@material-ui/core';
import { IceCream } from 'react-kawaii';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minWidth: "100vw",
    minHeight: "100vh",
    backgroundColor: "#d8bfd8"
  },
  productContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  loadButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20
  },
  searchFailContainer: {
    width: "100%",
    height: "100%",
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center"
  },
  searchFailSVG: {
    display: "block",
    margin: "auto"
  }
}));

function Layout({ 
  alumni, 
  auth, 
  loadAlumni, 
  moreAlumni, 
  isSearch,
  isValidSearch 
}) {
  const classes = useStyles();
  const columnSize = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
  };

  function loadMoreAlumni() {
    const loadAlumniAsync = async () => await loadAlumni();
    loadAlumniAsync();
  };

  function handleSearch(input) {
    const userInput = {
      input: input
    }
    const loadAlumniAsync = async () => await loadAlumni(userInput);
    loadAlumniAsync();
  };

  useEffect(() => {
    const loadAlumniAsync = async () => await loadAlumni();
    if (Object.keys(alumni).length === 0 && auth.isAuthenticated && !isSearch) {
      loadAlumniAsync();
    }
  },[auth.isAuthenticated, loadAlumni, alumni, isSearch])

  return (
    <Header>
      <div className={classes.pageContainer}>
        <SearchBar handleSearch={handleSearch}/>
      {
        isValidSearch ? 
          Object.keys(alumni).length > 0 &&
          <React.Fragment>
            <div className={classes.productContainer}>
              <Grid
                container
                spacing={10}
                style={{
                  width: "100%",
                  height: "100%",
                  margin: 0,
                }}
              >
                {
                  Array.from(Object.keys(alumni)).map((key, index) => (
                  <Grid key={index} item {...columnSize}>
                      <AlumniCard 
                        key={key} 
                        id={key}
                        alumnus={alumni[key]}
                      />
                  </Grid>
                  ))
                }
              </Grid>
            </div>
            {
              moreAlumni &&
              <div className={classes.loadButtonContainer}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => loadMoreAlumni()}
                >
                  Load More
                </Button>
              </div>
            }
          </React.Fragment>   
            :
          <div className={classes.searchFailContainer}>
            <IceCream size={300} mood="sad" color="#FDA7DC" className={classes.searchFailSVG}/>
            <Typography variant="h3" align="center">
              No Result Found, Try Again!
            </Typography>
          </div>
      }
      </div>
    </Header>
  );
}

Layout.propTypes = {
  alumni: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadAlumni: PropTypes.func.isRequired,
  moreAlumni: PropTypes.bool.isRequired,
  isSearch: PropTypes.bool.isRequired,
  isValidSearch: PropTypes.bool.isRequired
};

export default Layout;