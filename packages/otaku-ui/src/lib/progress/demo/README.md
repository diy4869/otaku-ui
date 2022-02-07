---
import:
  import { Progress, Grid, GridItem, Button, InputNumber } from 'otaku-ui';
  import { useState } from 'react';
---



## Progress 进度条

::: demo

```tsx
ReactDOM.render(<Progress></Progress>, container)
```
:::

## 自定义文字

::: demo

```tsx
ReactDOM.render(<Progress>10%</Progress>, container)
```
:::


## 进度条内显示文字

::: demo

```tsx
ReactDOM.render(<Progress inner percentage={50}>50%</Progress>, container)
```
:::

## 自定义颜色

::: demo

```tsx
ReactDOM.render(<Progress inner percentage={50} color="red">50%</Progress>, container)
```
:::

## 垂直的进度条

::: demo

```tsx
ReactDOM.render(
  <Grid>
    <GridItem>
      <Progress inner percentage={50} color="red" direction="vertical">50%</Progress>
    </GridItem>
    <GridItem>
      <Progress percentage={50}  direction="vertical">50%</Progress>
    </GridItem>
  </Grid>,
  container
)
```
:::

## 圆形进度条

::: demo

```tsx

ReactDOM.render(
  <Grid>
    <GridItem>
      <Progress percentage={50}  type="circle">50%</Progress>
    </GridItem>
    <GridItem>
      <Progress percentage={20}  type="circle">20%</Progress>
    </GridItem>
    <GridItem>
      <Progress percentage={90}  type="circle" >90%</Progress>
    </GridItem>
  </Grid>,
  container
)
```
:::


## 变化的进度条

::: demo

sdaf

```tsx

function Demo () {
  let [progress, setProgress] = useState(0)

  return (
    <>
      <InputNumber value={progress} step={10} onChange={val => {
        setProgress(val)
      }}></InputNumber>
      <Grid class="demo-progress">
        <GridItem>
          <Progress percentage={progress}  type="circle"></Progress>
        </GridItem>
        <GridItem>
          <Progress percentage={progress}></Progress>
        </GridItem>
        <GridItem>
          <Progress percentage={progress}  direction="vertical"></Progress>
        </GridItem>
      </Grid>

    </>
  )
}

ReactDOM.render(<Demo/>, container)
```

```css
.otaku-grid {
  align-items: center;
  justify-items: center;
}
```
:::

## API

```ts
interface ProgressProps {
  inner?: boolean
  percentage?: number
  max?: number
  color?: string
  type?: 'circle'
  direction?: 'vertical' | 'horizontal'
  lineWidth?: number
}
```