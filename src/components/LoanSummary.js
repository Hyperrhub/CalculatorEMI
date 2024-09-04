import React from 'react';

const LoanSummary = ({ amount, term, interestRate, repayment }) => {
  return (
    <div className="loan-summary">
      <h2>Loan Summary</h2>
      <p>Loan Amount: ${amount}</p>
      <p>Loan Term: {term} years</p>
      <p>Interest Rate: {interestRate}%</p>
      <p>Estimated Monthly Repayment: ${repayment}</p>
    </div>
  );
};

export default LoanSummary;
