---
import: 
  import { Radio, RadioGroup } from 'otaku-ui'
api:
  {
    module: ['Radio', 'RadioGroup']
  }
---

## Radio 单选框

::: demo

简单的 Radio

```tsx
ReactDOM.createRoot(container).render(<Radio>单选框</Radio>)
```
:::

## 单选框组

::: demo

```tsx
ReactDOM.createRoot(index).render(<RadioGroup value={1}>
    {
      new Array(3).fill(undefined).map((_) => {
        return (
          <Radio value={index} key={index}>第{index}个单选</Radio>
        )
      })
    }
  </RadioGroup>, container)
```
:::


## 默认选中

::: demo

简单的 Radio

```tsx
ReactDOM.createRoot(container).render(<Radio checked={true}>多选框</Radio>)
```
:::

## 禁用

::: demo

禁用的 Radio

```tsx
ReactDOM.createRoot(container).render(<Radio disabled>多选框</Radio>)
ReactDOM.createRoot(container).render(<Radio checked={true} disabled>多选框</Radio>)
```
:::




## Api

::: api
:::