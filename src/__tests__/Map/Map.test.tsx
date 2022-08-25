import Map from '@/common/Map/AppMap';
import { mount } from '@testing-library/react';

describe('Map', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Map />)
  })

  test('match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  })
})