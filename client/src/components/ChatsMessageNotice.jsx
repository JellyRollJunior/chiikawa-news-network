import { Notice } from './Notice.jsx';
import masks from '../assets/images/trio-masks.png';

const ChatsMessageNotice = () => {
  return (
    <Notice
      title="Your Messages"
      src={masks}
      alt="Hachiware, Usagi, and Chiikawa playing with japanese masks"
      footer={
        <>
          <strong>Select</strong> or <strong>Create</strong> a chat to begin
          sending messages!
        </>
      }
    />
  );
};

export { ChatsMessageNotice };
