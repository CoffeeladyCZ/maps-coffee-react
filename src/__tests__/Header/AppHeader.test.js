import AppHeader from '@/components/Header/AppHeader';
import { mount } from '@testing-library/react';

describe('AppFooter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AppHeader />)
  })

  test('match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  })
})