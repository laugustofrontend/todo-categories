import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { AccountCircle, VpnKeyRounded } from '@material-ui/icons';

import { Login } from '@services/auth';
import { setToken } from '@utils';

import styles from './style';
import LoginValidation from './validation';

const LoginPage = () => {
  const classes = styles();
  const history = useHistory();
  const changeRoute = () => history.push('/categories');
  const { handleBlur, handleChange, handleSubmit, resetForm, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginValidation,
    onSubmit(inputValues) {
      Login(inputValues)
        .then(res => {
          const { token } = res.data;
          setToken('token', token);
          resetForm();
          changeRoute();
        })
        .catch(error => console.error('error => ', error));
    }
  });

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.title}>
          Todo Categories
        </Grid>

        <Grid item xs={12}>
          <Grid className={classes.containerInput} container spacing={1} justify="center" alignItems="flex-end">
            <Grid item xs={10}>
              <InputLabel htmlFor="email">Enter your Email</InputLabel>
              <Input
                className={errors.email && touched.email ? classes.error : classes.input}
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                startAdornment={(
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )}
                autoFocus
              />
              {errors.email && touched.email && <p className={classes.errorMessage}>{errors.email}</p>}
            </Grid>
          </Grid>

          <Grid container spacing={1} justify="center" alignItems="flex-end">
            <Grid item xs={10}>
              <InputLabel htmlFor="password">Enter your Password</InputLabel>
              <Input
                className={errors.password && touched.password ? classes.error : classes.input}
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                startAdornment={(
                  <InputAdornment position="start">
                    <VpnKeyRounded />
                  </InputAdornment>
                )}
              />
              {errors.password && touched.password && <p className={classes.errorMessage}>{errors.password}</p>}
            </Grid>
          </Grid>

          <Grid container className={classes.containerButton} alignItems="center" justify="center">
            <Grid item>
              <Button type="submit" variant="contained" color="primary" size="large">
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
