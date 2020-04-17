import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './index';

test('renders the menu options', () => {
  const { getByText } = render(<Sidebar />);

  expect(getByText(/Summary/i)).toBeInTheDocument();
  expect(getByText(/Rota/i)).toBeInTheDocument();
  expect(getByText(/Employees/i)).toBeInTheDocument();
});
