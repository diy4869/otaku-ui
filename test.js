// const ts = require('typescript')

// const result = ts.createSourceFile('test.tsx', `
//     interface testProps {
//         a?: number,
//         b: string
//         c ?:(a: number) => void
//     }

//     function Test (props: testProps) {
//         return (
//             <div>hello world</div>
//         )
//     }
// `, ts.ScriptTarget.ES5, true)

// console.log(result)

// ts.forEachChild(result, (node) => {
//     console.log(node)
// })
// console.log(1)
// const tsconfig = require('./packages/otaku-ui/tsconfig.json')

// const result = ts.createProgram(['./packages/otaku-ui/src/index.ts'], tsconfig)

// console.log(result.getSourceFiles())

const a = {
    b: 'hello world',
    c: 'hello c'
}

const str = '123 {a.b} test {a.c}'

const get = require('lodash/get')

function replaceStr(str, data) {
    const stack = []
    let start = 0
    let end = 0
    let result = ''

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '{') { 
            start = i
        } else if (str[i] === '}') {
            end = i
            stack.push([start + 1, end])
        }
    }

    for (let i = 0; i < stack.length; i++) {
        const template = get({ a: data }, str.substring(stack[i][0], stack[i][1]))
        result += str.substring(i === 0 ? 0 : stack[i - 1][1] + 1, stack[i][0] - 1) + template
    }

    console.log(result)

}

replaceStr(str, a)