import { useCallback, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useStore } from '../context/store';

const useForm = (fields, endpoint) => {
  const [data, setData] = useState(fields);
  const [invalid, setInvalid] = useState({
    field: null,
    message: null,
  });
  const {set} = useStore(); // I will only set the state here

  const handleChange = useCallback((e) => {
    const field = e.target.name;
    setData(prev => ({ ...prev, [field]: e.target.value }));
    
    if (invalid.field === field) {
      setInvalid({
        field: '',
        message: '',
      });
    }
  });

  const setError = useCallback((message) => {
    set({
      user: {
        info: null,
        userPending: false,
      },
      alertMessage: {
        type: 'error',
        message: message,
      },
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // validate data
    for(let [key, value] of Object.entries(data)) {
      if(value.trim() && key === 'email' && !isEmail(value)) {
        return setInvalid({
          field: key,
          message: `Invalid ${key}!`,
        });
      }

      if(!value.trim()) {
        return setInvalid({
          field: key,
          message: `please enter your ${key}!`,
        });
      }
    }

    if (data.confirm && data.password !== data.confirm) {
      return setInvalid({
        field: 'confirm',
        message: `Password does not match!`,
      });
    }

    // post data
    set({
      user: {
        info: null,
        userPending: true,
      }
    });
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await res.json();
      if(!resData.success) {
        setError(resData.error);
        return;
      }
      set({
        user: {
          info: resData.user,
          userPending: false,
        }
      });
      localStorage.setItem('token', resData.token);
      console.log(resData)

    } catch (err) {
      setError(err.message);
    }
  });

  return {
    data,
    handleChange,
    handleSubmit,
    invalid
  };
}

export default useForm;