import { format } from 'date-fns';
import { Fragment, useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { Avatar } from './Avatar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const SystemMessage = ({ children }) => {
  return (
    <li className="max-w-4/5 block-shadow w-fit self-center rounded-3xl border-2 border-pink-100 bg-white px-5 py-2">
      {children}
    </li>
  );
};

const ChatMessages = ({ messages = [], isPrivateChat, isLoading = false }) => {
  const { id } = useContext(CurrentContext);
  if (!messages) messages = [];

  // if (last message time - current message time) >= 8hr, show timestamp element
  const shouldDisplayTimeMessage = (sendTime, index) => {
    return (
      index == 0 ||
      new Date(sendTime) - new Date(messages[index - 1].sendTime) >= 28800000
    );
  };

  return (
    <ul className="flex flex-col gap-3">
      {!isLoading ? (
        <>
          {messages.length == 0 && (
            <SystemMessage>
              Start the conversation with a message!
            </SystemMessage>
          )}
          {messages.map((message, index) => (
            <Fragment key={`${message.id}-wrapper`}>
              {shouldDisplayTimeMessage(message.sendTime, index) && (
                <SystemMessage>
                  {format(new Date(message.sendTime), 'EEEE LLLL do')}
                </SystemMessage>
              )}
              <li
                key={message.id}
                className={`max-w-4/5 flex items-start gap-2 ${message.sender.id == id && 'flex-row-reverse self-end'}`}
              >
                <Avatar
                  avatar={message.sender.avatar}
                  size={2.5}
                  secondaryStyling={true}
                />
                <div
                  className={`min-w-26 w-fit rounded-3xl px-5 py-2 ${message.sender.id == id ? 'blue-block rounded-tr-sm' : 'pink-block rounded-tl-sm'}`}
                >
                  <h3>{message.content}</h3>
                  <p
                    className={`text-sm text-gray-500 ${message.sender.id == id && 'justify-self-end'}`}
                  >
                    {!isPrivateChat && `${message.sender.username} — `}
                    {format(new Date(message.sendTime), 'h:mmaaa')}
                  </p>
                </div>
              </li>
            </Fragment>
          ))}
        </>
      ) : (
        /* Loading Display */
        <SystemMessage>
          {[...Array(3)].map((item, index) => (
            <Fragment key={index}>
              <motion.span
                className="inline-block"
                animate={{ translateY: -12 }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 0.8,
                  delay: 0.2 * index,
                  ease: 'easeInOut',
                }}
              >
                <div className="size-1 rounded-full bg-amber-900"></div>
              </motion.span>{' '}
            </Fragment>
          ))}
        </SystemMessage>
      )}
    </ul>
  );
};

export { ChatMessages };
