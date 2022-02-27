---
import:
  import { Grid, GridItem } from 'otaku-ui'
api:
  {
    module: ['Grid', 'GridItem']
  }
---



## Grid 网格

::: demo

一个简单的网格

```tsx
function Demo () {
  return (
    <div>
      <Grid gap={10}>
        {
          Array.from({
            length: 5
          }).map((_, index) => {
            return (
              <GridItem 
                key={index} 
                className="demo-container">{index + 1}
              </GridItem>
            )
          })
        }
      </Grid>
    </div>
  )
}

ReactDOM.render(<Demo/>, container)
```

```css
.demo-container {
  background: black;
  color: white;
  padding-left: 5px;
}
.red {
  color: red;
}
.blue {
  color: blue;
}
```
:::

## api

::: api
:::