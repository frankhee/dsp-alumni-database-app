import { React } from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles, Typography } from '@material-ui/core';
import { SchoolOutlined, RoomOutlined }  from '@material-ui/icons';
import Header from "../../component/ui/Header";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
    animation: "$gradient 8s ease infinite"
  },
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%"
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    }
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  featureButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "300px",
    height: "300px",
    borderRadius: "25px",
    transition: "box-shadow .5s, transform .5s",
    "&:hover": {
      boxShadow: "0 0 80px rgba(33,33,33,.2)",
      transform: "scale(1.3)"
    },
    cursor: "pointer"
  },
  buttonText: {
    color: "white"
  },
}));

function Layout({auth}) {
  const classes = useStyles();

  return (
    <Header>
      <div className={classes.pageContainer}>
        <div className={classes.buttonContainer}>
          <NavLink
            style={{ textDecoration: 'none', color: 'black' }}
            exact
            to="/alumni/allalumni"
          >
            <div className={classes.featureButton}>
              <SchoolOutlined style={{fontSize: 200}}/>
              <Typography variant="h5" className={classes.buttonText}>
                Directory
              </Typography>
            </div>
          </NavLink>
          <NavLink
            style={{ textDecoration: 'none', color: 'black' }}
            exact
            to="#"
          >
            <div className={classes.featureButton}>
              <RoomOutlined style={{fontSize: 200}}/>    
              <Typography variant="h5" className={classes.buttonText}>
                Alumni Map
              </Typography>
              <Typography variant="h5" className={classes.buttonText}>
                (coming soon)
              </Typography>
            </div>
          </NavLink>
        </div>
      </div>
    </Header>
  )
}

export default Layout;
