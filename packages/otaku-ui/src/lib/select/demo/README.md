---
import: 
  import { Select, SelectOption } from 'otaku-ui'
---

[[toc]]

## Select 下拉框

::: demo

简单的评分

```tsx
function Demo () {
  return (
    <Select>
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

ReactDOM.render(<Demo/>, container)

```
:::
