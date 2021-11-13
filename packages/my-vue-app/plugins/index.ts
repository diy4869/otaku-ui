export default function mdToReact () {
  return {
    name: 'vite-plugin-md',
    // options() { },
    // buildStart() { },
    // resolveId() { },
    // load() { },
    transform(context, code, id) {
      console.log('transform', context, code)
      return code
    },
    // buildEnd() { },
    // closeBundle () {}
  }
}