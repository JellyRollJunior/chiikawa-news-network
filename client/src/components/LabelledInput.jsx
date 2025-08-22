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
      <label className="text-shadow-wrap font-medium ml-1 text-amber-800" htmlFor={id}>
        {id}
      </label>
      <input
        className="block-shadow mt-1 h-10 w-full rounded-xl bg-white pl-1.5 text-amber-800"
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
