import {
  GET_USER_URL,
  CALLBACK_URL,
  SIGNOUT_URL,
  ADD_FRIEND,
  REMOVE_FRIEND,
  CHALL_FRIEND,
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

export const addFriend = async (token, email) => {
  try {
    const res = await fetch(ADD_FRIEND, {
      method: 'POST',
      body: JSON.stringify({email}),
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

export const removeFriend = async (token, id) => {
  try {
    const res = await fetch(REMOVE_FRIEND, {
      method: 'POST',
      body: JSON.stringify({id}),
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

export const challengeFriend = async (token, email) => {
  try {
    const res = await fetch(CHALL_FRIEND, {
      method: 'POST',
      body: JSON.stringify({email}),
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

