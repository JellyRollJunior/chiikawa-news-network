import SimpleBar from 'simplebar-react';
import { useRef } from 'react';

const ModalDialog = ({ open = false, onClose, title, children }) => {
  const ref = useRef(null);

  const openModal = () => ref && ref.current && ref.current.showModal();
  const closeModal = () => ref && ref.current && ref.current.close();

  open ? openModal() : closeModal();

  return (
    <dialog
      className="xs:w-sm secondary-container m-auto h-150 w-9/10"
      ref={ref}
    >
      <SimpleBar className="h-full px-3 pt-3 pb-2.5 text-amber-900">
        <div className="flex flex-col">
          <header className="pink-block relative pt-3.5 pb-1.5">
            <button
              className="text-shadow-wrap absolute -top-1.5 right-1.5 h-fit text-2xl"
              onClick={onClose}
            >
              ×
            </button>
            <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
              {title}
            </h2>
          </header>
          {children}
        </div>
      </SimpleBar>
    </dialog>
  );
};

export { ModalDialog };
