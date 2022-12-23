import Logo from '../utils/Logo';
import FormLayout from '../utils/FormLayout';
import Input from '../utils/Input';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Alert from '../utils/Alert';

const SignUp = () => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/auth/signup`;
  const {
    data,
    handleChange,
    handleSubmit,
    pending,
    status,
    clearStatus,
    invalid
  } = useForm({username: '', email: '', password: ''}, url);

  if (pending) {
    return <div>loading...</div>
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
        status.type === 'error' 
        ? <Alert type="error" message={status.message} clear={clearStatus} /> 
        : null
      }
    </div>
  );
};

export default SignUp;