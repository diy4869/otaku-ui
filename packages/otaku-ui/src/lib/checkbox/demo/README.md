---
import: 
  import { Checkbox, CheckboxGroup } from 'otaku-ui'
---

## Checkbox

::: demo

简单的 Checkbox

```tsx
<Checkbox>多选框</Checkbox>

```
:::

## 默认选中

::: demo

简单的 Checkbox

```tsx
<Checkbox checked={true}>多选框</Checkbox>

```
:::

## 禁用

::: demo

禁用的 Checkbox

```tsx
<Checkbox disabled>多选框</Checkbox>
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