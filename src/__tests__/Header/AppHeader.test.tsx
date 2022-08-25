import AppHeader from '@/components/Header/AppHeader';
import { mount } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

describe('AppFooter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AppHeader />)
  })

  test('match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  })
})

// testing hook - example
test('should increment counter', () => {
  const { result } = renderHook(() => useCounter()) // useCounter je metoda kterou testuji, kde se vyskytuje nastavení volání hooku

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})