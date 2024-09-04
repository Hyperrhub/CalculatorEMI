import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  // Mock window.alert before all tests
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  // Clean up after all tests
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders loan calculator title', () => {
    render(<App />);
    expect(screen.getByText(/Loan Calculator/i)).toBeInTheDocument();
  });

  test('calculates monthly repayment correctly', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/Loan Term \(Years\)/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Interest Rate \(%\)/i), { target: { value: '5' } });
    fireEvent.click(screen.getByText(/Calculate/i));
    expect(screen.getByText(/Estimated Monthly Repayment: \$94.36/i)).toBeInTheDocument();
  });

  test('displays error message for invalid input', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '-5000' } });
    fireEvent.change(screen.getByLabelText(/Loan Term \(Years\)/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Interest Rate \(%\)/i), { target: { value: '5' } });
    fireEvent.click(screen.getByText(/Calculate/i));
    expect(screen.getByText(/Please enter valid positive numbers./i)).toBeInTheDocument();
  });

  test('mocks API submission process', () => {
    jest.useFakeTimers();
    render(<App />);
    
    // Perform steps necessary to reveal the "Submit" button
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/Loan Term \(Years\)/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Interest Rate \(%\)/i), { target: { value: '5' } });
    fireEvent.click(screen.getByText(/Calculate/i));

    // Debugging step to print the HTML in case the button is not found
    screen.debug(); // This will print the current DOM state to the console.

    // Try to find the button and click it
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    jest.runAllTimers();

    expect(window.alert).toHaveBeenCalledWith('Your loan details have been submitted successfully!');
  });
});
