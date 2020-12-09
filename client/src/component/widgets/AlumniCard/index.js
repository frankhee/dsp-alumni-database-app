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
    backgroundColor: '#3a4660',
    color: '#F2F3F0',
    borderRadius: '10px',
    cursor: 'pointer'
  },
  basicContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: '20px',
    paddingRight: '20px'
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
          <Typography variant="h5" component="h2">
            {alumnus["First Name"] + " " + alumnus["Last Name"]}
          </Typography>
          <Typography>
            {"Employer: "+ alumnus.Employer}
          </Typography>
          <Typography>
            {"Graduate Year: "+ alumnus["Graduation Date"]}
          </Typography>
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