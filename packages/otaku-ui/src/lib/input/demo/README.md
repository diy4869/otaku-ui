---
import:
  import { Input, Grid, GridItem, Button, Icon } from 'otaku-ui'
api:
  {
    module: ['Input']
  }
---



## 一个普通的输入框

::: demo

一个普通的输入框

```tsx
ReactDOM.createRoot(container).render(<Input placeholder="输入点什么吧..."></Input>)
```
:::


## 可调整大小的输入框

::: demo

一个普通的输入框

```tsx
ReactDOM.createRoot(container).render(<ul>
    <li style={{
      marginBottom: '10px'
    }}>
      <Input size="small" placeholder="小型输入框"></Input>
    </li>
    <li style={{
      marginBottom: '10px'
    }}>
      <Input size="middle" placeholder="中型输入框"></Input>
    </li>
      <li>
      <Input size="large" placeholder="大型输入框"></Input>
    </li>
  </ul>)

```
:::

## 密码输入框

::: demo

一个普通的输入框

```tsx
ReactDOM.createRoot(container).render(<Input placeholder="输入点什么吧..." type="password"></Input>)
```
:::

## 禁用的输入框

::: demo

一个普通的输入框

```tsx
ReactDOM.createRoot(container).render(<Input placeholder="输入点什么吧..." disabled></Input>)
```
:::

## 带有 icon 的输入框

::: demo

一个普通的输入框

```tsx
ReactDOM.createRoot(container).render(<ul>
    <li style={{
      marginBottom: '10px'
    }}>
      <Input placeholder="前面的icon" beforeIcon={<Icon name="search-line"></Icon>}></Input>
    </li>
    <li style={{
      marginBottom: '10px'
    }}>
      <Input placeholder="后面的icon" afterIcon={<Icon name="search-line"></Icon>}></Input>
    </li>
  </ul>)

```
:::

## 可清空的输入框

::: demo

一个普通的输入框

```tsx
ReactDOM.createRoot(container).render(<Input placeholder="输入点什么吧..." clear></Input>)
```
:::


## 有前后元素的输入框

::: demo

一个普通的输入框

```tsx
ReactDOM.createRoot(container).render(<ul>
    <li style={{
      marginBottom: '10px'
    }}>
      <Input placeholder="前面的元素" size="middle" beforeNode={
        <Button size="middle" type="primary">前面的按钮</Button>
      }></Input>
    </li>
    <li style={{
      marginBottom: '10px'
    }}>
      <Input placeholder="前面的元素" size="middle" afterNode={
        <Button size="middle" type="primary">后面的按钮</Button>
      }></Input>
    </li>
  </ul>)

```
:::

## api

