import { Toaster } from '../components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { Notice } from '../components/Notice.jsx';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { Login } from '../components/Login.jsx';
import instagram from '../assets/icons/instagram-60.png';
import github from '../assets/icons/github-60.png';
import linkedin from '../assets/icons/linkedin-60.png';
import shisaRamen from '../assets/images/shisa-ramen.png';
import trioScouting from '../assets/images/trio-scouting.png';
import rakko from '../assets/icons/rakko-icon.png';
import momonga from '../assets/icons/momonga-icon.png';

const LoginPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen">
        <aside className="mr-4 hidden flex-5 items-center justify-end md:flex">
          <Notice
            className="relative"
            title="Connect through Chiikawa!"
            footer={
              <div className="text-shadow-wrap flex items-center justify-center gap-2 px-2 pt-1 pb-1 text-center">
                Created by JellyRollJunior (Brandon Lin)
                <a
                  className="inline-block w-[30px] shrink-0"
                  href="https://github.com/jellyrolljunior"
                  target="”_blank”"
                >
                  <img src={github} alt="" />
                </a>
                <a
                  className="inline-block w-[30px] shrink-0"
                  href="https://www.instagram.com/river.flows__"
                  target="”_blank”"
                >
                  <img src={instagram} alt="" />
                </a>
                <a
                  className="inline-block w-[30px] shrink-0"
                  href="https://www.linkedin.com/in/jellyrolljunior/"
                  target="”_blank”"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            }
          >
            <div className="pink-block h-90"></div>
            <img
              className="drop-shadow-pink-outline absolute -top-[23px] -right-[17px] w-[70px]"
              src={momonga}
            />
            <img
              className="drop-shadow-pink-outline absolute bottom-[64px] left-0 w-[100px]"
              src={trioScouting}
            />
            <img
              className="drop-shadow-pink-outline absolute -top-[20px] -left-[14px] w-[70px]"
              src={rakko}
            />
            <img
              className="drop-shadow-pink-outline absolute -right-[17px] -bottom-[20px] w-[110px]"
              src={shisaRamen}
            />
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
