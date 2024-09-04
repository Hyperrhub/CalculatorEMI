import React from 'react';
import { render, screen } from '@testing-library/react';
import LoanSummary from '../components/LoanSummary';

describe('LoanSummary Component', () => {
  test('renders loan summary with correct details', () => {
    render(
      <LoanSummary
        amount="5000"
        term="5"
        interestRate="5"
        repayment="94.36"
      />
    );
    expect(screen.getByText(/Loan Amount: \$5000/i)).toBeInTheDocument();
    expect(screen.getByText(/Loan Term: 5 years/i)).toBeInTheDocument();
    expect(screen.getByText(/Interest Rate: 5%/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated Monthly Repayment: \$94.36/i)).toBeInTheDocument();
  });
});
