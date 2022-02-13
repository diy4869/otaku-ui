---
import:
  import { Timeline, TimelineItem } from 'otaku-ui'
api:
  {
    module: ['Timeline', 'TimelineItem']
  }
---



## Timeline 时间线

::: demo

```tsx
ReactDOM.render(
  <Timeline>
    <TimelineItem title="11:00">
      早上十一点
    </TimelineItem>
    <TimelineItem title="13:00">
      下午1点
    </TimelineItem>
    <TimelineItem title="14:00">
      下午2点
    </TimelineItem>
    <TimelineItem title="20:00">
      晚上八点
    </TimelineItem>
  </Timeline>,
  container
)

```
:::

## api

::: api
:::