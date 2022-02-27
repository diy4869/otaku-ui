---
import: 
  import { Checkbox, CheckboxGroup, Space } from 'otaku-ui';
  import { useState, useEffect } from 'react';
api: { module: ["CheckboxGroup", "Checkbox"] }
---


## 多选框组

::: demo

```tsx
function Demo() {
  const [checkAll, setCheckAll] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [data, setData] = useState(
    new Array(3).fill(1).map((_, index) => {
      return {
        current: index,
        checked: false
      }
    })
  )

  useEffect(() => {
    console.log(data)
  }, [data, checkAll, indeterminate])

  const change = e => {
    const result = data.map(item => {
      return {
        ...item,
        checked: e.target.checked
      }
    })

    setData([...result])
    setCheckAll(e.target.checked)
  }

  const groupChange = (val) => {
    const result = data.map(item => {
      return {
        ...item,
        checked: val.includes(item.current)
      }
    })
    setData([...result])

    result.every(item => item.checked)
      ? setCheckAll(true)
      : result.some(item => item.checked)
      ? setIndeterminate(true)
      : setCheckAll(false)
    
    console.log(data, result, checkAll, indeterminate)
  }

  return (
    <Space direction='column'>
      <Checkbox
        checked={checkAll}
        indeterminate={indeterminate}
        onChange={change}>
        全选
      </Checkbox>
      <CheckboxGroup
        value={data.filter(item => item.checked).map(item => item.current)}
        onChange={groupChange}>
        {data.map((_, index) => {
          return (
            <Checkbox value={index} key={index}>
              第{index}个单选
            </Checkbox>
          )
        })}
      </CheckboxGroup>
    </Space>
  )
}

ReactDOM.render(<Demo />, container)
```

:::

## Checkbox 多选框

::: demo

简单的 Checkbox

```tsx
ReactDOM.render(<Checkbox>多选框</Checkbox>, container)
```

:::

## 默认选中

::: demo

简单的 Checkbox

```tsx
ReactDOM.render(<Checkbox checked={true}>多选框</Checkbox>, container)
```

:::

## 禁用

::: demo

禁用的 Checkbox

```tsx
ReactDOM.render(
  <>
    <Checkbox disabled>多选框</Checkbox>
    <Checkbox indeterminate disabled>
      多选框
    </Checkbox>
    <Checkbox checked={true} disabled>
      多选框
    </Checkbox>
  </>,
  container
)
```

:::

## api

::: api
:::
