import { Link, useNavigate } from 'react-router';
import scared from '../assets/images/chii-hachi-scared.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  return (
    <>
      <div className="bg-dotted-lg flex h-screen w-screen items-center justify-center bg-blue-100">
        <div className="bg-dotted-sm h-fit flex-col items-center rounded-xl border-8 border-pink-200 bg-pink-100 px-4 py-3 text-xl font-medium text-yellow-800">
          <header className="block-shadow yellow-block rounded-lg py-2 text-center text-3xl font-bold">
            Ya... Ya.... YAAAA!
            <br />
            404
          </header>
          <main>
            <div className="bg-linear-to-b block-shadow mt-4 rounded-lg border-2 border-yellow-100 from-red-50 to-rose-50 py-2 text-center text-3xl font-bold">
              <img
                className="drop-shadow-pink-outline m-auto"
                src={scared}
                alt="Chiikawa and Hachiware startled"
              />
            </div>
            <p className="bg-linear-to-b block-shadow yellow-block mt-4 rounded-lg px-4 py-3 text-center">
              Oops! We can't find the page you're looking for.
              <br />
              <Link className="text-blue-400 underline">Click here</Link> to
              head back home.
            </p>
          </main>
        </div>
      </div>
    </>
  );
};

export { ErrorPage };
