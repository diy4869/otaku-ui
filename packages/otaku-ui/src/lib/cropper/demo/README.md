---
import: 
  import { ImageCropper, Button } from 'otaku-ui';
  import { useState } from 'react';
  import miku from '../miku.jfif';
api:
  {
    module: ['ImageCropper']
  }
---

## ImageCropper 图片裁剪

::: demo

```tsx
function Demo () {
  const [show, setShow] = useState(false)

  return (
    <div>
      <Button type="primary" onClick={() => {
        setShow(true)
      }}>图片裁剪</Button>
      <ImageCropper 
        visible={show} 
        imageURL={miku}
        onClose={() => setShow(false)}
        onCancel={() => setShow(false)}
        onConfirm={() => setShow(false)}>
      </ImageCropper>
    </div>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::



## api

::: api
:::