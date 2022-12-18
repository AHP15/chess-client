import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import FormLayout from "../utils/FormLayout";
import Input from "../utils/input";
import Logo from "../utils/Logo";

const SignIn = () => {
  const url = 'http://localhost:8080/api/v1/auth/signin'
  const {
    data,
    handleChange,
    handleSubmit,
    pending,
    error,
    invalid
  } = useForm({email: '', password: ''}, url);

  if(error) {
    alert(error);
  }

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
            onClick: handleSubmit
          }}
        />
        <Link to="/signup" style={{ fontWeight: '600' }}>Create Account</Link>
      </FormLayout>
    </div>
  );
};

export default SignIn;