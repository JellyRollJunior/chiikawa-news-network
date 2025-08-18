import { Link, useNavigate } from 'react-router';
import scared from '../assets/images/chii-hachi-scared.png';
import dottedLarge from '../assets/backgrounds/bg-dotted-lg.png';
import dottedSmall from '../assets/backgrounds/bg-dotted-sm.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  return (
    <>
      <div
        style={{ backgroundImage: `url(${dottedLarge})` }}
        className="flex h-screen w-screen justify-center items-center bg-blue-100"
      >
        <div
          style={{ backgroundImage: `url(${dottedSmall})` }}
          className="border-8 h-fit flex-col items-center rounded-xl border-pink-200 bg-pink-100 px-4 py-3 text-xl font-medium text-yellow-800"
        >
          <header className="inset-shadow-[2px_2px_3px] inset-shadow-white bg-linear-to-b rounded-lg border-2 border-yellow-100 from-orange-50 to-yellow-50 py-2 text-center text-3xl font-bold shadow-[3px_3px_1px] shadow-pink-200">
            Ya... Ya.... YAAAA!
            <br />
            404
          </header>
          <main>
            <div className='inset-shadow-[2px_2px_3px] inset-shadow-white bg-linear-to-b mt-4 rounded-lg border-2 border-yellow-100 from-red-50 to-rose-50 py-2 text-center text-3xl font-bold shadow-[3px_3px_1px] shadow-pink-200'>
              <img
                className="drop-shadow-pink-custom m-auto"
                src={scared}
                alt="Chiikawa and Hachiware startled"
              />
            </div>
            <p className="inset-shadow-[2px_2px_3px] inset-shadow-white bg-linear-to-b mt-4 rounded-lg border-2 border-yellow-100 from-orange-50 to-yellow-50 px-4 py-3 text-center shadow-[3px_3px_1px] shadow-pink-200">
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
