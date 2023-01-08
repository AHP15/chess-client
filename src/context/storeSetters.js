import { fetchData } from '../api/fetch';

import {
  SIGNIN_URL,
  SIGNOUT_URL,
  SIGNUP_URL,
  CALLBACK_URL,
  ADD_FRIEND,
  REMOVE_FRIEND,
  CHALL_FRIEND,
  GET_USER_URL
} from '../constants/endPoints';

// callback state
export const getCallback = async (setter) => {
  const result = await fetchData(CALLBACK_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (result.success) {
    setter({
      correctToken: {
        // For more info please visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function#examples
        callback: new Function(`${result.callback}; return toggleToken;`)(),
        callbackPending: false,
      },
    });
  } else {
    setter({
      alertMessage: {
        type: 'error',
        message: result.error,
      }
    });
  }
};



// user state
export const signIn_signUp = async (data, setter) => {
  setter({
    user: {
      info: null,
      userPending: true,
    }
  });
  const url = data.username ? SIGNUP_URL : SIGNIN_URL;
  const result = await fetchData(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if(result.success) {
    setter({
      user: {
        info: result.user,
        userPending: false,
      }
    });

    localStorage.setItem('token', result.token);
  } else {
    setter({
      user: {
        info: null,
        userPending: false,
      },
      alertMessage: {
        type: 'error',
        message: result.error,
      },
    });
  }
};

export const signOut = async (token, setter) => {
  const result = await fetchData(SIGNOUT_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  if (result.success) {
    localStorage.removeItem('token');
    setter({
      user: {
        info: null,
        userPending: false,
      }
    });
  } else {
    setter({
      alertMessage: {
        type: 'error',
        message: result.error,
      }
    });
  }
};

export const getUser = async (token, setter) => {
  const result = await fetchData(GET_USER_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  if(result.success) {
    setter({
      user: {
        info: result.user,
        userPending: false,
      }
    });
  } else {
    setter({
      user: {
        info: null,
        userPending: false,
      },
      alertMessage: {
        type: 'error',
        message: result.error,
      }
    });
    localStorage.removeItem('token');
  }
};


// friends
export const addFriend = async (email, token, setter, user) => {
  const result = await fetchData(ADD_FRIEND, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  if(result.success) {
    setter({
      user: {
        info: {
          ...user.info,
          friends: [...user.info.friends, result.friend],
        },
        userPending: false,
      },
      alertMessage: {
        type: 'success',
        message: result.message,
      },
    });
  } else {
    setter({
      alertMessage: {
        type: 'error',
        message: result.error,
      }
    })
  }
};

export const removeFriend = async (id, token, setter, user) => {
  const result = await fetchData(REMOVE_FRIEND, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  if (result.success) {
    setter({
      user: {
        info: {
          ...user.info,
          friends: user.info.friends.filter(ele => ele._id !== id)
        },
        userPending: false,
      }
    });
  } else {
    setter({
      alertMessage: {
        type: 'error',
        message: result.error,
      }
    });
  }
};
