interface NodeOptions {
  id: string | number
  name: string
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
  data: Record<string, unknown>
  depth: number
  checked: boolean
  indeterminate: boolean
  collapse: boolean
  loading: boolean
  parent: Node | null
  children: Node[] | null
  
  constructor (options: NodeOptions) {
    const { 
      id,
      name,
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
    this.data = data
    this.depth = depth
    this.parent = parent
    this.checked = checked
    this.indeterminate = indeterminate
    this.children = children
    this.collapse = collapse
    this.loading = loading
  }

  hasChecked (node: Node) {
    if (!node?.children && node.checked !== false) return true
    return node.children?.length !== 0 && node.children?.every((item: Node) => item.checked)
  }

  hasIndeterminate (node: Node) {
    return !node.hasChecked(node) && node.children?.some((item: Node) => item.checked || item.indeterminate)
  }

  setChecked (checked: boolean) {
    if(checked === false) {
      this.indeterminate = false
    }
    this.checked = checked
    
    // 自上向下
    const currentToBottom = (node: Node, checked: boolean) => {
      node.children?.forEach(item => {
        if (Array(item.children)) {
          currentToBottom(item, checked)
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
}