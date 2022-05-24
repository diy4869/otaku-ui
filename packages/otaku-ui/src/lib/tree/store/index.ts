import type { TreeOptions } from "../tree"
import { Node, NodeOptions } from "./node"

export interface StoreOptions {
  treeOptions: TreeOptions
  async?: boolean
  accordion?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type storeData = Record<string, any>[]

export class Store {
  treeOptions: TreeOptions
  data: storeData
  async: boolean
  accordion: boolean

  constructor (data: storeData, options: StoreOptions) {
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
  
  createNode (options: NodeOptions) {
    return new Node(options)
  }

  createTree (data: storeData, depth = 1, parent: Node | null = null) {
    const { id, name, children = 'children' } = this.treeOptions

    const result = data.map((item) => {
      const node: Node = this.createNode({
          id: item[id] as string | number,
          name: item[name]  as string,
          data: item,
          store: this,
          depth,
          parent,
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

  // 追加节点
  append () {
    console.log('append')
  }

  // 删除节点
  remove () {
    console.log('remove')
  }
}