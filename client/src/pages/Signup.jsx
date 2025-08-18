import { Link } from 'react-router';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { SignupForm } from '../components/SignupForm.jsx';

const Signup = () => {
  return (
    <FullPageFormWrapper>
      <SignupForm />
      <footer className="mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Log in.
        </Link>
      </footer>
    </FullPageFormWrapper>
  );
};

export { Signup };
