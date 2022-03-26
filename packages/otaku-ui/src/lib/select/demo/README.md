---
import: 
  import { Select, SelectOption } from 'otaku-ui'
api:
  {
    module: ['Select', 'SelectOption']
  }
---



## Select 下拉框

::: demo

简单的单选

```tsx
function Demo () {
  return (
    <Select>
      {
        new Array(2000).fill().map((_, index) => {
          return (
            <SelectOption
              value={index}
              key={index}>第{index}个选项</SelectOption>
          )
        })
      }
    </Select>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)

```
:::


## Select 多选

::: demo

简单的单选

```tsx
function Demo () {
  return (
    <Select multiple>
      {
        new Array(20).fill().map((_, index) => {
          return (
            <SelectOption
              value={index}
              key={index}>第{index}个选项</SelectOption>
          )
        })
      }
    </Select>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)

```
:::

## api

::: api
:::