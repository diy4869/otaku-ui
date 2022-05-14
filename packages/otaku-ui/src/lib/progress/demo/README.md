---
import:
  import { Progress, Grid, GridItem, Button, InputNumber } from 'otaku-ui';
  import { useState } from 'react';
api:
  {
    module: ['Progress']
  }
---



## Progress 进度条

::: demo

```tsx
ReactDOM.createRoot(container).render(<Progress></Progress>)
```
:::

## 自定义文字

::: demo

```tsx
ReactDOM.createRoot(container).render(<Progress>10%</Progress>)
```
:::


## 进度条内显示文字

::: demo

```tsx
ReactDOM.createRoot(container).render(<Progress inner percentage={50}>50%</Progress>)
```
:::

## 自定义颜色

::: demo

```tsx
ReactDOM.createRoot(container).render(<Progress inner percentage={50} color="red">50%</Progress>)
```
:::

## 垂直的进度条

::: demo

```tsx
ReactDOM.createRoot(container).render(<Grid>
    <GridItem>
      <Progress inner percentage={50} color="red" direction="vertical">50%</Progress>
    </GridItem>
    <GridItem>
      <Progress percentage={50}  direction="vertical">50%</Progress>
    </GridItem>
  </Grid>)
```
:::

## 圆形进度条

::: demo

```tsx

ReactDOM.createRoot(container).render(<Grid>
    <GridItem>
      <Progress percentage={50}  type="circle">50%</Progress>
    </GridItem>
    <GridItem>
      <Progress percentage={20}  type="circle">20%</Progress>
    </GridItem>
    <GridItem>
      <Progress percentage={90}  type="circle" >90%</Progress>
    </GridItem>
  </Grid>)
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
      <Grid className="demo-progress">
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

ReactDOM.createRoot(container).render(<Demo/>)
```

```css
.otaku-grid {
  align-items: center;
  justify-items: center;
}
```
:::

## api

::: api
:::