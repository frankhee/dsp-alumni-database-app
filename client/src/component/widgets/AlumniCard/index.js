import React, { useState } from "react";
import PropTypes from "prop-types";
import AlumniQuickView from "../AlumniQuickView";
import DataFormatServices from "../../../services/format/DataFormatServices";
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
    minWidth: 300,
    height: 200,
    backgroundColor: '#9370db',
    color: '#9370db',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: "box-shadow .5s, transform .5s",
    "&:hover": {
      boxShadow: "0 20px 50px rgba(0,0,0,.8)",
      transform: "scale(1.1)",
    },
  },
  topCard: {
    width: '100%',
    height: '15%',
    backgroundColor: '#9370db',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  basicContent: {
    height: '85%',
    backgroundColor: '#fffafa',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: '20px',
    paddingRight: '20px',
    border: '5px solid #9370db',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  topLeftCard: {
    width: '100%',
    height: '30%',
    display: "flex",
    justifyContent: "center",
    marginTop: 15
  },
  bottomLeftCard: {
    width: '100%',
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    border: '1px solid #dda0dd',
    marginRight: 0,
    marginLeft: 0
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
        <div className={classes.topCard}></div>
        <div className={classes.basicContent}>
          <div className={classes.topLeftCard}>
            <Typography style={{fontSize: 25, fontWeight: "bold"}}>
              {alumnus.Name !== "n/a" && DataFormatServices.capitalizeWords(alumnus.Name)}
            </Typography>
          </div>
          <hr className={classes.divider}/>
          <div className={classes.bottomLeftCard}>
            <Typography style={{fontSize: 15}}>
              {alumnus.Position !== "n/a" && DataFormatServices.capitalizeWords(alumnus.Position)}
            </Typography>
            <Typography style={{fontSize: 15}}>
              {alumnus.Employer !== "n/a" && DataFormatServices.capitalizeWords(alumnus.Employer)}
            </Typography>
            <Typography style={{fontSize: 15}}>
              {alumnus.Graduation_Date !== "n/a" && "Class of "+ alumnus.Graduation_Date}
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
