---
import: 
  import { Checkbox, CheckboxGroup } from 'otaku-ui'
---

[[toc]]

## Checkbox

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
ReactDOM.render(<Checkbox disabled>多选框</Checkbox>, container)
```
:::


## API

```ts
interface CheckBoxProps {
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  value?: string | number
  children?: React.ReactNode[]
  onChange?: (checked?: boolean) => void
}

```