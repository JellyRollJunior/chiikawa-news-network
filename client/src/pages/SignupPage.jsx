import { Link } from 'react-router';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { SignupForm } from '../components/SignupForm.jsx';

const SignupPage = () => {
  return (
    <FullPageFormWrapper>
      <SignupForm />
      <footer className="self-start pl-2 text-shadow-wrap md:self-center md:pl-0">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Log in.
        </Link>
      </footer>
    </FullPageFormWrapper>
  );
};

export { SignupPage };
