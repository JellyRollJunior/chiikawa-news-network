import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { signup } from '@/features/auth/api/auth.api.js';
import { ToastContext } from '@/contexts/ToastProvider.jsx';
import { profanityMatcher } from '@/services/textCensor.js';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profanityError, setProfanityError] = useState(false);
  const { toastTemp } = useContext(ToastContext);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      return toastTemp('Passwords must match', true);
    }
    if (profanityError) {
      return toastTemp('Username must not contain profanity', true);
    }
    try {
      await signup(username, password);
      toastTemp('Account created successfully');
      navigate('/login');
    } catch (error) {
      toastTemp(error.message, true);
    }
  };

  return (
    <>
      <form className="flex w-full flex-col gap-2" onSubmit={handleSignup}>
        <div className="duckegg-block my-1 h-4" />
        <h2 className="text-shadow-wrap text-center font-bold">
          Sign up to connect with fellow chiikawa enjoyers
        </h2>
        <div className="pink-block px-3 pt-3 pb-2">
          <div className="flex gap-2">
            <label
              className="text-shadow-wrap ml-1 font-medium text-amber-800"
              htmlFor={username}
            >
              Username
            </label>
            {profanityError && (
              <div className="text-red-400">(no profanity allowed)</div>
            )}
          </div>
          <input
            className="block-shadow mt-1 h-10 w-full rounded-xl bg-white pl-1.5 pr-1 text-amber-800"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => {
              const input = event.target.value;
              setUsername(input);
              profanityMatcher.hasMatch(input)
                ? setProfanityError(true)
                : setProfanityError(false);
            }}
            minLength={6}
            maxLength={12}
            placeholder="Enter username"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            required={true}
          />
        </div>
        <div className="pink-block px-3 pt-3 pb-2">
          <label
            className="text-shadow-wrap ml-1 font-medium text-amber-800"
            htmlFor={password}
          >
            Password
          </label>
          <input
            className="block-shadow mt-1 h-10 w-full rounded-xl bg-white pl-1.5 pr-1 text-amber-800"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            maxLength={24}
            placeholder="Enter password"
            required={true}
          />
        </div>

        <div className="pink-block px-3 pt-3 pb-2">
          <label
            className="text-shadow-wrap ml-1 font-medium text-amber-800"
            htmlFor={confirmPassword}
          >
            Confirm Password
          </label>
          <input
            className="block-shadow mt-1 h-10 w-full rounded-xl bg-white pl-1.5 pr-1 text-amber-800"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={6}
            maxLength={24}
            placeholder="Confirm password"
            required={true}
          />
        </div>
        <div className="duckegg-block my-1 h-4" />
        <button className="blue-button w-full rounded-xl px-5 py-2">
          Sign Up
        </button>
      </form>
      <footer className="text-shadow-wrap self-start pl-2 md:self-center md:pl-0">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Log in.
        </Link>
      </footer>
    </>
  );
};

export { Signup };
