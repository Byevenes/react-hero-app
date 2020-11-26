import React from 'react';
import '@testing-library/jest-dom';

import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test('debe de mostrar el login si no está autenticado', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('debe de mostrar <PrivateRoute /> con el nombre del usuario si está autenticado', () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: 'Brayan',
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find('span').text().trim()).toBe(contextValue.user.name);
  });
});
