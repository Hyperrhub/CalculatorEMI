import React from 'react';

const LoanInputField = ({ label, name, value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-label={label}
        required
      />
    </div>
  );
};

export default LoanInputField;
