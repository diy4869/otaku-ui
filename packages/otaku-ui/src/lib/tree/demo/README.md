---
import:
  import { Tree, Checkbox } from 'otaku-ui';
  import { useState } from 'react';
api:
  {
    module: []
  }
---

## 全选

::: demo

```tsx
function Example () {
  const [checkAll, setCheckAll] = useState(false)

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
    <>
     <Checkbox 
      checked={checkAll}
      onChange={e => {
        setCheckAll(e.target.checked)
      }}>全选</Checkbox>
      <Tree 
        checkedAll={checkAll}
        // defaultExpandAll={true}
        defaultExpandKeys={['0-0','0-0-0']}
        defaultCheckedKeys={['0-0-0-0', '0-0-0-2','0-0-1', '0-2']}
        options={{
          id: 'key',
          name: 'title',
          children: 'children'
        }}
      data={treeData}/> 
    </>
  )
}


ReactDOM.createRoot(container).render(<Example/>)
```
:::

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
       const data = new Array(10000).fill(undefined).map((item, index) => {
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
      height={100}
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