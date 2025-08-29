import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { login } from '../services/authApi.js';

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
    <form className="mt-6 flex w-full flex-col px-2" onSubmit={handleLogin}>
      <label
        className="text-shadow-wrap ml-1 font-medium text-amber-800"
        htmlFor={username}
      >
        Username
      </label>
      <input
        className="block-shadow mt-1 h-10 w-full rounded-xl bg-white pl-1.5 text-amber-800"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minLength={1}
        maxLength={36}
        placeholder="Enter username"
        required={true}
      />
      <label
        className="text-shadow-wrap ml-1 mt-2 font-medium text-amber-800"
        htmlFor={password}
      >
        Password
      </label>
      <input
        className="block-shadow mt-1 h-10 w-full rounded-xl bg-white pl-1.5 text-amber-800"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={1}
        maxLength={36}
        placeholder="Enter password"
        required={true}
      />
      <div className="mt-4">
        <button className="blue-button w-full px-5 py-2">Log In</button>
      </div>
    </form>
  );
};

export { LoginForm };
