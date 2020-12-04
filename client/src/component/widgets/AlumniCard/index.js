import React, { useState } from "react";
import PropTypes from "prop-types";
import AlumniQuickView from "../AlumniQuickView";
import {
   makeStyles,
   Box,
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   Typography,
   Modal,
   Backdrop,
   Fade
 } from "@material-ui/core";
 
const useStyle = makeStyles(() => ({
  root: {
    margin: 30,
    maxWidth: 345,
    height: 435,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  media: {
    height: 300,
  },
  vendorName: {
    position: 'absolute',
    bottom: 8,
    left: 8
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
      <Card className={classes.root}>
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image={alumnus.Picture[0].url}
          onClick={() => handleOpen()}
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align='center'>
            {alumnus["First Name"] + " " + alumnus["Last Name"]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.vendorName}>
        <Typography color="textSecondary" component="p">
          {alumnus.Employer}
        </Typography>
      </div>
    </Card>
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