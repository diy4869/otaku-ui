---
import:
  import { Button, Space, Notice, message } from 'otaku-ui'
---

## Message 信息

::: demo

```tsx
function Demo () {
  return (
    <Button 
      onClick={() => message.info('这是一个提示')}>
      信息提示
    </Button>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::

## 不同状态

::: demo

```tsx
function Demo () {
  const type = ['info', 'success', 'warning', 'error']
  const btnType = ['default', 'success', 'warning', 'danger']

  return (
    <Space>
      {
        type.map((item, index) => {
          return (
            <Button 
              type={btnType[index]} 
              key={index} 
              onClick={() => message[item]("这是一个提示")}>
              {item}
            </Button>
          )
        })
      }
    </Space>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::
