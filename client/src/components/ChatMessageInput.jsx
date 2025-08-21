import { useState } from 'react';

const ChatMessageInput = ({ sendMessage, isDisabled = false }) => {
  const [text, setText] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(text);
    setText('');
  };

  return (
    <form
      className="block-shadow mx-2 mb-3 mt-2 flex h-11 items-center gap-3 rounded-xl bg-white pl-3 pr-5"
      onSubmit={handleSendMessage}
    >
      <input
        className="h-7 w-full pl-1"
        id="text"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Message..."
        required
      />
      <button
        className="text-shadow-wrap font-bold hover:text-amber-700 hover:underline disabled:text-gray-400"
        disabled={isDisabled}
      >
        Send
      </button>
    </form>
  );
};

export { ChatMessageInput };
