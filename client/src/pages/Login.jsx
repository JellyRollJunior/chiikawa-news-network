import { Link } from 'react-router';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { LoginForm } from '../components/LoginForm.jsx';

const Login = () => {
  return (
    <FullPageFormWrapper>
      <LoginForm />
      <footer className="mt-2">
        Dont have an account?{' '}
        <Link to="/signup" className="text-blue-400 hover:underline">
          Sign up.
        </Link>
      </footer>
    </FullPageFormWrapper>
  );
};

export { Login };
