import { Store } from './index'

export interface NodeOptions {
  id: string | number
  name: string
  data: Record<string, unknown> | null
  depth?: number
  checked?: boolean
  indeterminate?: boolean
  collapse?: boolean
  loading?: boolean
  disabled?: boolean
  parent: Node | null
  children: Node[] | null
  store: Store
}

export class Node {
  id: string | number
  name: string
  data: Record<string, unknown> | null
  depth: number
  checked: boolean
  indeterminate: boolean
  collapse: boolean
  loading: boolean
  parent: Node | null
  store: Store
  children: Node[] | null
  loaded: boolean
  options: NodeOptions
  
  constructor (options: NodeOptions) {
    const { 
      id,
      name,
      data,
      parent,
      children,
      store,
      depth = 1,
      checked = false, 
      indeterminate = false, 
      collapse = false, 
      loading = false
    } = options

    this.id = id
    this.name = name
    this.data = data
    this.depth = depth
    this.parent = parent
    this.checked = checked
    this.indeterminate = indeterminate
    this.children = children
    this.collapse = collapse
    this.loading = loading
    this.loaded = false
    this.store = store
    this.options = options
  }

  setOptions (options: NodeOptions) {
    this.options = options
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
    if (this.store.accordion) {
      if (collapse === false) {
        this.collapse = false
      } else {
        const children = this.parent?.children
        
        children?.forEach(node => {
          node.collapse = false
        })

        this.collapse = true
      }
    } else {
      this.collapse = collapse
    }
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

  setChildren (data: Record<string, unknown>[], append = false) {
    const { id = 'id', name = 'name', children = 'children' } = this.store.treeOptions

    const dfs = (data: Record<string, unknown>[], depth: number, parent: Node) => {
      if (!data) return []
      const result = data.map((item) => {
        const node: Node = this.store.createNode({
          id: item[id] as number | string,
          name: item[name] as string, 
          data: item,
          children: [],
          parent,
          depth
        })
  
        node.children = Array.isArray(item[children]) 
          ? dfs(item[children] as Record<string, unknown>[], depth + 1, node) 
          : []
  
        return node
      })
  
      depth = this.depth
      return result
    }

    const result = dfs(data, this.depth + 1, this)

    if (append) {
      this.children = this.children ? this.children.concat(result) : result
    } else {
      this.children = result
    }
  }
}

