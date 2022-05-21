---
import:
  import { Tree } from 'otaku-ui';
api:
  {
    module: []
  }
---

## 异步加载的树

::: demo
234

```tsx
function Example () {
  const treeData = [
    {
      title: '0',
      key: '0',
    },
    {
      title: '1',
      key: '1',
    },
    {
      title: '2',
      key: '2',
    },
  ];

  const load = (node, resolve, reject) => {
    setTimeout(() => {
       const data = new Array(3).fill(undefined).map((item, index) => {
        return {
          key: node.name + '-' + index,
          title: node.name + '-' + index,
        }
      })

      resolve(data)
    }, 1000)

  }

  return (
    <Tree 
      options={{
        id: 'key',
        name: 'title',
        children: 'children'
      }}
      data={treeData}
      loadTree={load}/>
  )
}


ReactDOM.createRoot(container).render(<Example/>)
```
:::

## Tree 树

::: demo

```tsx

function Example () {
  const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  return (
    <Tree options={{
      id: 'key',
      name: 'title',
      children: 'children'
    }} data={treeData}/>
  )
}


ReactDOM.createRoot(container).render(<Example/>)
```
:::

## api

::: api
:::