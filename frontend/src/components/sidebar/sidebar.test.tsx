import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Sidebar from './index';

test('renders the menu options', () => {
  const { getByText } = render(<Router><Sidebar selectedOption="Summary"/></Router>);

  expect(getByText(/Summary/i)).toBeInTheDocument();
  expect(getByText(/Rota/i)).toBeInTheDocument();
  expect(getByText(/Employees/i)).toBeInTheDocument();
});
