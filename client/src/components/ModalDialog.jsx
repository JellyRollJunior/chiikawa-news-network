import { useEffect, useRef } from 'react';

const ModalDialog = ({ closeFunction, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, [modalRef]);

  return (
    <dialog
      className="top-1/8 w-9/10 xs:w-sm left-1/2 translate-x-[-50%] rounded-xl px-4 pb-4 pt-2"
      ref={modalRef}
    >
      <div className="flex flex-col">
        <button className="ml-auto self-end text-2xl" onClick={closeFunction}>
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
};

export { ModalDialog };
