import React, { useState } from "react";
import PropTypes from "prop-types";
import AlumniQuickView from "../AlumniQuickView";
import {
   makeStyles,
   Box,
   Typography,
   Modal,
   Backdrop,
   Fade
 } from "@material-ui/core";
 
const useStyle = makeStyles(() => ({
  root: {
    minWidth: 275,
    height: 200,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '10px',
    border: '5px solid #ED2939',
    cursor: 'pointer',
    transition: "box-shadow .5s, transform .5s",
    "&:hover": {
      boxShadow: "0 0 80px rgba(33,33,33,.2)",
      transform: "scale(1.1)"
    },
  },
  basicContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  topLeftCard: {
    width: '100%',
    height: '30%',
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 15
  },
  bottomLeftCard: {
    width: '100%',
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function AlumniCard({ id, alumnus }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyle();

  function handleOpen() {
    setIsOpen(true);
  };

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <div 
        className={classes.root}
        onClick={() => handleOpen()}
      >
        <div className={classes.basicContent}>
          <div className={classes.topLeftCard}>
            <Typography style={{fontSize: 35, fontWeight: "bold"}}>
              {alumnus.First_Name + " " + alumnus.Last_Name}
            </Typography>
          </div>
          <div className={classes.bottomLeftCard}>
            <Typography style={{fontSize: 25}}>
              {alumnus.Employer}
            </Typography>
            <Typography style={{fontSize: 25}}>
              {"Class of "+ alumnus.Graduation_Date}
            </Typography>
          </div>
        </div>
      </div>
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box style={{outline: 'none'}}>
          <AlumniQuickView id={id} alumnus={alumnus}/>
        </Box>
      </Fade>
    </Modal>
  </>
  )
}

AlumniCard.propTypes = {
  id: PropTypes.string.isRequired,
  alumnus: PropTypes.object.isRequired
};

export default AlumniCard;