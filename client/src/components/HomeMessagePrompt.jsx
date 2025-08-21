import masks from '../assets/images/trio-masks.png';

const HomeMessagePrompt = () => {
  return (
    <div className="bg-dotted-sm border-5 h-fit flex-col items-center rounded-xl border-pink-200 bg-pink-100 px-2 py-3 text-xl font-medium">
      <header className="block-shadow text-shadow-wrap yellow-block rounded-lg py-2 text-center text-3xl font-bold">
        Your Messages
      </header>
      <main>
        <div className="pink-block block-shadow mt-3 rounded-lg py-2 text-center text-3xl font-bold">
          <img
            className="drop-shadow-pink-outline m-auto"
            src={masks}
            alt="Chiikawa and Hachiware startled"
          />
        </div>
        <p className="block-shadow text-shadow-wrap yellow-block mt-3 rounded-lg px-4 py-3 text-center">
          <strong>Select</strong> or <strong>Create</strong> a chat to begin
          sending messages!
        </p>
      </main>
    </div>
  );
};

export { HomeMessagePrompt };
