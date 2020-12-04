import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute';
import { makeStyles } from '@material-ui/core';
import { Login, Register, Catalog } from '../../pages';
import RedirectPage from '../../services/authentication/Redirect'

const useStyle = makeStyles(() => ({
  mainPageContainer: {
    width: '100%',
    height: '100%',
  },
}));

function AppRoutes() {
  const classes = useStyle();
  return (
    <div className={classes.mainPageContainer}>
      <Switch>
        <Route exact path="/" component={RedirectPage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <PrivateRoute exact path="/alumni/allalumni" component={Catalog}/>
      </Switch>
    </div>
  )
}

export default AppRoutes;
