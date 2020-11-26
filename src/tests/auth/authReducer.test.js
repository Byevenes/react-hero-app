import '@testing-library/jest-dom';

import { authReducer } from '../../auth/authReducer';
import { demoState } from '../fixtures/demoState';
import { types } from '../../types/types';

describe('Pruebas en <authReducer />', () => {
  test('debe de retornar el estado por defecto ', () => {
    const state = authReducer(demoState, {});

    expect(state).toEqual(demoState);
  });

  test('debe de autenticar y colocar el name del usuario ', () => {
    const action = {
      type: types.login,
      payload: demoState,
    };

    const state = authReducer(demoState, action);
    const { name } = state;

    expect(name).toBe(demoState.name);
  });

  test('debe de borrar el name del usuario y logged en false ', () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer(demoState, action);
    const { logged } = state;
    expect(logged).toBe(false);
  });
});
