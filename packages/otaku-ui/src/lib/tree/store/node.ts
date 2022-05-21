import { TreeOptions } from "../tree"

interface NodeOptions {
  id: string | number
  name: string
  treeOptions: TreeOptions
  data: Record<string, unknown>
  depth?: number
  checked?: boolean
  indeterminate?: boolean
  collapse?: boolean
  loading?: boolean
  async?: boolean
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
  async?: boolean
  
  constructor (options: NodeOptions) {
    const { 
      id,
      name,
      treeOptions,
      data,
      parent,
      children,
      depth = 1,
      checked = false, 
      indeterminate = false, 
      collapse = false, 
      loading = false,
      async = false
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
    this.async = async
  }

  hasChecked (node: Node) {
    if (node?.children?.length === 0 && node.checked !== false) return true
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
    
    // 自上向下
    const currentToBottom = (node: Node, checked: boolean) => {
      node.children?.forEach(item => {
        if (Array.isArray(item.children)) {
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

  setLoading (loading: boolean) {
    this.loading = loading
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  load (fn: (resolve: (res: any) => void, reject:  (err: any) => void) => void) {
    this.loading = true
    return new Promise<Record<string, unknown>[]>(fn).then((res) => {
      if (!this.loaded) {
        this.setChildren(res)
      }

      if (this.checked) {
        this.setChecked(true)
      }
      
    }).finally(() => {
      this.loaded = true
      this.loading = false
    })
  }

  private createNode (
    id: string | number, 
    name: string, data: Record<string, unknown>, 
    children: Node[] = [],
    parent: Node | null = null,
    depth = 1
  ) {
    return new Node({
      id,
      name,
      treeOptions: this.treeOptions,
      data,
      depth,
      parent,
      checked: false,
      indeterminate: false,
      collapse: false,
      loading: false,
      children
    })
  }

  setChildren (data: Record<string, unknown>[]) {
    const { id = 'id', name = 'name', children = 'children' } = this.treeOptions

    const dfs = (data: Record<string, unknown>[], depth: number, parent: Node) => {
      if (!data) return []
      const result = data.map((item) => {
        const node: Node = this.createNode(item[id] as number | string, item[name] as string, item, [], parent, depth)
  
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

  // 追加节点
  append () {
    console.log('append')
  }

  // 删除节点
  remove () {
    console.log('remove')
  }
}

