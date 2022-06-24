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
      <Button>图片裁剪</Button>
      <ImageCropper visible={show} imageURL={miku}></ImageCropper>
    </div>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::



## api

::: api
:::