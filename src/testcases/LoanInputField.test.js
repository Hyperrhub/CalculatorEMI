import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoanInputField from '../components/LoanInputField';

describe('LoanInputField Component', () => {
  test('renders input field with label', () => {
    render(<LoanInputField label="Loan Amount" name="amount" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/Loan Amount/i)).toBeInTheDocument();
  });

  test('calls onChange function when input value changes', () => {
    const handleChange = jest.fn();
    render(<LoanInputField label="Loan Amount" name="amount" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '5000' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
