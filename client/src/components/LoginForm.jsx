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
    <form className="flex w-full flex-col gap-2" onSubmit={handleLogin}>
      <div className="duckegg-block h-4 my-1" />
      <div className="pink-block px-3 pt-3 pb-2">
        <label className="text-shadow-wrap ml-1 font-medium" htmlFor={username}>
          Username
        </label>
        <input
          className="block-shadow mt-2 h-10 w-full rounded-lg bg-white pl-1.5 text-amber-800"
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
      </div>
      <div className="pink-block px-3 pt-3 pb-2">
        <label
          className="text-shadow-wrap mt-2 ml-1 font-medium"
          htmlFor={password}
        >
          Password
        </label>
        <input
          className="block-shadow mt-2 h-10 w-full rounded-xl bg-white pl-1.5 text-amber-800"
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
      </div>
      <div className="duckegg-block h-4 my-1" />
      <div className="">
        <button className="blue-button w-full px-5 py-2">Log In</button>
      </div>
    </form>
  );
};

export { LoginForm };
