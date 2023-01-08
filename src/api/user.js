import {
  CHALL_FRIEND,
} from '../constants/endPoints';


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

