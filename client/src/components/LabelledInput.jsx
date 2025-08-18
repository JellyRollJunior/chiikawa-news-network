const LabelledInput = ({
  id,
  value,
  onChange,
  minlength,
  maxLength,
  type = 'text',
  placeholder = '',
  isRequired = true,
}) => {
  return (
    <>
      <label className="mt-2 font-medium text-gray-500" htmlFor={id}>
        {id}
      </label>
      <input
        className="border-1 h-10 w-full rounded-md border-gray-400 bg-gray-200 pl-1.5"
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        minLength={minlength}
        maxLength={maxLength}
        placeholder={placeholder}
        required={isRequired}
      />
    </>
  );
};

export { LabelledInput };
