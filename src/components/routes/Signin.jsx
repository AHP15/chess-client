import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Alert from "../utils/Alert";
import FormLayout from "../utils/FormLayout";
import Input from "../utils/input";
import Logo from "../utils/Logo";

const SignIn = () => {
  const url =`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signin`;
  const {
    data,
    handleChange,
    handleSubmit,
    pending,
    status,
    clearStatus,
    invalid
  } = useForm({email: '', password: ''}, url);

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

      <i style={{ position: 'absolute', bottom: '10px' }}>Developed by 
        <a style={{ display: 'inline-block', marginLeft: '5px' }} href="https://abdessittir-harkati.vercel.app/" target="_blank" rel="noreferrer">
          Abdessittir Harkati
        </a>
      </i>

      {
        status.type === 'error' 
        ? <Alert type="error" message={status.message} clear={clearStatus} /> 
        : null
      }

      {
        status.type === 'success' 
        ? <Alert type="success" message={status.message} clear={clearStatus} /> 
        : null
      }
    </div>
  );
};

export default SignIn;