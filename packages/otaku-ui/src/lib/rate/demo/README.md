---
import:
  import { Rate } from 'otaku-ui'
api:
  {
    module: ['Rate']
  }
---


## Rate 评分

::: demo

简单的评分

```tsx
ReactDOM.render(<Rate></Rate>, container)
```
:::

## 只读状态

::: demo

简单的评分

```tsx
ReactDOM.render(<Rate readonly={true} score={4}></Rate>, container)
```
:::

## 设置 半星

::: demo

简单的评分

```tsx
ReactDOM.render(<Rate readonly={true} score={2.5}></Rate>, container)
```
:::

## 设置 最大值

::: demo

简单的评分

```tsx
ReactDOM.render(<Rate readonly={true} score={542.5} maxScore={100}></Rate>, container)
```
:::

## 显示评分

::: demo

简单的评分

```tsx
ReactDOM.render(<Rate readonly={true} score={42.5} maxScore={100} showScore></Rate>, container)
```
:::

## 设置星星数量

::: demo

简单的评分

```tsx
ReactDOM.render(<Rate readonly={true} score={42.5} maxScore={100} showScore count={10}></Rate>, container)
```
:::

## 自定义 文字

::: demo

简单的评分

```tsx
function Demo () {
  return (
    <Rate
      score={59.5} 
      maxScore={100} 
      count={10}
      readonly
      textRender={(current, score) => {
        let text = '不合格'
        
        if (current <= 6) text = '不合格'
        else if (current >= 6) text = '及格'
        else if (current >= 8) text = '优秀'
        else text = '满分'

        return text
      }}></Rate>
  )
}
ReactDOM.render(<Demo/>, container)
```
:::


## api

::: api
:::