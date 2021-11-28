import ReactDOM from 'react-dom'

type El = HTMLElement & {
  telportId: symbol
}

let id = 1

interface TeleportOptions {
  el: El
  selector?: string
  show?: boolean
}

export class Teleport {
  numberId: number
  telportId: symbol
  el: HTMLElement
  position: Pick<DOMRect, 'top' | 'left' | 'right' | 'bottom'>
  zIndex: number
  selector: string
  show: boolean
  map: Map<Symbol, HTMLElement>


  constructor(options: TeleportOptions) {
    const { el, selector = 'body', show = true } = options

    this.telportId = Symbol(`${id}`)
    this.numberId = id
    this.map = new Map()
    this.el = el as any
    this.zIndex = 2000

    this.position = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
    this.selector = selector
    this.show = show

    id++

    // @ts-ignore
    if (!this.el.telportId) {
      this.init()
    }

    if (this.show) {
      this.showNode()
    } else {
      this.hideNode()
    }

  }

  findNode(node: Element) {
    // @ts-ignore
    const findNode = Array.of(...node?.children).find(item => {
      // @ts-ignore
      return item.numberId === this.el.numberId
    })
    return findNode
  }

  showNode() {
    const container = document.querySelector(this.selector)

    if (container) {
      const findNode = this.findNode(container)
      //@ts-ignore
      findNode.style.display = 'block'
    }
  }

  hideNode() {
    const container = document.querySelector(this.selector)

    if (container) {
      const findNode = this.findNode(container)

      console.log(findNode)
      // @ts-ignore
      if (findNode) findNode.style.display = 'none'
    }
  }

  init() {
    const container = document.querySelector(this.selector)

    if (!container) return

    // const cloneNode: any = this.el.cloneNode(true)
    this.position = this.el?.getBoundingClientRect()

    // const node = cloneNode.firstChild
    console.log(this.el)

    this.el.style.cssText = `
      display: ${!this.show ? 'block' : 'none'};
      z-index: ${this.zIndex};
      position: fixed;
      top: ${this.position.top}px;
      left: ${this.position.left}px;
    `
    this.el.numberId = this.numberId
    this.el.telportId = this.telportId

    // @ts-ignore
    this.el.numberId = this.numberId
    // @ts-ignore
    this.el.telportId = this.telportId

    const portal = ReactDOM.createPortal(this.el, container)
    this.map.set(this.telportId, this.el)

    console.log(portal)
    // container.appendChild(cloneNode)

    const parent = this.el.parentElement

    // @ts-ignore
    const findNode = this.findNode(parent)

    console.log(findNode)
    if (findNode) {
      this.el.parentElement?.removeChild(findNode)
    }
  }

  remove() {

  }
}
