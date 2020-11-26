import React from 'react';
import '@testing-library/jest-dom';

import { mount } from 'enzyme';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <SearchScreen />', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/search']}>
      <Route path="/search" component={SearchScreen} />
    </MemoryRouter>
  );

  test('debe de mostrarse correctamente con valores x defecto', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
  });

  test('debe de mostar a Batman y el input con el valor deel queryString', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de mostrar un error si no encuentra el Hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman1']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('.alert-danger').text().trim()).toBe(
      'There is no a hero with batman1'
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el push del history', () => {
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'batman',
      },
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault() {},
    });

    expect(history.push).toHaveBeenCalledWith('?q=batman');
  });
});
