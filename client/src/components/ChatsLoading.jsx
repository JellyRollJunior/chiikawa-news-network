import { Fragment } from 'react';
import { ChatsListItem } from './ChatsListItem.jsx';

const ChatsLoading = ({ items = 4}) => {
  return [...Array(items)].map((item, index) => (
    <Fragment key={index}>
      <ChatsListItem isLoading={true} />
      <ChatsListItem isLoading={true} delay={0.8} />
    </Fragment>
  ));
};

export { ChatsLoading };
