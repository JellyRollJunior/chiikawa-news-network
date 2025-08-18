import { RefreshButton } from './RefreshButton.jsx';

const ChatsSectionTitle = ({ title, refreshOnClick }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="pl-4 text-xl font-extrabold">{title}</h3>
      <div className="mr-5.5">
        <RefreshButton onclick={refreshOnClick} />
      </div>
    </div>
  );
};

export { ChatsSectionTitle };
