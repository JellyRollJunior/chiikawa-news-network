import cheer from '../assets/images/trio-cheer.png';

const HomeMessagePrompt = () => {
  return (
    <div className="bg-dotted-sm h-fit flex-col items-center rounded-xl border-5 border-pink-200 bg-pink-100 px-2 py-3 text-xl font-medium">
      <header className="block-shadow yellow-block rounded-lg py-2 text-center text-3xl font-bold">
        Your Messages
      </header>
      <main>
        <div className="pink-block block-shadow mt-4 rounded-lg py-2 text-center text-3xl font-bold">
          <img
            className="drop-shadow-pink-outline m-auto max-w-s"
            src={cheer}
            alt="Chiikawa and Hachiware startled"
          />
        </div>
        <p className="block-shadow yellow-block mt-4 rounded-lg px-4 py-3 text-center">
          Select or Create a chat to send messages.
        </p>
      </main>
    </div>
  );
};

export { HomeMessagePrompt };
