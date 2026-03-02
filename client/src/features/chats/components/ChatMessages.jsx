import { Fragment } from 'react';
import { format } from 'date-fns';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { LoadingDots } from '@/shared/components/LoadingDots.jsx';

const SystemMessage = ({ children }) => {
  return (
    <li className="block-shadow w-fit max-w-4/5 self-center rounded-3xl border-2 border-pink-100 bg-white px-5 py-2 text-center text-sm">
      {children}
    </li>
  );
};

const ChatMessages = ({
  currentUserId,
  messages = [],
  isLoadingMessages = false,
  isPrivateChat,
}) => {
  if (!messages) messages = [];

  // if (last message time - current message time) >= 8hr, show timestamp element
  const shouldDisplayTimeMessage = (sendTime, index) => {
    return (
      index == 0 ||
      new Date(sendTime) - new Date(messages[index - 1].sendTime) >= 28800000
    );
  };

  if (isLoadingMessages) {
    return (
      <ul className="flex min-h-full flex-col gap-3">
        <SystemMessage>
          <LoadingDots />
        </SystemMessage>
      </ul>
    );
  }

  return (
    <ul className="flex min-h-full flex-col gap-3">
      {/* No messages available */}
      {messages.length == 0 && (
        <SystemMessage>Start the conversation with a message!</SystemMessage>
      )}

      {/* Render messages */}
      {messages.map((message, index) => (
        <Fragment key={`${message.id}-wrapper`}>
          {shouldDisplayTimeMessage(message.sendTime, index) && (
            <SystemMessage>
              {format(new Date(message.sendTime), 'EEE, LLL do')}
            </SystemMessage>
          )}
          <li
            key={message.id}
            className={`flex max-w-7/8 items-start gap-2 ${
              message.sender.id == currentUserId && 'flex-row-reverse self-end'
            }`}
          >
            <Avatar
              className="size-[46px] border-1 border-yellow-500 md:size-[54px]"
              background="yellow-50"
              avatar={message.sender.avatar}
              secondaryStyling={true}
            />
            <div
              className={`w-fit min-w-26 rounded-2xl px-5 py-2 ${
                message.sender.id == currentUserId
                  ? 'yellow-block rounded-tr-xs'
                  : 'duckegg-block rounded-tl-xs'
              }`}
            >
              <h3>{message.content}</h3>
              <p
                className={`text-sm text-gray-500 ${
                  message.sender.id == currentUserId && 'justify-self-end'
                }`}
              >
                {!isPrivateChat && `${message.sender.username} — `}
                {format(new Date(message.sendTime), 'h:mmaaa')}
              </p>
            </div>
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

export { ChatMessages };
