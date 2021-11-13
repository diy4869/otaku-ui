---
import: 
  import { ImageCropper } from 'otaku-ui'
---

::: demo

```tsx
function Example () {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="error">异常按钮</Button>
    </div>
  )
}

ReactDOM.render(<Example/>, container)
```

```css
.style {
  width: 200px;
  height: 300px;
  border: 2px solid red;
}
```
:::

::: demo

```tsx
ReactDOM.render(
  <div>
    <Button>默认按钮</Button>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="error">异常按钮</Button>
  </div>,
  container
)
```

```css
.style {
  width: 200px;
  border: 2px solid red;
}
```
:::