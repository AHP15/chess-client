import { GET_USER_URL } from '../constants/endPoints';

export const getUser = async () => {
  try {
    const res = await fetch(GET_USER_URL, {
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