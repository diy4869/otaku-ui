---
import:
  import { Picker } from 'otaku-ui'
---

## Picker 选择器

::: demo

```tsx
function Demo () {
  const columns = Array.from({
    length: 50
  }).map((_, index) => {
    return {
      id: index,
      name: '第' + index + '个选项'
    }
  })
  
  return (
    <Picker columns={columns}></Picker>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::