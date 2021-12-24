---
import:
  import { Button, Space, Message } from 'otaku-ui'
---

::: demo

```tsx
function Demo () {
  const type = ['info', 'success', 'warning', 'error']

  return (
    <Space>
      {
        type.map((item, index) => {
          return (
            <Message type="primary" key={index}>{item}</Message>
            )
        })
      }
    </Space>
  )
}

ReactDOM.render(<Demo/>, container)
```
:::
