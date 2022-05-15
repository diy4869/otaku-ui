import { TreeOptions } from "../tree"

interface NodeOptions {
  id: string | number
  name: string
  treeOptions: TreeOptions
  data: Record<string, unknown>
  depth: number
  checked: boolean
  indeterminate: boolean
  collapse: boolean
  loading: boolean
  parent: Node | null
  children: Node[] | null
}

export class Node {
  id: string | number
  name: string
  treeOptions: TreeOptions
  data: Record<string, unknown>
  depth: number
  checked: boolean
  indeterminate: boolean
  collapse: boolean
  loading: boolean
  parent: Node | null
  children: Node[] | null
  loaded: boolean
  
  constructor (options: NodeOptions) {
    const { 
      id,
      name,
      treeOptions,
      data,
      depth, 
      parent, 
      checked, 
      indeterminate, 
      collapse, 
      loading, 
      children 
    } = options

    this.id = id
    this.name = name
    this.treeOptions = treeOptions
    this.data = data
    this.depth = depth
    this.parent = parent
    this.checked = checked
    this.indeterminate = indeterminate
    this.children = children
    this.collapse = collapse
    this.loading = loading
    this.loaded = false
  }

  hasChecked (node: Node) {
    if (!node?.children && node.checked !== false) return true
    return node.children?.length !== 0 && node.children?.every((item: Node) => item.checked)
  }

  hasIndeterminate (node: Node) {
    return !node.hasChecked(node) && node.children?.some((item: Node) => item.checked || item.indeterminate)
  }

  setChecked (checked: boolean) {
    if (checked === false) {
      this.indeterminate = false
    }
    this.checked = checked

    console.log(this,checked)
    
    // 自上向下
    const currentToBottom = (node: Node, checked: boolean) => {
      node.children?.forEach(item => {
        if (Array(item.children)) {
          currentToBottom(item, checked)
        }
        if (checked === false) {
          item.indeterminate = false
        }
        item.checked = checked

      })
    }

    // 自下向上
    const currentToTop = (node: Node | null, checked: boolean) => {
      if (node === null) return

      node.checked = this.hasChecked(node) as boolean
      node.indeterminate = this.hasIndeterminate(node) as boolean

      currentToTop(node.parent, checked)
    }

    currentToBottom(this, checked)

    if (this.depth !== 1) {
      currentToTop(this, checked)
    }
  }

  setCollapse (collapse: boolean) {
    this.collapse = collapse
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  load (fn: (resolve: (res: any) => void, reject:  (err: any) => void) => void) {
    this.loading = true
    return new Promise<Record<string, unknown>[]>(fn).then((res) => {
      if (!this.loaded) {
        this.insert(res)
      }
      if (this.checked) {
        this.setChecked(true)
      }
      
    }).finally(() => {
      this.loaded = true
      this.loading = false
    })
  }

  insert (data: Record<string, unknown>[]) {
    const { id, name, children = 'children' } = this.treeOptions

    const dfs = (data: Record<string, unknown>[], depth: number, parent: Node) => {
      if (!data) return []
      const result = data.map((item) => {
        const node: Node = new Node({
          id: item[id] as string | number,
          name: item[name]  as string,
          treeOptions: this.treeOptions,
          data: item,
          depth,
          parent,
          checked: false,
          indeterminate: false,
          collapse: false,
          loading: false,
          children: []
        })
  
        node.children = Array.isArray(item[children]) 
          ? dfs(item[children] as Record<string, unknown>[], depth + 1, node) 
          : []
  
        return node
      })
  
      depth = this.depth
      return result
    }

    this.children = this.children 
      ? this.children.concat(dfs(data, this.depth + 1, this)) 
      : dfs(data, this.depth + 1, this)
  }
}

