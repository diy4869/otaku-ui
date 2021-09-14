---
import:
  import { Grid, GridItem } from 'otaku-ui'
---

[[toc]]

## Grid

::: demo

一个简单的网格

```tsx
<Grid>
  {
    new Array(24).fill().map((_, index) => {
      return (
        <GridItem>{index + 1}</GridItem>
      )
    })
  }
</Grid>
```
:::