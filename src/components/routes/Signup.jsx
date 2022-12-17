import { useState } from 'react';

import Logo from '../utils/Logo';
import FormLayout from '../utils/FormLayout';
import Input from '../utils/Input';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  return (
    <div className="container">
      <div>
        <Logo />
        <h1>SignUp</h1>
      </div>
      <FormLayout>
        <Input
          label="username"
          attrs={{
            type: 'username',
            placeholder: 'Your username',
            name: 'username',
            value: data.username,
            onChange: (e) => setData(prev => ({ ...prev, username: e.target.value }))
          }}
        />
        <Input
          label="email"
          attrs={{
            type: 'email',
            placeholder: 'Your email',
            name: 'email',
            value: data.email,
            onChange: (e) => setData(prev => ({ ...prev, email: e.target.value }))
          }}
        />
        <Input
          label="password"
          attrs={{
            type: 'password',
            placeholder: 'Your password',
            name: 'password',
            value: data.password,
            onChange: (e) => setData(prev => ({ ...prev, password: e.target.value }))
          }}
        />
        <Input
          label={null}
          attrs={{
            type: 'submit',
            name: 'submit',
            value: 'submit'
          }}
        />
        <Link to="/" style={{ fontWeight: '600' }}>SignIn</Link>
      </FormLayout>
    </div>
  );
};

export default SignUp;