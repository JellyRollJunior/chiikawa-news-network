import { RefreshButton } from '@/shared/components/RefreshButton.jsx';

const ChatsSectionTitle = ({
  title,
  refreshBtn,
  hoverColor = 'duckegg-dark',
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-shadow-wrap font-chiikawa pl-4 font-bold">{title}</h3>
      <div className="mr-2">
        <RefreshButton
          className={`hover:bg-${hoverColor}`}
          onclick={refreshBtn}
        />
      </div>
    </div>
  );
};

export { ChatsSectionTitle };
