const ts = require('typescript')

const result = ts.createSourceFile('test.tsx', `
    interface testProps {
        a?: number,
        b: string
        c ?:(a: number) => void
    }

    function Test (props: testProps) {
        return (
            <div>hello world</div>
        )
    }
`, ts.ScriptTarget.ES5, true)

console.log(result)

ts.forEachChild(result, (node) => {
    console.log(node)
})
// console.log(1)
// const tsconfig = require('./packages/otaku-ui/tsconfig.json')

// const result = ts.createProgram(['./packages/otaku-ui/src/index.ts'], tsconfig)

// console.log(result.getSourceFiles())

