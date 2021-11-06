import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Avatar,
  FormControl,
  Input,
  InputLabel,
  Button,
  InputAdornment,
  CssBaseline,
} from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { loginAsync } from 'redux/AuthSlice';
import { getSessionData } from 'utils/helpers';
import { ButtonLoader } from 'components/ButtonLoader';
import useStyle from './style';

const INITIAL_VALUE = {
  email: '',
  password: '',
  passwordConfrim: '',
  hidePassword: true,
  hidePasswordConfirm: true,
};

export const Login = () => {
  const [fields, setFields] = useState(INITIAL_VALUE);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((state) => state.auth?.error);
  const isLoading = useSelector((state) => state.auth?.isLoading);
  const { userId } = getSessionData();

  useEffect(() => {
    if (error) enqueueSnackbar(error.message || error, { variant: 'error' });
    if (userId) history.push('/homepage');
    // eslint-disable-next-line
  }, [error, userId]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
    const loginData = { email, password };

    try {
      await dispatch(loginAsync(loginData));
    } catch (e) {
      enqueueSnackbar(e, { variant: 'error' });
    }
  };

  const showPassword = () => {
    setFields((prev) => ({ ...prev, hidePassword: !fields.hidePassword }));
  };

  const classes = useStyle();
  return (
    <div className={classes.main}>
      <CssBaseline />

      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PeopleAltIcon className={classes.icon} />
        </Avatar>
        <form className={classes.form}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="email" className={classes.labels}>
              e-mail
            </InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              className={classes.inputs}
              disableUnderline={true}
              {...register('email')}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" className={classes.errorText}>
              {errors.email?.message}
            </Typography>
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="password" className={classes.labels}>
              password
            </InputLabel>
            <Input
              id="password"
              name="password"
              className={classes.inputs}
              disableUnderline={true}
              type={fields.hidePassword ? 'password' : 'input'}
              {...register('password')}
              error={errors.password ? true : false}
              endAdornment={
                fields.hidePassword ? (
                  <InputAdornment position="end">
                    <VisibilityOffTwoToneIcon
                      fontSize="medium"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <VisibilityTwoToneIcon
                      fontSize="medium"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                )
              }
            />
            <Typography variant="inherit" className={classes.errorText}>
              {errors.password?.message}
            </Typography>
          </FormControl>
          <div className={classes.buttonLoaderWrapper}>
            {isLoading && <ButtonLoader />}
          </div>
          <Button
            disabled={isLoading}
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </form>
        <Button disabled={isLoading} onClick={() => history.push('/register')}>
          Join free
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
