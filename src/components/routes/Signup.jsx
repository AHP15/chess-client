import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { SIGNUP_URL } from '../../constants/endPoints';
import { useStore } from "../../context/store";

import Logo from '../utils/Logo';
import FormLayout from '../utils/FormLayout';
import Input from '../utils/Input';
import useForm from '../../hooks/useForm';
import Alert from '../utils/Alert';

const SignUp = () => {
  const {
    data,
    handleChange,
    handleSubmit,
    invalid
  } = useForm({username: '', email: '', password: ''}, SIGNUP_URL);
  const { user } = useStore('user');
  const { alertMessage, clearAlert } = useStore('alertMessage');
  const navigate = useNavigate();

  useEffect(() => {
    if(user.info) {
      return navigate('/dashboard');
    }
  }, [user.info]);


  if (user.userPending) {
    return (
      <div className="container">
        <div className="loading">
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div>
        <Logo />
      </div>
      <FormLayout>
        <Input
          label="username"
          invalid={invalid.field === 'username' ? invalid.message : null}
          attrs={{
            type: 'username',
            placeholder: 'Your username',
            name: 'username',
            value: data.username,
            onChange: handleChange
          }}
        />
        <Input
          label="email"
          invalid={invalid.field === 'email' ? invalid.message : null}
          attrs={{
            type: 'email',
            placeholder: 'Your email',
            name: 'email',
            value: data.email,
            onChange: handleChange
          }}
        />
        <Input
          label="password"
          invalid={invalid.field === 'password' ? invalid.message : null}
          attrs={{
            type: 'password',
            placeholder: 'Your password',
            name: 'password',
            value: data.password,
            onChange: handleChange
          }}
        />
        <Input
          label={null}
          attrs={{
            type: 'submit',
            name: 'submit',
            value: 'submit',
            onClick: handleSubmit,
          }}
        />
        <Link to="/" style={{ fontWeight: '600' }}>SignIn</Link>
      </FormLayout>

      {
        alertMessage.type
          ? <Alert
            type={alertMessage.type}
            message={alertMessage.message}
            clear={clearAlert}
          />
          : null
      }
    </div>
  );
};

export default SignUp;