import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../component/ui/Header";
import SearchBar from "../../component/widgets/SearchBar"
import AlumniCard from "../../component/widgets/AlumniCard";
import { makeStyles, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  productContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  pageContainer: {
    width: "100%",
    height: "100%",
  },
  loadButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20
  },
}));

function Layout({ alumni, auth, loadAlumni, moreAlumni }) {
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
    
  };

  useEffect(() => {
    const loadAlumniAsync = async () => await loadAlumni();
    if (Object.keys(alumni).length === 0 && auth.isAuthenticated) {
      loadAlumniAsync();
    }
  },[auth.isAuthenticated, loadAlumni, alumni])

  return (
    Object.keys(alumni).length > 0 &&
    <Header>
      <div className={classes.pageContainer}>
        <div className={classes.productContainer}>
          <Grid
            container
            spacing={10}
            style={{
              width: "100%",
              margin: 0,
            }}
          >
            <SearchBar handleSearch={handleSearch}/>
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
      </div>
    </Header>
  );
}

Layout.propTypes = {
  alumni: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadAlumni: PropTypes.func.isRequired,
  moreAlumni: PropTypes.bool.isRequired
};

export default Layout;