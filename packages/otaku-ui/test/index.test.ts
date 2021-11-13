import { useCalendar, usePagination } from "../src/hooks/index"
import { renderHook, act } from '@testing-library/react-hooks'

describe('hooks test', () => {
  test('useCalendar', () => {
    const { result } = renderHook(() => useCalendar())

    act(() => {
      console.log(result.current)
    })

    const calendar = jest.fn()

    calendar(useCalendar, new Date(), '日')
    calendar(useCalendar, new Date(), '一')

    expect(calendar).toHaveReturnedWith({
      prev: [],
      current: [],
      next: []
    })
  })

  test('usePagination', () => {
    const { result } = renderHook(() => usePagination({
      pageSize: 10,
      current: 15,
      total: 20,
      slicePage: 5
    }))

    act(() => {
      console.log(result.current)
    })

  })
})

