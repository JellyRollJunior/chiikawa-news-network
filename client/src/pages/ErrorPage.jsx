import { Link, useNavigate } from 'react-router';
import { Notice } from '../components/Notice.jsx';
import scared from '../assets/images/chii-hachi-scared.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  return (
    <div className="flex h-screen w-screen items-center justify-center px-2">
      <Notice
        title={
          <>
            Ya... Ya.... YAAAA!
            <br />
            404
          </>
        }
        src={scared}
        alt="Chiikawa and Hachiware startled"
        footer={
          <>
            Oops! We can't find the page you're looking for.
            <br />
            <Link className="text-blue-400 underline">Click here</Link> to head
            back home.
          </>
        }
      />
    </div>
  );
};

export { ErrorPage };
