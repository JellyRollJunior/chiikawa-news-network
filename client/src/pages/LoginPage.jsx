import { Toaster } from '@/shared/components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { Notice } from '@/shared/components/Notice.jsx';
import { AuthFormWrapper } from '@/features/auth/components/AuthFormWrapper.jsx';
import { Login } from '@/features/auth/components/Login.jsx';
import { LoginImageCarousel } from '@/features/auth/components/LoginImageCarousel.jsx';

// assets
import instagram from '../assets/icons/instagram-60.png';
import github from '../assets/icons/github-60.png';
import linkedin from '../assets/icons/linkedin-60.png';
import shisaRamen from '../assets/images/shisa-ramen.png';
import trioScouting from '../assets/images/trio-scouting.png';
import rakko from '../assets/icons/rakko-icon.png';
import momonga from '../assets/icons/momonga-icon.png';
import chat from '../assets/carousel-images/chat.webp';
import home from '../assets/carousel-images/home.webp';
import mobile from '../assets/carousel-images/mobile.webp';
import profile from '../assets/carousel-images/profile.webp';

const LoginPage = () => {
  const slideshowImages = [chat, home, mobile, profile];

  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen">
        <div className="flex flex-4 justify-center self-center">
          <AuthFormWrapper>
            <Login />
          </AuthFormWrapper>
        </div>
        <aside className="mr-4 hidden flex-5 items-center justify-start lg:flex">
          <Notice
            className="relative max-w-2xl"
            title="Connect through Chiikawa!"
            footer={
              <div className="text-shadow-wrap flex items-center justify-center gap-2 px-2 pt-1 pb-1 text-center">
                Created by JellyRollJunior (Brandon Lin)
                <a className="inline-block w-[30px] shrink-0" href="https://github.com/jellyrolljunior" target="”_blank”">
                  <img src={github} />
                </a>
                <a className="inline-block w-[30px] shrink-0" href="https://www.instagram.com/river.flows__" target="”_blank”">
                  <img src={instagram} />
                </a>
                <a className="inline-block w-[30px] shrink-0" href="https://www.linkedin.com/in/jellyrolljunior/" target="”_blank”">
                  <img src={linkedin} />
                </a>
              </div>
            }
          >
            <div className="pink-block px-5 pt-6 pb-5">
              <LoginImageCarousel
                className="w-full md:h-60 lg:h-90"
                imageArray={slideshowImages}
              />
            </div>
            <img className="drop-shadow-pink-outline absolute -top-[23px] -right-[17px] w-[70px]" src={momonga} />
            <img className="drop-shadow-pink-outline absolute bottom-[64px] left-0 w-[100px]" src={trioScouting} />
            <img className="drop-shadow-pink-outline absolute -top-[20px] -left-[14px] w-[70px]" src={rakko} />
            <img className="drop-shadow-pink-outline absolute -right-[17px] -bottom-[20px] w-[110px]" src={shisaRamen} />
          </Notice>
        </aside>
      </div>
    </ToastProvider>
  );
};

export { LoginPage };
