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
  position: Pick<DOMRect, 'top' | 'left' | 'right'| 'bottom'>
  zIndex: number
  selector: string
  show: boolean
  map: Map<Symbol, HTMLElement>


  constructor (options: TeleportOptions) {
    const { el, selector = 'body', show = true } = options
    
    this.telportId = Symbol(`${id}`)
    this.numberId = id
    this.map = new Map()
    this.el = el as any
    this.zIndex = 2000
    console.log(this.el)
    this.position = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
    this.selector = selector
    this.show = show

    id++
    // this.position = this.el?.getBoundingClientRect()
    console.log(this.position)
    
    // @ts-ignore
    if (!this.el.telportId) {
      this.init()
    }

    if (this.show) {
      this.showNode()
    } else {
      this.hideNode()
    }
    // console.log(thi)
   
  }
  findNode(node: Element) {
    // @ts-ignore
    const findNode = Array.of(...node?.children).find(item => {
      // @ts-ignore
      return item.numberId === this.el.numberId
    })
    return findNode
  }

  showNode () {
    const container = document.querySelector(this.selector)
    console.log(container)


    if (container) {
      const findNode = this.findNode(container)
      console.log('find', findNode)
      findNode.style.display = 'block'
    }
  }
  hideNode() {
    const container = document.querySelector(this.selector)
    console.log(container)


    if (container) {
      const findNode = this.findNode(container)
      console.log('find', findNode)
      findNode.style.display = 'none'
    }
  }



  init () {
    const container = document.querySelector(this.selector)
    console.log(container)
    if (!container) return
    const cloneNode: any = this.el.cloneNode(true)
    this.position = this.el?.getBoundingClientRect()

    // const node = cloneNode.firstChild
    // console.log(node)
    cloneNode.style.cssText = `
      display: ${!this.show ? 'block' : 'none'};
      z-index: ${this.zIndex};
      position: fixed;
      top: ${this.position.top}px;
      left: ${this.position.left}px;
    `
    cloneNode.numberId = this.numberId
    cloneNode.telportId = this.telportId

    // @ts-ignore
    this.el.numberId = this.numberId
    // @ts-ignore
    this.el.telportId = this.telportId

    this.map.set(this.telportId, this.el)

    container.appendChild(cloneNode)

    const parent = this.el.parentElement

    // @ts-ignore
    const findNode = this.findNode(parent)
    if (findNode) {
      this.el.parentElement?.removeChild(findNode)
    }
    // console.log(findNode.children, )
    // children.forEach((item, index) => .{
    //   if (item.telportId) {
        // parent?.removeChild(item)
    //   }
    // })
  }

  remove () {

  }
  
  // setState (el: HTMLElement, show: false) {
  //   const container = this.map.get(this.id)

  //   if (container) {
  //     container.style.display = show ? 'block' : 'none'
  //   }
    
  // }
}
