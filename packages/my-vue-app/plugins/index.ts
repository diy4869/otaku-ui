export default function mdToReact() {
  return {
    name: 'vite-plugin-md',
    // options() { },
    buildStart() { },
    resolveId(context, source) {
      console.log('resolveId', source)
    },
    // load() { },
    transform(context, code, id) {
      debugger
      console.log('transform', code)

      return code
    },
    // buildEnd() { },
    // closeBundle () {}
  }
}