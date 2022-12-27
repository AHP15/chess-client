import {
  GET_USER_URL,
  CALLBACK_URL,
  SIGNOUT_URL,
} from '../constants/endPoints';

export const getUser = async (token) => {
  try {
    const res = await fetch(GET_USER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err.message,
    }
  }
};

export const getCallback = async () => {
  try {
    const res = await fetch(CALLBACK_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err.message,
    }
  }
};

export const signOut = async (token) => {
  try {
    const res = await fetch(SIGNOUT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err.message,
    }
  }
};