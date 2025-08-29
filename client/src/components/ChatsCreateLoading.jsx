import { Fragment } from 'react';
import { LoadingElement } from './LoadingElement.jsx';

const ChatsCreateLoadingItem = ({ delay }) => {
  return (
    <LoadingElement
      className="flex gap-2 rounded-sm px-4 py-2"
      initialColor='#fef9c3'
      transitionColor='#fce7f3'
      delay={delay}
    >
      <button
        className="flex h-full w-full gap-2 rounded-xl px-2 py-1"
        type="button"
      >
        <div className="size-10 shrink-0 rounded-full bg-stone-300"></div>
        <div className="flex items-center">
          <h4 className="h-4 w-32 rounded-sm bg-stone-300 text-lg"></h4>
        </div>
      </button>
    </LoadingElement>
  );
};

const ChatsCreateLoading = ({ items = 4 }) => {
  if (items == 1) {
    return <ChatsLoadingItem />;
  }

  return [...Array(items)].map((item, index) => (
    <Fragment key={index}>
      <ChatsCreateLoadingItem />
      <ChatsCreateLoadingItem delay={0.8} />
    </Fragment>
  ));
};

export { ChatsCreateLoading };
