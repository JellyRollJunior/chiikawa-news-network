import { RefreshButton } from './RefreshButton.jsx';

const ChatsSectionTitle = ({
  title,
  refreshBtn,
  hoverColor = 'duckegg-dark',
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-shadow-wrap font-chiikawa pl-4 font-bold">{title}</h3>
      <div className="mr-2">
        <RefreshButton onclick={refreshBtn} hoverColor={hoverColor} />
      </div>
    </div>
  );
};

export { ChatsSectionTitle };
