import axios from 'axios';
import types from './signupActionTypes';
import notify from '../Toaster';

const signup = (user, location) => {
  const loading = () => ({ type: types.SIGNUP_LOADING });
  const success = () => ({
    type: types.SIGNUP_SUCCESS,
    message: 'User has successfully registered'
  });
  const fail = error => ({ type: types.SIGNUP_FAIL, error });

  return dispatch => {
    dispatch(loading());
    axios.post(`${process.env.API_URL}auth/signup`, user)
      .then(
        res => {
          dispatch(success());
          location.assign('/login');
          notify('User successfully registere');
        },
        err => {
          dispatch(fail(err.response?.data?.error ?? 'Network error'));
          notify(err.response?.data?.error ?? 'Network error');
        });
  };
};

export default signup;
