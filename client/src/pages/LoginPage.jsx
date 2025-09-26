import { Toaster } from '../components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { Login } from '../components/Login.jsx';
import instagram from '../assets/icons/instagram-60.png';
import github from '../assets/icons/github-60.png';
import linkedin from '../assets/icons/linkedin-60.png';

const LoginPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen">
        <aside className="mr-4 hidden flex-5 items-center justify-end md:flex">
          <div className="main-container mx-6 flex w-full max-w-2xl gap-2 px-3 pt-3 pb-2.5 md:pt-3.5">
            <div className="duckegg-block w-3.5 self-stretch" />
            <div className="flex flex-1 flex-col gap-2">
              <header className="yellow-block w-full pt-3 pb-2">
                <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
                  Connect through Chiikawa!
                </h2>
              </header>
              <div className="duckegg-block h-4" />
              <main className="pink-block h-90"></main>
              <div className="duckegg-block h-4" />
              <footer className="yellow-block text-shadow-wrap flex w-full items-center justify-center gap-2 pt-3 pb-2 text-center">
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
              </footer>
            </div>
            <div className="duckegg-block w-3.5 self-stretch" />
          </div>
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

{
  /* <footer className={styles.footerWrapper}>
  <div className={`${styles.footer} ${shared.card}`}>
    <div className={styles.buttonHolder}>
      <a href="https://github.com/jellyrolljunior" target="”_blank”">
        <IconButton icon={github} size={36} />
      </a>
      <a href="https://www.instagram.com/river.flows__" target="”_blank”">
        <IconButton icon={instagram} size={36} />
      </a>
      <a href="https://www.linkedin.com/in/jellyrolljunior/" target="”_blank”">
        <IconButton icon={linkedin} size={36} />
      </a>
    </div>
    <p>Created by JellyRollJunior (Brandon Lin)</p>
  </div>
</footer>; */
}

export { LoginPage };
