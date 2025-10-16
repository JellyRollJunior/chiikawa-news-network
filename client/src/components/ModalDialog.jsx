import { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';

const ModalDialog = ({ closeFunction, children, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, [modalRef]);

  return (
    <dialog
      className="xs:w-sm secondary-container top-1/12 left-1/2 flex max-h-8/10 w-9/10 translate-x-[-50%] overflow-hidden"
      ref={modalRef}
    >
      <SimpleBar className="flex-1 px-3 pt-3 pb-2.5 text-amber-900">
        <div className="flex flex-col">
          <header className="pink-block relative pt-3.5 pb-1.5">
            <button
              className="text-shadow-wrap absolute -top-1.5 right-1.5 h-fit text-2xl"
              onClick={closeFunction}
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
