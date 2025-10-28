import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useLogin } from '../hooks/useLogin.js';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginGuest, isLoading } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = await login(username, password);
    if (data) {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  };

  const handleGuestLogin = async () => {
    const data = await loginGuest();
    if (data) {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  };

  return (
    <>
      <form className="flex w-full flex-col gap-2" onSubmit={handleLogin}>
        <div className="duckegg-block my-1 h-4" />
        <div className="pink-block px-3 pt-3 pb-2">
          <label
            className="text-shadow-wrap ml-1 font-medium"
            htmlFor={username}
          >
            Username
          </label>
          <input
            className="block-shadow mt-2 h-10 w-full rounded-lg bg-white pl-1.5 pr-1 text-amber-800"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            minLength={1}
            maxLength={36}
            placeholder="Enter username"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
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
            className="block-shadow mt-2 h-10 w-full rounded-xl bg-white pl-1.5 pr-1 text-amber-800"
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
        <div className="duckegg-block my-1 h-4" />
        <button className="blue-button w-full px-5 py-2" disabled={isLoading}>
          Log in
        </button>
      </form>
      <button
        className="pink-button w-full px-5 py-2"
        type="button"
        onClick={handleGuestLogin}
        disabled={isLoading}
      >
        Just passing by? Log in as Guest
      </button>
      <footer className="text-shadow-wrap self-start pl-4 md:self-center md:pl-0">
        Dont have an account?{' '}
        <Link to="/signup" className="text-blue-400 hover:underline">
          Sign up.
        </Link>
      </footer>
    </>
  );
};

export { Login };
