---
import:
  import { BreadCrumbs, BreadCrumbsItem, Message } from 'otaku-ui'
api:
  {
    module: ['BreadCrumbs', 'BreadCrumbsItem']
  }
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

ReactDOM.createRoot(container).render(<Demo/>)
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
              icon={<span className="iconfont otaku-icon-user"></span>}
              key={index}>{item}</BreadCrumbsItem>
            )
        })
      }
    </BreadCrumbs>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::


## api

::: api
:::