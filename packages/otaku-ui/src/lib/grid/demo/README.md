---
import:
  import { Grid, GridItem } from 'otaku-ui'
---

[[toc]]

# 撒旦法

## Grid 网格

::: demo

一个简单的网格

```tsx
function Demo () {
  const a: number = 1

  console.log(a)
  
  return (
    <div>
      <Grid gap={10}>
        {
          Array.from({
            length: 24
          }).map((_, index) => {
            return (
              <GridItem 
                key={index} 
                className={`demo-container ${index % 2 === 0 ? 'blue' : 'red'}`}>{index + 1}
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
