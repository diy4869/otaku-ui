
## 具有间距的网格

::: demo

```tsx
<Grid gap={10} count={5}>
  {
    new Array(24).fill().map((_, index) => {
      return (
        <GridItem key={index}>{index + 1}</GridItem>
      )
    })
  }
</Grid>
```
:::


## 自定义网格大小

::: demo

```tsx
<Grid gap={10} count={5} width={30}>
  {
    new Array(24).fill().map((_, index) => {
      return (
        <GridItem key={index}>{index + 1}</GridItem>
      )
    })
  }
</Grid>
```
:::


## 居中的网格

::: demo

```tsx
<Grid gap={10} count={5} center>
  {
    new Array(24).fill().map((_, index) => {
      return (
        <GridItem key={index}>{index + 1}</GridItem>
      )
    })
  }
</Grid>
```
:::