---
import:
  import { Alert } from 'otaku-ui'
api:
  {
    module: ['Alert']
  }
---

## Alert 警告

::: demo

测试

```tsx
function Demo () {
  const type = ['info', 'success', 'warning', 'error']

  return (
    <ul class="alert-demo-container">
        {
          type.map((item, index) => {
            return (
              <li>
                <Alert type={item} key={index}>这是一个 {item} 提示</Alert>
              </li>
            )
          })
        }
    </ul>
    
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```

```css
.alert-demo-container li {
  margin-bottom: 20px;
}
```
:::

## api

::: api
:::