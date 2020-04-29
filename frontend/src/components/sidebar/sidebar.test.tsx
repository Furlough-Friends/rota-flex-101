import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Sidebar from './index';
import { useAuth0 } from '../../react-auth0-spa';

jest.mock('../../react-auth0-spa');

const user = {
  name: 'test@test.com',
};

beforeEach(() => {
  (useAuth0 as jest.Mock).mockReturnValue({
    isAuthenticated: true,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });
});

test('renders the menu options', () => {
  const { getByText } = render(
    <Router>
      <Sidebar />
    </Router>
  );

  expect(getByText(/Summary/i)).toBeInTheDocument();
  expect(getByText(/Rota/i)).toBeInTheDocument();
  expect(getByText(/Employees/i)).toBeInTheDocument();
  expect(getByText(/Log out test@test.com/i)).toBeInTheDocument();
});
