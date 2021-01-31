import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../../store/actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircleRounded } from "@material-ui/icons";
import { Typography, IconButton, Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyle = makeStyles(() => ({
  headerBarContainer: {
    backgroundColor: "black",
    borderRadius: "1px",
    border: "1px solid borderGrey",
    color: "white",
    width: "100%",
    height: "70px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainBodyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
  },
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
  },
  title: {
    marginLeft: "auto",
  },
  userButtons: {
    color: "white",
    fontSize: 50,
  },
  iconButton: {
    marginLeft: "auto",
  },
}));

function Header({ children, logoutUser }) {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose();
    logoutUser(history);
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.headerBarContainer}>
        <NavLink
          style={{ textDecoration: "none", color: "white" }}
          exact
          to="/home"
          className={classes.title}
        >
          <Typography variant="h4" noWrap>
            DSP Alumni Database
          </Typography>
        </NavLink>
        <IconButton
          aria-label="access-account"
          onClick={(event) => handleClick(event)}
          className={classes.iconButton}
        >
          <AccountCircleRounded className={classes.userButtons} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={handleLogOut}
          >
            Logout
          </MenuItem>
          <a
            style={{ textDecoration: 'none', color: 'black' }}
            href="https://github.com/frankhee/dsp-alumni-database-app"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MenuItem>
              View App Source
            </MenuItem>
          </a>
        </Menu>
      </div>
      <div className={classes.mainBodyContainer}>{children}</div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.object,
};

export default connect(null, { logoutUser })(Header);
