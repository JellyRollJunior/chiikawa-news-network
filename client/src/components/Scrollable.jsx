const Scrollable = ({ onScrollToBottom, children }) => {
  const handleScroll = (event) => {
    const element = event.target;
    const isAtBottom =
      Math.abs(
        element.scrollHeight - (element.scrollTop + element.clientHeight)
      ) <= 1;
    if (isAtBottom) {
      onScrollToBottom();
    }
  };

  return (
    <div
      className="scrollbar-thin scrollbar-track-yellow-50 overflow-y-scroll"
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

export { Scrollable };
