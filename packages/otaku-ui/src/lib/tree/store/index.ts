import { TreeOptions } from "../tree"
import { Node } from "./node"

export class Store<T extends Record<string, unknown>[] = []> {
  options: TreeOptions
  data: T

  constructor (data: T, options: TreeOptions) {
    this.data = data
    this.options = options
  }
  
  createTree (data: T, depth = 1, parent: Node | null = null) {
    const { id, name, children = 'children' } = this.options

    const result = data.map((item) => {
      const node: Node = new Node({
          id: item[id] as string | number,
          name: item[name]  as string,
          treeOptions: this.options,
          data: item,
          depth,
          parent: parent,
          checked: false,
          indeterminate: false,
          collapse: false,
          loading: false,
          children: []
        })

      node.children = Array.isArray(item[children]) 
        ? this.createTree(item[children], depth + 1, node) 
        : null

      return node
    })

    depth = 1
    return result
  }

  setDefaultCheckedKeys () {
    console.log(2)
  }
}