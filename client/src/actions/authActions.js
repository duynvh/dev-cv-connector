import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (user, history) => dispatch => {
    axios
        .post('/api/users/register', user)
        .then(res => {
            if (res.data.errors) 
            {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.errors
                })
            }
            else 
            {
                history.push('/login');
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Login - Get User Token
export const loginUser = (user, history) => dispatch => {
    axios
        .post('/api/users/login', user)
        .then(res => {
            if(res.data.errors) {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.errors
                })
            }
            else {
                // Save to localStorage
                const { token } = res.data;

                // Set token to localStorage
                localStorage.setItem('jwtToken', token);

                // Set token to Auth header
                setAuthToken(token);

                // Decode token to get user data
                const decoded = jwt_decode(token); 

                // Set current user
                dispatch(setCurrentUser(decoded))
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
} 

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');

    // Remove auth header for future requests
    setAuthToken(false);

    // Set current user to {} which will set isAuthenticated
    dispatch(setCurrentUser({}));
}