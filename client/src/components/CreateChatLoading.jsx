import { Fragment } from "react";
import { CreateChatListItem } from "./CreateChatListItem.jsx";

const CreateChatLoading = () => {
  return [...Array(4)].map((item, index) => (
    <Fragment key={index}>
      <CreateChatListItem isLoading={true} />
      <CreateChatListItem isLoading={true} delay={0.8} />
    </Fragment>
  ));
};

export { CreateChatLoading };
