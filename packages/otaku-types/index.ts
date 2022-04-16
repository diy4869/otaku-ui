
const data = [
  {
    a: 1,
    c: {
      a: 1
    },
    d: [
      {
        a: 1
      }
    ]
  }
]


export type Join<T extends unknown[], R = ''> = unknown



type result = Join<[1, 2, 3]>


export type Key = unknown
