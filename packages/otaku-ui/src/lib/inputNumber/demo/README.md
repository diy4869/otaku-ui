---
import:
  import { InputNumber } from 'otaku-ui'
---

[[toc]]

## InputNumber 计数器

::: demo

```tsx
<InputNumber></InputNumber>
```
:::


## 设置步长

::: demo

```tsx
<InputNumber step={2}></InputNumber>
```
:::

## 设置最大 最小值

::: demo

```tsx
<InputNumber max={10} min={1}></InputNumber>
```
:::

## 支持小数

::: demo

```tsx
<InputNumber value={0.1} step={0.1}></InputNumber>
```
:::

## 只读状态

::: demo

```tsx
<InputNumber readonly></InputNumber>
```
:::


## 禁用状态

::: demo

```tsx
<InputNumber disabled></InputNumber>
```
:::

## API

```ts
interface InputNumberProps {
  value?: number
  min?: number
  max?: number
  step?: number
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  readonly?: boolean
  onChange?: (val?: number) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onInput?: React.FormEventHandler<HTMLInputElement> 
}
```