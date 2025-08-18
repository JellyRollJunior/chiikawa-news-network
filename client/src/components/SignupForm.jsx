import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../services/authApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { LabelledInput } from './LabelledInput.jsx';

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toastTemp } = useContext(ToastContext);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password != confirmPassword)
      return toastTemp('Passwords must match', true);
    try {
      await signup(username, password);
      navigate('/login');
    } catch (error) {
      toastTemp(error.message);
    }
  };

  return (
    <form
      className="max-w-2xs mt-5 flex w-full flex-col"
      onSubmit={handleSignup}
    >
      <h2 className="text-center font-bold text-gray-500">
        Sign up to chat with all your fellow chiikawa lovers
      </h2>
      <LabelledInput
        id="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minlength={6}
        maxLength={24}
      />
      <LabelledInput
        id="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minlength={6}
        maxLength={24}
        type="password"
      />
      <LabelledInput
        id="Confirm password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        minlength={6}
        maxLength={24}
        type="password"
      />
      <div className="mt-4">
        <button className="w-full rounded-xl bg-blue-400 px-5 py-2 text-white hover:bg-blue-500">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export { SignupForm };
