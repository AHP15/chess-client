import { useCallback, useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import { useStore } from '../context/store';
import { signIn_signUp } from '../context/storeSetters';

const useForm = (fields, endpoint) => {
  const [data, setData] = useState(fields);
  const [invalid, setInvalid] = useState({
    field: null,
    message: null,
  });
  const {set} = useStore();

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

    if (data.confirm && data.password !== data.confirm) {
      return setInvalid({
        field: 'confirm',
        message: `Password does not match!`,
      });
    }

    // post data
    signIn_signUp(data, set);
  });

  return {
    data,
    handleChange,
    handleSubmit,
    invalid
  };
}

export default useForm;