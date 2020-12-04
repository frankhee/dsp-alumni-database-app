import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel'
import {
  makeStyles,
  Button,
  Typography,
} from '@material-ui/core';
import AlumniServices from '../../../services/api/AlumniServices';

const useStyle = makeStyles((theme) => ({
  viewContainer: {
    width: 800,
    height: 650,
    backgroundColor: 'white',
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'row'
  },
  leftContainer: {
    width: '50%',
    height: '100%'
  },
  rightContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSlider: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 14,
  },
  infoContainer: {
    borderLeft: '2px solid black',
    padding: '30px',
    marginBottom: '10px',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'    
  }
}));

function AlumniQuickView({ id, alumnus }) {
  const classes = useStyle();

  async function sendInfo() {
    const userKey = {
      id: id
    }
    const response = await AlumniServices.getProduct(userKey);
    alert(response.message)
  }

  return (
    <div className={classes.viewContainer}>
      <div className={classes.leftContainer}>
        {/* <Carousel 
          className={classes.imgSlider}
          autoPlay={false}
          indicators={false}
        >
          {
            alumnus.Picture.map((pic) => (
              <div 
                style={{
                  width: '400px',
                  height: '650px',
                  margin: '10px',
                  backgroundImage: `url(${pic.url})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '300px 300px'
                }}
                key={pic.id}
              />
            ))
          }
        </Carousel> */}
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.infoContainer}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {alumnus.Country}
          </Typography>
          <Typography variant="h5" component="h2">
            {alumnus.State}
          </Typography>
          <Typography variant="h5" component="h2">
            ${alumnus.City}
          </Typography>
          <Button 
            variant='outlined' 
            color='primary'
            onClick={() => sendInfo()}
          >
            Send Product Information to Your Email
          </Button>
        </div>
      </div>
    </div>
  )
}

AlumniQuickView.propTypes = {
  id: PropTypes.string.isRequired,
  alumnus: PropTypes.object.isRequired
}

export default AlumniQuickView;

