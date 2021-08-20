import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useSnackbar } from 'notistack';

const AuthGuardRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Route
      {...rest}
      render={({ routeProps }) => {
        if (token) {
          return (
            <DashboardLayout>
              <Component {...routeProps} />
            </DashboardLayout>
          );
        } else {
          enqueueSnackbar('Please Login!', {
            variant: 'error',
          });
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

AuthGuardRoute.propTypes = {
  component: PropTypes.func,
};

export default AuthGuardRoute;
