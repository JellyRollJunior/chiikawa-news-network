import { RefreshButton } from './RefreshButton.jsx';

const ChatsSectionTitle = ({ title, refreshBtn }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-shadow-wrap pl-4 text-xl font-bold">{title}</h3>
      <div className="mr-2">
        <RefreshButton onclick={refreshBtn} hoverColor="duckegg-dark" />
      </div>
    </div>
  );
};

export { ChatsSectionTitle };
