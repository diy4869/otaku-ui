const transform = require('./generator/index')

module.exports = {
  render (tokens, index) {
    if (tokens[index].nesting === 1) {
      const apiType = transform(
        'D:\\code\\otaku-ui\\packages\\otaku-ui\\src\\lib\\button\\button.tsx',
        {}
      )
      const fileData = Object.values(apiType)[0]
      const result = data.api.module.map(component => {
        return fileData.function[component]
      })

      const renderComponent = result.reduce((str, current, index) => {
        const interface = current.args[0].type

        str.push(` <Api 
              code={\`${interface.code}\`}
              data={\`${json5.stringify(interface.property)}\`}
              ></Api>`)

        return str
      }, [])

      console.log(renderComponent)

      // console.log( `<>${renderComponent}`)
      return `<>
          { 
            ${renderComponent}
          }`
    } else {
      return `</>`
    }
  }
}
