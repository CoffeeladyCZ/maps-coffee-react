import AppNavigation from '@/components/Navigation/AppNavigation';
import { mount } from '@testing-library/react';

describe('AppNavigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AppNavigation />)
  })

  test('match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  })
})