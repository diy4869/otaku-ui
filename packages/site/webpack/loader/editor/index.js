const ts = require('typescript')


const code = `
  type type2 = 1 | 2 | 3

  const b: type2 = 4;

  console.log(a)

`

// ts.create
console.log(ts.transpile(code))
