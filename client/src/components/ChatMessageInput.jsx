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
      className="mx-3 my-3 flex h-11 items-center gap-3 rounded-3xl border-2 border-gray-300 pl-3 pr-5"
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
        className="font-medium text-blue-500 hover:text-blue-400 hover:underline disabled:text-gray-400"
        disabled={isDisabled}
      >
        Send
      </button>
    </form>
  );
};

export { ChatMessageInput };
