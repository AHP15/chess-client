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
      console.log(resData);
      if(!resData.success) {
        setError(resData.error);
        setPending(false);
      }

    } catch (err) {
      setError(err.message);
      setPending(false);
    }
  });

  return {data, handleChange, handleSubmit, pending, error, invalid};
}

export default useForm;