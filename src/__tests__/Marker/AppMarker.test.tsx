import Marker from '@/components/Marker/AppMarker';
import { mount } from '@testing-library/react';

describe('Marker', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Marker />)
  })

  test('match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  })

  test('render with props')
})