---
import: 
  import { useRef } from 'react';
  import { Tooltip, Button } from 'otaku-ui';
---

## Tooltip

::: demo

多个方向的 Tooltip

```tsx
function Demo () {
  const text = 'prompt text';
  const buttonWidth = 70;

  return (
    <div className="demo-tooltip">
      <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap', display: 'flex' }}>
        <Tooltip placement="top-start" content={text}>
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" content={text}>
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="top-end" content={text}>
          <Button>TR</Button>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Tooltip placement="left-start" content={text}>
          <Button>LT</Button>
        </Tooltip>
        <Tooltip placement="left" content={text}>
          <Button>Left</Button>
        </Tooltip>
        <Tooltip placement="left-end" content={text}>
          <Button>LB</Button>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 }}>
        <Tooltip placement="right-start" content={text}>
          <Button>RT</Button>
        </Tooltip>
        <Tooltip placement="right" content={text}>
          <Button>Right</Button>
        </Tooltip>
        <Tooltip placement="right-end" content={text}>
          <Button>RB</Button>
        </Tooltip>
      </div>
      <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap', display: 'flex'  }}>
        <Tooltip placement="bottom-start" content={text}>
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" content={text}>
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottom-end" content={text}>
          <Button>BR</Button>
        </Tooltip>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Demo/>,
  container,
);
```
```css
.demo-tooltip .otaku-button {
  width: 70px;
}
```
:::