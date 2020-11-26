import React from 'react';
import '@testing-library/jest-dom';

import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <DashboardRoutes />', () => {
  test('debe mostrarse correctamente', () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: 'Brayan',
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').hasClass('text-info')).toBe(true);
  });
});
