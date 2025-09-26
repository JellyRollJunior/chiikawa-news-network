import { Toaster } from '../components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { Login } from '../components/Login.jsx';
import instagram from '../assets/icons/instagram-60.png';
import github from '../assets/icons/github-60.png';
import linkedin from '../assets/icons/linkedin-60.png';
import { Notice } from '../components/Notice.jsx';

const LoginPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen">
        <aside className="mr-4 hidden flex-5 items-center justify-end md:flex">
          <Notice
            className=""
            title="Connect through Chiikawa!"
            footer={
              <div className="text-shadow-wrap flex items-center justify-center gap-2 text-center">
                <a
                  className="inline-block w-[30px]"
                  href="https://github.com/jellyrolljunior"
                  target="”_blank”"
                >
                  <img src={github} alt="" />
                </a>
                Created by JellyRollJunior (Brandon Lin)
                <a
                  className="inline-block w-[30px]"
                  href="https://www.instagram.com/river.flows__"
                  target="”_blank”"
                >
                  <img src={instagram} alt="" />
                </a>
                <a
                  className="inline-block w-[30px]"
                  href="https://www.linkedin.com/in/jellyrolljunior/"
                  target="”_blank”"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            }
          >
            <div className="pink-block h-90"></div>
          </Notice>
        </aside>
        <div className="flex flex-4 justify-center self-center">
          <FullPageFormWrapper>
            <Login />
          </FullPageFormWrapper>
        </div>
      </div>
    </ToastProvider>
  );
};

export { LoginPage };
