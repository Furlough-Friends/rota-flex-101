import * as windowSizeModule from '@react-hook/window-size/throttled';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from '.';
import { Role } from '../../constants/employees';
import { getSidebarOptions } from '../../constants/sidebarOptions';
import { useAuth0 } from '../../react-auth0-spa';

jest.mock('../../react-auth0-spa');

let windowWidthSpy: jest.SpyInstance;
// The test fails if window width is below the threshold.
// This is a way to 'fake' what the react hook is reporting the width of the window is

beforeEach(() => {
  (useAuth0 as jest.Mock).mockReturnValue({
    isAuthenticated: true,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });

  windowWidthSpy = jest.spyOn(windowSizeModule, 'useWindowWidth');
});

afterEach(() => {
  windowWidthSpy.mockRestore();
});

test('renders the menu options on big screen', () => {
  windowWidthSpy.mockReturnValue(800);

  const { getByText } = render(
    <Router>
      <Sidebar sidebarOptions={getSidebarOptions(Role.MANAGER)} />
    </Router>
  );

  expect(getByText(/Summary/i)).toBeInTheDocument();
  expect(getByText(/Rota/i)).toBeInTheDocument();
  expect(getByText(/Employees/i)).toBeInTheDocument();
});

test('sidebar options correct for non-manager', () => {
  windowWidthSpy.mockReturnValue(800);

  const { getByText } = render(
    <Router>
      <Sidebar sidebarOptions={getSidebarOptions(Role.USER)} />
    </Router>
  );

  expect(getByText(/Summary/i)).toBeInTheDocument();
  expect(getByText(/Rota/i)).toBeInTheDocument();
});
