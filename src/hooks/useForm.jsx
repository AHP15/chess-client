import { useCallback, useState } from 'react';
import isEmail from 'validator/lib/isEmail';

const useForm = (fields, endpoint) => {
  const [data, setData] = useState(fields);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState({
    type: null,
    message: null,
    info: null,
  });
  const [invalid, setInvalid] = useState({
    field: null,
    message: null,
  });

  const clearStatus = useCallback(() => setStatus({
    type: null,
    message: null,
    info: null,
  }), []);

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

    // post data
    setPending(true);
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
        setPending(false);
        setStatus({
          type: 'error',
          message: resData.error,
          info: null,
        });
      } else {
        setStatus({
          type: 'success',
          message: '',
          info: resData.user,
        });
        setPending(false);
      }
      console.log(resData)

    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message,
      });
      setPending(false);
    }
  });

  return {
    data,
    handleChange,
    handleSubmit,
    pending,
    status,
    clearStatus,
    invalid
  };
}

export default useForm;