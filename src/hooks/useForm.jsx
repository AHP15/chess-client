import { useCallback, useState } from 'react';

const useForm = (fields, endpoint) => {
  const [data, setData] = useState(fields);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState({
    field: '',
    message: '',
  });

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
      if(!value.trim()) {
        return setInvalid({
          field: key,
          message: `please enter your ${key}!`,
        });
      }
    }

    // post data
    try {

    } catch (err) {

    }
  });

  return {data, handleChange, handleSubmit, pending, error, invalid};
}

export default useForm;