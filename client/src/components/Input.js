import React from "react";

const Input = (props) => {
  const {
    handleChange,
    type,
    senderName: name,
    inputName,
    value,
    placeholder,
    className,
  } = props;

  const onChange = (e) => {
    const { value } = e.target;
    handleChange({ target: { name: name, value: value } });
  };

  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="first-name"
        className="block  mt-3 text-sm font-medium leading-6 text-gray-900"
      >
        {inputName}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name} // Update the name attribute to match the desired property name
          id="first-name"
          value={value}
          autoComplete="given-name"
          className={`block w-full pl-2 pr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1  ring-inset 
          placeholder:text-gray-400 focus:ring-1 focus:outline-slate-600 sm:text-sm sm:leading-6 ${className}`}
          onChange={onChange} // Add the onChange attribute and pass the handlechange function
          placeholder={placeholder}
          required // Add the required attribute to make the input field compulsory
        />
      </div>
    </div>
  );
};

export default Input;
