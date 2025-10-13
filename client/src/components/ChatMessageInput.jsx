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
      className="block-shadow flex h-11 items-center gap-3 rounded-lg bg-white pr-5 pl-3"
      onSubmit={handleSendMessage}
    >
      <input
        className="h-7 w-full pl-1"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Message..."
        required
      />
      <button
        className="text-shadow-wrap font-bold hover:text-pink-500 hover:underline disabled:text-gray-400"
        disabled={isDisabled}
      >
        Send
      </button>
    </form>
  );
};

export { ChatMessageInput };
