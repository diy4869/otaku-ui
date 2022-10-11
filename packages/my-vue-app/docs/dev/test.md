---
import:
  import { Button, Space, Grid, GridItem, Notice, Dialog } from 'otaku-ui';
  import { useState, useEffect } from 'react';
api:
  {
    module: ['Button']
  }
---

## Notice

::: demo

```tsx
function Demo() {
  const click = () => {
    const instance = new Notice()

    instance.create({
      content: (
        <Dialog 
          show={true} 
          title="标题"
          onClose={() => {
            instance.destory()
          }}>
            hello world
          </Dialog>
        ),
      beforeCreate () {
      },
      created () {

      }
    })
  }
  return  (
    <section>
      <Button onClick={click}>测试</Button>
    </section>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```

:::

## api

::: api
:::