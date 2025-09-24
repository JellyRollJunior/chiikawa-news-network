import { useEffect, useRef } from 'react';

const ModalDialog = ({ closeFunction, children, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, [modalRef]);

  return (
    <dialog
      className="xs:w-sm secondary-container top-1/12 left-1/2 w-9/10 translate-x-[-50%] px-3 pt-3 pb-2.5 text-amber-900"
      ref={modalRef}
    >
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
    </dialog>
  );
};

export { ModalDialog };
