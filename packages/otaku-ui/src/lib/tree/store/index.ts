import type { TreeOptions } from "../tree"
import { Node, NodeOptions } from "./node"
import { flattern } from '../../../utils'

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
  root: Node

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
    this.root = this.createRoot([])
  }

  createNode (options: Omit<NodeOptions, 'store'>) {
    return new Node({
      ...options,
      store: this
    })
  }

  private createRoot (children: Node[] = []) {
    return new Node({
      id: 'root',
      name: 'root',
      children,
      depth: 0,
      parent: null,
      data: null,
      collapse: true,
      store: this
    })
  }

  createTree (data: storeData) {
    const dfs = (data: storeData, depth = 1, parent: Node | null = null) => {
      const { id, name, children = 'children' } = this.treeOptions
  
      const result = data.map((item) => {
        const node: Node = this.createNode({
          id: item[id] as string | number,
          name: item[name]  as string,
          data: item,
          depth,
          parent,
          children: []
        })
  
        node.children = Array.isArray(item[children]) 
          ? dfs(item[children], depth + 1, node) 
          : []
  
        return node
      })
  
      depth = 1
      return result
    }

    this.root.children = dfs(data, this.root.depth + 1, this.root)

    return this.root.children
  }

  getCheckedNodes (indeterminate = true) {
    const flatternTree = flattern(this.root.children as Node[])

    return flatternTree.reduce((total, current) => {
      if (indeterminate) {
        if (current.checked || current.indeterminate) {
          total.concat(current)
        }
        return total
      } else {
        return total.concat(current)
      }
    }, [])
  }

  setCheckedKeys (keys: number[] | string[]) {
    const map = new Map(
      keys.map(item => [item, item])
    )
    const flatternTree = flattern(this.root.children as Node[])

    flatternTree.forEach(node => {
      if (map.get(node.id)) {
        node.setChecked(true)
      }
    })
  }

  setExpandKeys (keys: number[] | string[]) {
    const map = new Map(
      keys.map(item => [item, item])
    )
    const flatternTree = flattern(this.root.children as Node[])

    flatternTree.forEach(node => {
      if (map.get(node.id)) {
        node.setCollapse(true)
      }
    })
  }

  checkedAll (checked: boolean) {
    this.root.setChecked(checked)
  }

  expandAll (collapse: boolean) {
    const dfs = (arr: Node[]) => {
      arr.forEach(node => {
        node.collapse = collapse
        if (node.children) {
          dfs(node.children)
        }
      })
    }
    
    dfs(this.root.children as Node[])
  }
}
