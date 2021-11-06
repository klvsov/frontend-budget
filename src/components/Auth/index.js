import React, {useEffect, useState} from "react";
import {Typography, Paper, Avatar, FormControl, Input, InputLabel, Button, InputAdornment, CssBaseline} from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {GoogleLogin} from 'react-google-login';

import {registerAsync, loginAsync, googleLoginAsync} from "redux/AuthSlice";
import {getSessionData} from "utils/helpers";
import {ButtonLoader} from "components/ButtonLoader"
import useStyle from "./style";

const INITIAL_VALUE = {
  email: null,
  password: null,
  passwordConfrim: null,
  hidePassword: true,
  hidePasswordConfirm: true
};

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;

export const Registration = () => {
  
  const [fields, setFields] = useState(INITIAL_VALUE);
  
  const [isRegisterView, setIsRegisterView] = useState(true);
  
  const {enqueueSnackbar} = useSnackbar();
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  const error = useSelector(state => state.auth?.error);
  const isLoading = useSelector(state => state.auth?.isLoading);
  const {userId} = getSessionData();
  
  const googleResponse = async (response) => {
    const email = await response.profileObj.email;
    if(email) {
      try {
        await dispatch(googleLoginAsync({email}));
      } catch (e) {
        enqueueSnackbar(e.message, {variant: "error"});
      }
    }
  };
  
  useEffect(() => {
    if (error) enqueueSnackbar(error.message || error, {variant: "error"});
    if (userId) history.push("/homepage");
    // eslint-disable-next-line
  }, [error, userId]);
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword:Yup.mixed().test('match', 'Passwords do not match', function (password) {
      return password === this.parent.confirmPassword
    }).required('Password confirm is required')
  });
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = async (data) => {
    const {email, password} = data;
    const registerData = {email, password};
    if (isRegisterView) {
      try {
        const data = await dispatch(registerAsync(registerData));
        if (data?.payload?.message === "Registration success") {
          setFields(INITIAL_VALUE);
          setIsRegisterView(false);
        }
      } catch (e) {
        enqueueSnackbar(e.message, {variant: "error"});
      }
    }
    if (!isRegisterView) {
      try {
        await dispatch(loginAsync(registerData));
      } catch (e) {
        enqueueSnackbar(e.message, {variant: "error"});
      }
    }
  };
  
  
  const showPassword = () => {
    setFields((prev) => ({...prev, hidePassword: !fields.hidePassword}))
  };
  
  const showPasswordConfirm = () => {
    setFields((prev) => ({...prev, hidePasswordConfirm: !fields.hidePasswordConfirm}))
  };
  
  const classes = useStyle();
  return (
    <div className={classes.main}>
      <CssBaseline/>
      
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PeopleAltIcon className={classes.icon}/>
        </Avatar>
        <form
          className={classes.form}
        >
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
              {...register("email")}
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
              type={fields.hidePassword ? "password" : "input"}
              {...register("password")}
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
          
          {isRegisterView && (
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
                confrim password
              </InputLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                className={classes.inputs}
                disableUnderline={true}
                onClick={fields.showPassword}
                type={fields.hidePasswordConfirm ? "password" : "input"}
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
                endAdornment={
                  fields.hidePasswordConfirm ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={showPasswordConfirm}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={showPasswordConfirm}
                      />
                    </InputAdornment>
                  )
                }
              />
              <Typography variant="inherit" className={classes.errorText}>
                {errors.confirmPassword?.message}
              </Typography>
            </FormControl>
          )}
          <div className={classes.buttonLoaderWrapper}>
            {isLoading && <ButtonLoader /> }
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
            {isRegisterView ? "Sign Up" : "Login"}
          </Button>
        </form>
        <div className={classes.googleButton}>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign Up with Google"
            onSuccess={googleResponse}
            onFailure={googleResponse}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        {isRegisterView
          ?
          (<Button disabled={isLoading} onClick={() => setIsRegisterView(false)}>Already a member? Log in</Button>)
          :
          (<Button disabled={isLoading} onClick={() => setIsRegisterView(true)}>Join free</Button>)
        }
      </Paper>
    </div>
  );
};


export default Registration;
