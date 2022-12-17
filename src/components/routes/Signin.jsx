import { useState } from "react";
import { Link } from "react-router-dom";
import FormLayout from "../utils/FormLayout";
import Input from "../utils/input";
import Logo from "../utils/Logo";

const SignIn = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="container">
      <div>
        <Logo />
        <h1>Challenge your friends to online chess games</h1>
      </div>
      <FormLayout>
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
        <Link to="/signup" style={{ fontWeight: '600' }}>Create Account</Link>
      </FormLayout>
    </div>
  );
};

export default SignIn;