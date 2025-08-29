import { Fragment } from 'react';
import { LoadingElement } from './LoadingElement.jsx';

const ChatsLoadingItem = ({ delay }) => {
  return (
    <LoadingElement
      className="mx-1 flex gap-2 rounded-md px-2 py-2"
      delay={delay}
    >
      <div className="size-14 shrink-0 rounded-full bg-stone-300"></div>
      <div className="flex flex-col justify-center">
        <h4 className="w-18 h-4 rounded-sm bg-stone-300"></h4>
        <p className="w-30 mt-1 h-4 items-start justify-self-start rounded-sm bg-stone-300"></p>
      </div>
    </LoadingElement>
  );
};

const ChatsLoading = ({ items = 4 }) => {
  if (items == 1) {
    return <ChatsLoadingItem />;
  }

  return [...Array(items)].map((item, index) => (
    <Fragment key={index}>
      <ChatsLoadingItem />
      <ChatsLoadingItem delay={0.8} />
    </Fragment>
  ));
};

export { ChatsLoading };
