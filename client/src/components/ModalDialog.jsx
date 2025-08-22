import { useEffect, useRef } from 'react';

const ModalDialog = ({ closeFunction, children, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, [modalRef]);

  return (
    <dialog
      className="top-1/8 w-9/10 xs:w-sm main-container left-1/2 translate-x-[-50%] px-2 pb-2 pt-3 text-yellow-900"
      ref={modalRef}
    >
      <div className="flex flex-col">
        <header className="yellow-block relative flex flex-col">
          <button
            className="text-shadow-wrap absolute right-2 top-0 h-fit text-2xl"
            onClick={closeFunction}
          >
            ×
          </button>
          <h2 className="text-shadow-wrap mb-1 mt-3 w-full self-center text-center text-2xl font-bold">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </dialog>
  );
};

export { ModalDialog };
