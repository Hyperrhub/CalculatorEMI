import React, { useState } from 'react';
import LoanInputField from './components/LoanInputField';
import LoanSummary from './components/LoanSummary';
import Button from './components/Button';
import './App.css'

const App = () => {
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    term: '',
    interestRate: '',
  });

  const [monthlyRepayment, setMonthlyRepayment] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };

  const calculateRepayment = () => {
    const { amount, term, interestRate } = loanDetails;

    // Validation
    if (!amount || !term || !interestRate) {
      setError('Please fill in all fields.');
      return;
    }

    if (isNaN(amount) || isNaN(term) || isNaN(interestRate) || amount <= 0 || term <= 0 || interestRate <= 0) {
      setError('Please enter valid positive numbers.');
      return;
    }

    setError('');
    const principal = parseFloat(amount);
    const interest = parseFloat(interestRate) / 100 / 12;
    const payments = parseInt(term) * 12;

    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    setMonthlyRepayment(monthly.toFixed(2));
  };

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      alert('Your loan details have been submitted successfully!');
    }, 1000);
  };

  return (
    <div className="loan-calculator">
      <h1>Loan Calculator</h1>
      <div className="form">
        <LoanInputField
          label="Loan Amount"
          name="amount"
          value={loanDetails.amount}
          onChange={handleChange}
        />
        <LoanInputField
          label="Loan Term (Years)"
          name="term"
          value={loanDetails.term}
          onChange={handleChange}
        />
        <LoanInputField
          label="Interest Rate (%)"
          name="interestRate"
          value={loanDetails.interestRate}
          onChange={handleChange}
        />
        {error && <p className="error" role="alert">{error}</p>}
        <Button text="Calculate" onClick={calculateRepayment} />
      </div>
      {monthlyRepayment && (
        <>
        <LoanSummary
          amount={loanDetails.amount}
          term={loanDetails.term}
          interestRate={loanDetails.interestRate}
          repayment={monthlyRepayment}
        />
      <Button text="Submit" onClick={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default App;