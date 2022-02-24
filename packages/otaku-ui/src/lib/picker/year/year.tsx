import dayjs from "dayjs"
import classNames from "classnames"
import React, { useState, useEffect, useMemo } from "react"
import "./style.scss"

interface YearProps {
  date?: dayjs.ConfigType
  onChange?: (date?: dayjs.ConfigType) => void
}

export const getYear = (year: number) => {
  const yearList = []
  const start = Math.floor(year / 10) * 10
  for (let i = start - 1; i <= start + 10; i++) {
    yearList.push(i)
  }

  return yearList
}

export function Year(props: YearProps) {
  const { date, onChange } = props
  const [selectDate, setSelectDate] = useState(dayjs(date))
  
  const year = useMemo(() => {
    return getYear(selectDate.year())
  }, [selectDate])

  useEffect(() => {
    setSelectDate(dayjs(date))
  }, [date])
  

  const switchYear = (type: "year" | "month", direction: "left" | "right") => {
    const result =
      direction === "left"
        ? selectDate.subtract(10, type)
        : selectDate.add(10, type)

    setSelectDate(result)
  }

  const onClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const year = +e.target.dataset.year

    if (year) {
      const result = dayjs(selectDate.year(year))

      setSelectDate(result)
      onChange?.(result)
    }
  }

  return (
    <>
      <ul className='otaku-datetime-picker-header'>
        <li>
          <span
            className={`iconfont otaku-icon-doubleleft`}
            onClick={() => switchYear("year", "left")}></span>
        </li>
        <li>
          <span>{`${year[1]} - ${year[10]}`}</span>
        </li>
        <li>
          <span
            className={`iconfont otaku-icon-doubleright`}
            onClick={() => switchYear("year", "right")}></span>
        </li>
      </ul>
      <ul className='otaku-datepicker-year' onClick={onClick}>
        {year.map(item => {
          return (
            <li
              data-year={item}
              className={classNames({
                gray: item === year[0] || year[year.length - 1] === item,
                active: item === dayjs().year(),
                'otaku-datepicker-currentYear': item === dayjs().year()
              })}
              key={item}>
              {item}
            </li>
          )
        })}
      </ul>
    </>
  )
}
