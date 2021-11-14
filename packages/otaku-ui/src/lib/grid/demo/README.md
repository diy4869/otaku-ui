---
import:
  import { Grid, GridItem } from 'otaku-ui'
---

[[toc]]

## Grid 网格

::: demo

一个简单的网格

```tsx
function Demo () {
  return (
    <Grid>
      {
        new Array(24).fill().map((_, index) => {
          return (
            <GridItem key={index}>{index + 1}</GridItem>
          )
        })
      }
    </Grid>
  )
}

ReactDOM.render(<Demo/>, container)
```

```css
.container {
  color: red;
}
```
:::
