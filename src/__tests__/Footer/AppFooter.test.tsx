import Footer from '@/components/Footer/AppFooter';
import { mount } from '@testing-library/react';

describe('Footer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Footer />)
  })

  test('match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  })
})