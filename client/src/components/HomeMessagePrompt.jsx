import cheer from '../assets/images/trio-cheer.png';

const HomeMessagePrompt = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <img
        className="max-w-xs"
        src={cheer}
        alt="Chiikawa, Hachiware, and Usagi cheering with pom poms"
      />
      <h2 className="mt-2 text-center text-2xl font-bold">Your Messages</h2>
      <footer className="mt-2 text-center text-lg">
        Select or Create a chat to send messages.
      </footer>
    </main>
  );
};

export { HomeMessagePrompt };
