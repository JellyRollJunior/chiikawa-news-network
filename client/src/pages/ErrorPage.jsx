import { Link, useNavigate } from 'react-router';
import { Notice } from '@/shared/components/Notice.jsx';
import scared from '../assets/images/chii-hachi-scared.png';
import chiiLaying from '../assets/images/chiikawa-laying.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  return (
    <div className="flex h-screen w-screen items-center justify-center px-2">
      <Notice
        className="relative max-w-lg"
        title={
          <>
            Ya... Ya.... YAAAA!
            <br />
            404
          </>
        }
        footer={
          <div className="text-shadow-wrap text-center font-medium">
            Oops! We can't find the page you're looking for.
            <br />
            <Link className="text-blue-400 underline">Click here</Link> to head
            back home.
          </div>
        }
      >
        <div className="pink-block">
          <img
            className="drop-shadow-pink-outline m-auto"
            src={scared}
            alt="Chiikawa and Hachiware startled"
          />
        </div>
        <img
          className="drop-shadow-pink-outline absolute -right-[10px] -bottom-[38px] w-[100px]"
          src={chiiLaying}
        />
      </Notice>
    </div>
  );
};

export { ErrorPage };
