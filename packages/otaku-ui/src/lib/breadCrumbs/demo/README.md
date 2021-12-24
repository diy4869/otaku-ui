---
import:
  import { BreadCrumbs, BreadCrumbsItem, Message } from 'otaku-ui'
---

## BreadCrumbs 面包屑

::: demo

```tsx
function Demo () {
  const type = ['Home', 'Application Center', 'An Application', 'List']

  return (
    <BreadCrumbs>
      {
        type.map((item, index) => {
          return (
            <BreadCrumbsItem 
              key={index}>{item}</BreadCrumbsItem>
            )
        })
      }
    </BreadCrumbs>
  )
}

ReactDOM.render(<Demo/>, container)
```
:::

## 自定义Icon

::: demo

```tsx
function Demo () {
  const type = ['Home', 'Application Center', 'An Application', 'List']

  return (
    <BreadCrumbs>
      {
        type.map((item, index) => {
          return (
            <BreadCrumbsItem 
              icon={<span class="iconfont otaku-icon-user"></span>}
              key={index}>{item}</BreadCrumbsItem>
            )
        })
      }
    </BreadCrumbs>
  )
}

ReactDOM.render(<Demo/>, container)
```
:::
