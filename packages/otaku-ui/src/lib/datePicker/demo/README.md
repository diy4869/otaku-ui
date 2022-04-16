---
import:
  import { DatePicker } from 'otaku-ui'
api:
  {
    module: ['DatePicker']
  }
---



## DatePicker

::: demo

一个简单的日期选择器

```tsx
ReactDOM.createRoot(container).render(<DatePicker></DatePicker>)

```
:::

## 设置一周的第一天

::: demo

设置开始日期

```tsx
ReactDOM.createRoot(container).render(<DatePicker firstWeek="一"></DatePicker>)
```
:::


## 农历显示

::: demo

设置农历

```tsx
ReactDOM.createRoot(container).render(<DatePicker lunarDate={true}></DatePicker>)
```
:::


## API

::: api
:::