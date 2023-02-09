---
import:
  import { UploadImage, Button } from 'otaku-ui'
api:
  {
    module: ['UploadImage']
  }
---


## 图片上传

::: demo

```tsx
function Demo () {
  return (
    <UploadImage>
      <Button type="primary">图片上传</Button>
    </UploadImage>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::

## api

::: api
:::