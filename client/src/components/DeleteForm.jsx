import warning from '../assets/svgs/warning.svg';

const DeleteForm = ({ label, onSubmit, isLoading, closeFunction }) => {
  return (
    <form className="mt-2 flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="pink-block flex flex-col px-3 pt-5 pb-3">
        <img className="w-18 self-center" src={warning} />
        <h2 className="px-3 pt-2 pb-1.5 text-center">
          {label} will be deleted <strong>forever</strong>.
          <br />
          <strong>This cannot be undone</strong>.
          <br />
          Are you sure?
        </h2>
      </div>
      <footer className="flex gap-2">
        <button className="blue-button px-5 py-1.5" disabled={isLoading}>
          Delete
        </button>
        <button
          className="pink-button flex-1 px-5 py-1.5"
          type="button"
          onClick={closeFunction}
        >
          Cancel
        </button>
      </footer>
    </form>
  );
};

export { DeleteForm };
