import { throttle } from "lodash"

type El = HTMLElement & {
  telportId: symbol
}

let id = 1

interface TelportOptions {
  el: El
  selector?: string
  show?: boolean
}

export class Telport {
  id: symbol
  el: HTMLElement
  position: {
    top?: number,
    left?: number
  }
  zIndex: number
  selector: string
  show: boolean
  map: Map<Symbol, HTMLElement>


  constructor (options: TelportOptions) {
    const { el, selector = 'body', show = true } = options

    this.id = Symbol(`${id++}`)
    this.map = new Map()
    this.el = el as HTMLElement
    this.zIndex = 2000
    console.log(this.el)
    this.position = {}
    this.selector = selector
    this.show = show

    Promise.resolve(true).then(() => {
      this.position = this.el?.getBoundingClientRect()
      console.log(this.position)
      
      if (!this.el.telportId) {
        this.init()
      }
    })
    
    // console.log(thi)
   
  }


  init () {
    const container = document.querySelector(this.selector)

    if (!container) return
    const cloneNode = this.el.cloneNode(true)
    this.position = this.el?.getBoundingClientRect()

    cloneNode.style.cssText = `
      display: ${this.show ? 'block' : 'none'};
      z-index: ${this.zIndex};
      transform: translate(${this.position.top}px, ${this.position.left}px);
    `
    
    cloneNode.NumberId = id
    cloneNode.telportId = this.id

    this.el.numberId = id
    this.el.telportId = this.id

    this.map.set(this.id, this.el)
    container.appendChild(cloneNode)

    // const parent = this.el.parentElement
    // const children = [...parent?.children]

    // children.forEach((item, index) => {
    //   if (item.telportId) {
    //     parent?.removeChild(item)
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
