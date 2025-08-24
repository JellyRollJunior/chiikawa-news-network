import { Fragment } from 'react';
import { ChatsCreateListItem } from './ChatsCreateListItem.jsx';

const ChatsCreateLoading = () => {
  return [...Array(4)].map((item, index) => (
    <Fragment key={index}>
      <ChatsCreateListItem isLoading={true} />
      <ChatsCreateListItem isLoading={true} delay={0.8} />
    </Fragment>
  ));
};

export { ChatsCreateLoading };
