---
import:
  import { Button, Space, Grid, GridItem } from 'otaku-ui'
api:
  {
    module: ['Button']
  }
---


::: demo

这个是按钮的描述

```tsx
type a = 1

const a: a = 2

function Demo () {
  return (
      <Space>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">错误按钮</Button>
    </Space>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::

## api

::: api
:::