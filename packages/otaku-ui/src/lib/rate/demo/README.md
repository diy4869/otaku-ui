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
ReactDOM.createRoot(container).render(<Rate>

  <span classname="iconfont otaku-icon-heart"></span>
</Rate>)
```
:::

## 自定义渲染 

::: demo

简单的评分

```tsx
ReactDOM.createRoot(container).render(<Rate></Rate>)
```
:::

## 只读状态

::: demo

简单的评分

```tsx
ReactDOM.createRoot(container).render(<Rate readonly={true} score={4}></Rate>)
```
:::

## 设置 半星

::: demo

简单的评分

```tsx
ReactDOM.createRoot(container).render(<Rate readonly={true} score={2.5}></Rate>)
```
:::

## 设置 最大值

::: demo

简单的评分

```tsx
ReactDOM.createRoot(container).render(<Rate readonly={true} score={542.5} maxScore={100}></Rate>)
```
:::

## 显示评分

::: demo

简单的评分

```tsx
ReactDOM.createRoot(container).render(<Rate readonly={true} score={42.5} maxScore={100} showScore></Rate>)
```
:::

## 设置星星数量

::: demo

简单的评分

```tsx
ReactDOM.createRoot(container).render(<Rate readonly={true} score={42.5} maxScore={100} showScore count={10}></Rate>)
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

ReactDOM.createRoot(container).render(<Demo/>)
```
:::


## api

::: api
:::