import type { TreeOptions } from "../tree"
import { Node } from "./node"
// import { flattern } from '../../../utils'

interface StoreOptions {
  treeOptions: TreeOptions
  async?: boolean
  accordion?: boolean
}

export class Store<T extends Record<string, unknown>[] = []> {
  treeOptions: TreeOptions
  data: T
  async: boolean
  accordion: boolean

  constructor (data: T, options: StoreOptions) {
    const {
      treeOptions,
      accordion = false,
      async = false
    } = options

    this.async = async
    this.data = data
    this.accordion = accordion
    this.treeOptions = treeOptions
  }
  
  createTree (data: T, depth = 1, parent: Node | null = null) {
    const { id, name, children = 'children' } = this.treeOptions

    const result = data.map((item) => {
      const node: Node = new Node({
          id: item[id] as string | number,
          name: item[name]  as string,
          treeOptions: this.treeOptions,
          data: item,
          async: this.async,
          depth,
          parent,
          accordion: this.accordion,
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