const ts = require('typescript')

// console.log(typescipt.parsr)
console.log(Object.keys(ts).length)

const str = `
  type N = number

  interface B {
    fn: void
  }

  export interface Props extends B{
    /**
     * xxxx
     * @zh-cn 中文
     * @en 英语
    */
    a: N,
    b?: string,
    c: boolean,
    d: any,
    e: (a: number) => void
  }

  export function B () {
    return (
      <div>B组件</div>
    )
  }

  export default function Test (props: Props) {
    return (
      <div>hello world</div>
    )
  }
`

const str2 = `
export * from './a'
export default b

export {
  c
}
`
const tsconfig = require('./packages/otaku-ui/tsconfig.json')

const program = ts.createProgram(['./packages/otaku-ui/src/index.ts'], tsconfig)
const root = ts.createSourceFile('1.tsx', str, ts.ScriptTarget.ESNext, true)


console.log(program.getTypeChecker())


// ts.forEachChild(root, (node) => {
//   console.log(ts.SyntaxKind[node.kind], node.kind)
//   console.log(ts.isExportDeclaration(node))
// })

// const printAllChildren = (node, depth = 0) => {
//   console.log(new Array(depth + 1).join('----'), ts.SyntaxKind[node.kind], node.pos, node.end);
//   node.getChildren().forEach((c) => printAllChildren(c, depth + 1));
// };

// printAllChildren(root)

