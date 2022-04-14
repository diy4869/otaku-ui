---
import: 
  import { useRef } from 'react';
  import { Tooltip, Button } from 'otaku-ui';
api:
  {
    module: ['Tooltip']
  }
---

## Tooltip

::: demo

多个方向的 Tooltip

```tsx
function Demo () {
  const arr = [
    ['top-start', 'top', 'top-end'],
    ['left-start','',  'right-start'],
    ['left', '', 'right'],
    ['left-end', '', 'right-end'],
    ['bottom-start', 'bottom', 'bottom-end']
  ]

  return (
    <ul className="demo-tooltip">
      {
        arr.map((row, index) => {
          return (
            <li index={index} class="row">
                {
                  row.map((column, columnIndex) => {
                    if (index > 0 && index < 4 && ![0, 2].includes(columnIndex)) {
                      return <span></span>
                    } else {
                      return (
                        <Tooltip placement={column} content={column}>
                          <Button>{column}</Button>
                        </Tooltip>
                      )
                    }
                  })
                }
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
:root {
  --gap: 8px;
}
.demo-tooltip {
  display: grid;
  grid-gap: var(--gap);
  grid-template-rows: repeat(5, auto);
}
.demo-tooltip .row {
  display: grid;
  grid-gap: var(--gap);
  grid-template-columns: repeat(3, 105px);
}

.demo-tooltip .otaku-button {
  width: 105px;
}
```
:::

