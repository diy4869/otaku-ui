
Array.prototype.reduce2 = function reduce(callback, initVal) {
  for (let i = 0; i < this.length; i++) {
    initVal = callback(initVal, this[i], i)
  }

  return initVal
}

const result2 =  ([1, 2, 3]).reduce((total, current) => {
    return total + current
}, 0)
  
// console.log(result2)
const result = ([1, 2, 3]).reduce2((total, current) => {
  return total + current
}, 0)

console.log(result)