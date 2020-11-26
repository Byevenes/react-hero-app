import React from 'react';
import '@testing-library/jest-dom';

import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test('debe de mostar el componente redirect si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={history} />
      </MemoryRouter>
    );

    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  test('debe de mostar un hero si el parámetro existe y se encuetra', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('debe de regresar a la pantalla anterior con PUSH', () => {
    const history = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test('debe de regresar a la pantalla anterior con GOBACK', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenCalledTimes(0);
    expect(history.goBack).toHaveBeenCalled();
  });

  test('debe de llamar el redirect si el hero no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider1']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('');
  });
});
