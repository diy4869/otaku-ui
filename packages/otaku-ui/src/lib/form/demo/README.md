---
import: 
  import { useState, useRef, createRef } from 'react';
  import { Form, FormItem, Button, Input, DatePicker, FormValidate } from 'otaku-ui';
api:
  {
    module: ['Form', 'FormItem']
  }
---

## Form 表单

::: demo

```tsx
function Example() {
  const ref = createRef(null)
  let formValidate

  const form = useRef(null)
  const [model, setModel] = useState({
    input: '',
    input2: ''
  })
  const rules = {
    input: {
      required: true,
      message: '输入内容不能为空'
    },
    input2: {
      min: 3,
      max: 10,
      message: '输入内容必须在 3-10 之间',
      required: true
    }
  }

  const submit = (e) => {
    e.preventDefault()
    formValidate.validate().then(res => {
      console.log('成功')
    })
  }

  return (
    <Form
      rules={rules}
      model={model}
      ref={ref}
      getFormInstance={(instance) => {
        formValidate = instance
      }}>
      <FormItem label='输入框' field="input" required>
        <Input placeholder='输入点什么吧' onChange={(val) => {
          setModel({
            ...model,
            input: val
          })
        }}></Input>
      </FormItem>
      <FormItem label='输入框2' field="input2" required>
        <Input
          placeholder='输入点什么吧'
          onChange={val => {
            setModel({
              ...model,
              input2: val
            })
          }}></Input>
      </FormItem>

      <FormItem>
        <Button type='primary' onClick={submit}>提交</Button>
      </FormItem>
    </Form>
  )
}

ReactDOM.createRoot(container).render(<Example/>)
```
:::

::: api
:::