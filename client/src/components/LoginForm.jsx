import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { login } from '../services/authApi.js';
import { LabelledInput } from './LabelledInput.jsx';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useContext(ToastContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <form
      className="max-w-2xs mt-9 flex w-full flex-col"
      onSubmit={handleLogin}
    >
      <LabelledInput
        id="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minlength={1}
        maxLength={36}
        placeholder="Enter username"
      />
      <LabelledInput
        id="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minlength={1}
        maxLength={36}
        type="password"
        placeholder="Enter password"
      />
      <div className="mt-4">
        <button className="w-full rounded-xl bg-blue-400 px-5 py-2 text-white hover:bg-blue-500">
          Log In
        </button>
      </div>
    </form>
  );
};

export { LoginForm };
