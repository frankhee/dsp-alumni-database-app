import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import { 
  WorkOutlineOutlined,
  HomeOutlined,
  SchoolOutlined,
  EmailOutlined,
  LanguageOutlined 
} from '@material-ui/icons';
import dspLogo from '../../../asset/DSP_Logo.png';

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
    width: '30%',
    height: '100%',
    borderTopLeftRadius: '25px',
    borderBottomLeftRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '2px solid #ED2939',
    backgroundColor: '#ED2939'
  },
  logo: {
    width: '90%',
    objectFit: 'cover',
  },
  rightContainer: {
    width: '70%',
    height: '100%',
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topText: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  bottomText: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  },
  divider: {
    border: '1px solid #ED2939',
    marginRight: 0,
    marginLeft: 0
  },
  icon: {
    fontSize: 30,
    marginRight: "10px",
  },
  iconInfo: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  infoContainer: {
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
  const linkedInExist = alumnus.LinkedIn !== "N/A";

  return (
    <div className={classes.viewContainer}>
      <div className={classes.leftContainer}>
        <img 
          src={dspLogo}
          className={classes.logo}
          alt="logo"
        />
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.infoContainer}>
          <div className={classes.topText}>
            <Typography variant="h3">
              {alumnus.First_Name + " " + alumnus.Last_Name}
            </Typography>
            <Typography 
              variant="h5" 
              className={classes.iconInfo}
            >
              <WorkOutlineOutlined className={classes.icon}/>
              {alumnus.Employer}
            </Typography>
            <hr className={classes.divider}/>
          </div>
          <div className={classes.bottomText}>
            <Typography 
              variant="h5" 
              component="h2" 
              color="textSecondary" 
              className={classes.iconInfo}
            >
              <HomeOutlined className={classes.icon}/>
              {alumnus.City + ", " + alumnus.State}
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              color="textSecondary" 
              className={classes.iconInfo}
            >
              <SchoolOutlined className={classes.icon}/>
              {alumnus.Graduation_Date}
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              color="textSecondary" 
              className={classes.iconInfo}
            >
              <EmailOutlined className={classes.icon}/>
              {alumnus.Email}
            </Typography>
            {
              linkedInExist &&
              <Typography 
                variant="h5" 
                component="h2" 
                color="textSecondary" 
                className={classes.iconInfo}
              >
                <LanguageOutlined className={classes.icon}/>
                <a 
                  href={alumnus.LinkedIn} 
                  style={{color: 'inherit'}} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Typography>
            }
          </div>
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

